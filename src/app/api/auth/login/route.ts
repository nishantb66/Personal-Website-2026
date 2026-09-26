import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { errorResponse, parseError } from "@/lib/server/http";
import { setSessionCookie } from "@/lib/server/auth";
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit";
import { loginSchema } from "@/lib/server/validators";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);

    if (!checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000)) {
      return errorResponse("Too many login attempts. Please try again later.", 429);
    }

    const payload = loginSchema.parse(await request.json());
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user?.passwordHash) {
      return errorResponse("Invalid email or password.", 401);
    }

    if (!user.emailVerifiedAt) {
      return errorResponse("Please verify your email before logging in.", 403);
    }

    const isValidPassword = await bcrypt.compare(payload.password, user.passwordHash);

    if (!isValidPassword) {
      return errorResponse("Invalid email or password.", 401);
    }

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });

    await setSessionCookie(response, user);
    return response;
  } catch (error) {
    const parsed = parseError(error);
    return errorResponse(parsed.message, parsed.status);
  }
}
