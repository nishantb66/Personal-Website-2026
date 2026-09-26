import crypto from "crypto";
import { NextResponse } from "next/server";
import { getRequiredEnv } from "@/lib/server/env";
import { setGoogleStateCookie } from "@/lib/server/auth";

export async function GET() {
  const state = crypto.randomBytes(32).toString("hex");
  const params = new URLSearchParams({
    client_id: getRequiredEnv("GOOGLE_CLIENT_ID"),
    redirect_uri: getRequiredEnv("GOOGLE_REDIRECT_URI"),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });

  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
  );

  setGoogleStateCookie(response, state);
  return response;
}
