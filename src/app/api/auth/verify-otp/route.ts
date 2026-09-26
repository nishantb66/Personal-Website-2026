import { NextRequest } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { errorResponse, jsonResponse, parseError } from "@/lib/server/http";
import { verifyOtpHash } from "@/lib/server/otp";
import { verifyOtpSchema } from "@/lib/server/validators";
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);

    if (!checkRateLimit(`verify-otp:${ip}`, 8, 15 * 60 * 1000)) {
      return errorResponse("Too many verification attempts. Please try again later.", 429);
    }

    const payload = verifyOtpSchema.parse(await request.json());
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      return errorResponse("Invalid or expired OTP.", 400);
    }

    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        userId: user.id,
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord || otpRecord.attempts >= 5) {
      return errorResponse("Invalid or expired OTP.", 400);
    }

    if (!verifyOtpHash(payload.otp, otpRecord.otpHash)) {
      await prisma.otpVerification.update({
        where: { id: otpRecord.id },
        data: { attempts: { increment: 1 } },
      });

      return errorResponse("Invalid or expired OTP.", 400);
    }

    await prisma.$transaction([
      prisma.otpVerification.update({
        where: { id: otpRecord.id },
        data: { consumedAt: new Date() },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { emailVerifiedAt: new Date() },
      }),
    ]);

    return jsonResponse({
      message: "Account verified successfully. You can now log in.",
    });
  } catch (error) {
    const parsed = parseError(error);
    return errorResponse(parsed.message, parsed.status);
  }
}
