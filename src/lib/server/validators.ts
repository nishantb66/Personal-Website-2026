import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email();
export const documentStatusSchema = z.enum([
  "QUEUED",
  "ANALYSING",
  "COMPLETED",
  "FAILED",
]);
export const riskSeveritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(8).max(128),
  name: z.string().trim().min(1).max(120).optional(),
});

export const verifyOtpSchema = z.object({
  email: emailSchema,
  otp: z.string().regex(/^\d{6}$/),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(128),
});

export const googleCallbackSchema = z.object({
  code: z.string().min(1),
  state: z.string().min(16),
});

export const createDocumentSchema = z.object({
  title: z.string().trim().min(1).max(180),
  fileName: z.string().trim().max(240).optional(),
  documentType: z.string().trim().max(80).optional(),
  status: documentStatusSchema.optional(),
  summary: z.string().trim().max(4000).optional(),
  riskScore: z.number().int().min(0).max(100).optional(),
  risks: z
    .array(
      z.object({
        severity: riskSeveritySchema,
        category: z.string().trim().min(1).max(100),
        title: z.string().trim().min(1).max(180),
        description: z.string().trim().min(1).max(1500),
        recommendation: z.string().trim().max(1500).optional(),
      }),
    )
    .max(100)
    .optional(),
});
