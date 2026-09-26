import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { errorResponse, jsonResponse, parseError } from "@/lib/server/http";
import { createOtp, hashOtp } from "@/lib/server/otp";
import { sendOtpEmail } from "@/lib/server/mailer";
import { getClientIp, checkRateLimit } from "@/lib/server/rate-limit";
import { registerSchema } from "@/lib/server/validators";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);

    if (!checkRateLimit(`register:${ip}`, 5, 15 * 60 * 1000)) {
      return errorResponse("Too many signup attempts. Please try again later.", 429);
    }

    const payload = registerSchema.parse(await request.json());
    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser?.emailVerifiedAt) {
      return errorResponse("An account with this email already exists.", 409);
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);
    const user = existingUser
      ? await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            name: payload.name,
            passwordHash,
          },
        })
      : await prisma.user.create({
          data: {
            email: payload.email,
            name: payload.name,
            passwordHash,
          },
        });

    const otp = createOtp();

    await prisma.otpVerification.create({
      data: {
        userId: user.id,
        otpHash: hashOtp(otp),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendOtpEmail(payload.email, otp);

    return jsonResponse({
      message: "OTP sent. Verify the email address to complete account creation.",
      expiresInMinutes: 10,
    });
  } catch (error) {
    const parsed = parseError(error);
    return errorResponse(parsed.message, parsed.status);
  }
}
