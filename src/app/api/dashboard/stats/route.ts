import { NextRequest } from "next/server";
import { requireAuthenticatedUser } from "@/lib/server/auth";
import { errorResponse, jsonResponse } from "@/lib/server/http";
import { prisma } from "@/lib/server/prisma";

const riskSeverities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;
type RiskSeverity = (typeof riskSeverities)[number];

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const [documentCount, riskCount, recentDocuments, risksBySeverity, avgRisk] =
      await Promise.all([
        prisma.documentAnalysis.count({
          where: { userId: user.id },
        }),
        prisma.riskFinding.count({
          where: { document: { userId: user.id } },
        }),
        prisma.documentAnalysis.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            title: true,
            status: true,
            riskScore: true,
            createdAt: true,
            _count: {
              select: { risks: true },
            },
          },
        }),
        prisma.riskFinding.groupBy({
          by: ["severity"],
          where: { document: { userId: user.id } },
          _count: { severity: true },
        }),
        prisma.documentAnalysis.aggregate({
          where: { userId: user.id },
          _avg: { riskScore: true },
        }),
      ]);

    const severityCounts = Object.fromEntries(
      riskSeverities.map((severity) => [severity, 0]),
    ) as Record<RiskSeverity, number>;

    for (const row of risksBySeverity) {
      severityCounts[row.severity as RiskSeverity] = row._count.severity;
    }

    return jsonResponse({
      stats: {
        documentsAnalysed: documentCount,
        totalRisksDetected: riskCount,
        criticalRisks: severityCounts.CRITICAL,
        highRisks: severityCounts.HIGH,
        averageRiskScore: Math.round(avgRisk._avg.riskScore || 0),
        severityCounts,
        recentDocuments,
      },
    });
  } catch {
    return errorResponse("Authentication required", 401);
  }
}
