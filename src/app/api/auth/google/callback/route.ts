import { createRemoteJWKSet, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { getRequiredEnv } from "@/lib/server/env";
import {
  clearGoogleStateCookie,
  getGoogleState,
  setSessionCookie,
} from "@/lib/server/auth";
import { errorResponse, parseError } from "@/lib/server/http";
import { googleCallbackSchema } from "@/lib/server/validators";

type GoogleTokenResponse = {
  id_token?: string;
  access_token?: string;
  error?: string;
  error_description?: string;
};

const googleJwks = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs"),
);

async function exchangeGoogleCode(code: string) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: getRequiredEnv("GOOGLE_CLIENT_ID"),
      client_secret: getRequiredEnv("GOOGLE_CLIENT_SECRET"),
      redirect_uri: getRequiredEnv("GOOGLE_REDIRECT_URI"),
      grant_type: "authorization_code",
    }),
  });

  const tokenPayload = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !tokenPayload.id_token) {
    throw new Error(tokenPayload.error_description || "Google authentication failed");
  }

  return tokenPayload.id_token;
}

export async function POST(request: NextRequest) {
  try {
    const payload = googleCallbackSchema.parse(await request.json());
    const storedState = getGoogleState(request);

    if (!storedState || storedState !== payload.state) {
      return errorResponse("Invalid Google authentication state.", 400);
    }

    const idToken = await exchangeGoogleCode(payload.code);
    const { payload: googleUser } = await jwtVerify(idToken, googleJwks, {
      audience: getRequiredEnv("GOOGLE_CLIENT_ID"),
      issuer: ["https://accounts.google.com", "accounts.google.com"],
    });

    if (
      typeof googleUser.email !== "string" ||
      googleUser.email_verified !== true ||
      typeof googleUser.sub !== "string"
    ) {
      return errorResponse("Google account email must be verified.", 403);
    }

    const user = await prisma.user.upsert({
      where: { email: googleUser.email.toLowerCase() },
      update: {
        googleId: googleUser.sub,
        name: typeof googleUser.name === "string" ? googleUser.name : undefined,
        avatarUrl:
          typeof googleUser.picture === "string" ? googleUser.picture : undefined,
        emailVerifiedAt: new Date(),
      },
      create: {
        email: googleUser.email.toLowerCase(),
        googleId: googleUser.sub,
        name: typeof googleUser.name === "string" ? googleUser.name : undefined,
        avatarUrl:
          typeof googleUser.picture === "string" ? googleUser.picture : undefined,
        emailVerifiedAt: new Date(),
      },
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });

    clearGoogleStateCookie(response);
    await setSessionCookie(response, user);
    return response;
  } catch (error) {
    const parsed = parseError(error);
    return errorResponse(parsed.message, parsed.status);
  }
}
