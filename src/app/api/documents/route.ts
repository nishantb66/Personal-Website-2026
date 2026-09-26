import { NextRequest } from "next/server";
import { requireAuthenticatedUser } from "@/lib/server/auth";
import { errorResponse, jsonResponse, parseError } from "@/lib/server/http";
import { prisma } from "@/lib/server/prisma";
import { createDocumentSchema } from "@/lib/server/validators";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const documents = await prisma.documentAnalysis.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        risks: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return jsonResponse({ documents });
  } catch {
    return errorResponse("Authentication required", 401);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const payload = createDocumentSchema.parse(await request.json());
    const riskScore =
      payload.riskScore ??
      Math.min(
        100,
        (payload.risks || []).reduce((score, risk) => {
          const weight = {
            LOW: 5,
            MEDIUM: 12,
            HIGH: 22,
            CRITICAL: 35,
          }[risk.severity];

          return score + weight;
        }, 0),
      );

    const document = await prisma.documentAnalysis.create({
      data: {
        userId: user.id,
        title: payload.title,
        fileName: payload.fileName,
        documentType: payload.documentType,
        status: payload.status,
        summary: payload.summary,
        riskScore,
        analysedAt: payload.status === "COMPLETED" || !payload.status ? new Date() : null,
        risks: payload.risks?.length
          ? {
              create: payload.risks,
            }
          : undefined,
      },
      include: {
        risks: true,
      },
    });

    return jsonResponse({ document }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return errorResponse("Authentication required", 401);
    }

    const parsed = parseError(error);
    return errorResponse(parsed.message, parsed.status);
  }
}
