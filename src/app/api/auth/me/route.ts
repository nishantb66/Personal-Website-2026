import { NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/server/auth";
import { errorResponse, jsonResponse } from "@/lib/server/http";

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return errorResponse("Authentication required", 401);
  }

  return jsonResponse({ user });
}
