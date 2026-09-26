import { jwtVerify, SignJWT } from "jose";
import type { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";
import { getRequiredEnv } from "./env";

const SESSION_COOKIE = "document_portal_session";
const GOOGLE_STATE_COOKIE = "google_oauth_state";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const GOOGLE_STATE_TTL_SECONDS = 60 * 10;

type SessionPayload = {
  sub: string;
  email: string;
};

function secretKey() {
  return new TextEncoder().encode(getRequiredEnv("JWT_SECRET"));
}

function secureCookie() {
  return process.env.NODE_ENV === "production";
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey());

  if (!payload.sub || typeof payload.email !== "string") {
    return null;
  }

  return {
    userId: payload.sub,
    email: payload.email,
  };
}

export async function setSessionCookie(
  response: NextResponse,
  user: { id: string; email: string },
) {
  const token = await createSessionToken({
    sub: user.id,
    email: user.email,
  });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie(),
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie(),
    path: "/",
    maxAge: 0,
  });
}

export function setGoogleStateCookie(response: NextResponse, state: string) {
  response.cookies.set(GOOGLE_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie(),
    path: "/",
    maxAge: GOOGLE_STATE_TTL_SECONDS,
  });
}

export function clearGoogleStateCookie(response: NextResponse) {
  response.cookies.set(GOOGLE_STATE_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie(),
    path: "/",
    maxAge: 0,
  });
}

export function getGoogleState(request: NextRequest) {
  return request.cookies.get(GOOGLE_STATE_COOKIE)?.value;
}

export async function getAuthenticatedUser(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await verifySessionToken(token).catch(() => null);

  if (!session) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      emailVerifiedAt: true,
      createdAt: true,
    },
  });
}

export async function requireAuthenticatedUser(request: NextRequest) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}
