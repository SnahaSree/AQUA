import type {
  IntelligenceRiskLevel,
} from "../types/intelligence.types.js";

interface IntelligenceScoreInput {
  riskScore: number;
  confidence: number;
  trend: "rising" | "falling" | "stable";
  stationHealthPercentage: number;
}

export function calculateIntelligenceScore(
  input: IntelligenceScoreInput,
): number {
  const riskComponent =
    Math.max(
      0,
      Math.min(input.riskScore, 100),
    );

  const confidenceComponent =
    Math.max(
      0,
      Math.min(input.confidence * 100, 100),
    );

  const trendAdjustment =
    input.trend === "rising"
      ? 10
      : input.trend === "falling"
        ? -5
        : 0;

  const healthComponent =
    Math.max(
      0,
      Math.min(
        input.stationHealthPercentage,
        100,
      ),
    );

  const score =
    riskComponent * 0.55 +
    confidenceComponent * 0.2 +
    healthComponent * 0.15 +
    trendAdjustment;

  return Number(
    Math.max(
      0,
      Math.min(score, 100),
    ).toFixed(2),
  );
}

export function getIntelligenceLevel(
  score: number,
): IntelligenceRiskLevel {
  if (score >= 80) {
    return "critical";
  }

  if (score >= 60) {
    return "high";
  }

  if (score >= 30) {
    return "moderate";
  }

  return "low";
}