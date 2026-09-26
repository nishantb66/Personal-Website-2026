import nodemailer from "nodemailer";
import { getRequiredEnv } from "./env";

export async function sendOtpEmail(email: string, otp: string) {
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_APP_PASSWORD");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from: `"Document Risk Portal" <${user}>`,
    to: email,
    subject: "Verify your Document Risk Portal account",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#142033">
        <h2>Verify your account</h2>
        <p>Your one-time password is:</p>
        <p style="font-size:28px;font-weight:700;letter-spacing:6px">${otp}</p>
        <p>This OTP expires in 10 minutes. If you did not request it, you can ignore this email.</p>
      </div>
    `,
  });
}
