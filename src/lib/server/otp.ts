import crypto from "crypto";
import { getOptionalEnv, getRequiredEnv } from "./env";

export function createOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

export function hashOtp(otp: string) {
  const pepper = getOptionalEnv("OTP_PEPPER") || getRequiredEnv("JWT_SECRET");

  return crypto.createHmac("sha256", pepper).update(otp).digest("hex");
}

export function verifyOtpHash(otp: string, expectedHash: string) {
  const actualHash = hashOtp(otp);
  const actual = Buffer.from(actualHash, "hex");
  const expected = Buffer.from(expectedHash, "hex");

  if (actual.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(actual, expected);
}
