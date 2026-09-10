import { SensorReading } from "../../../models/SensorReading.js";
import { RiskPrediction } from "../../../models/RiskPrediction.js";

import type {
  IntelligenceOverview,
  IntelligenceRiskLevel,
  RiverOverview,
} from "../types/intelligence.types.js";


function getRiskLevel(score: number): IntelligenceRiskLevel {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 30) return "moderate";
  return "low";
}

function calculateTrend(
  current: number,
  previous: number | null,
): "rising" | "falling" | "stable" {
  if (previous === null) {
    return "stable";
  }

  const difference = current - previous;

  if (difference > 0.15) {
    return "rising";
  }

  if (difference < -0.15) {
    return "falling";
  }

  return "stable";
}

function getPredictionFreshness(
  expiresAt: Date | undefined,
  generatedAt: Date | undefined,
): RiverOverview["predictionFreshness"] {
  if (!expiresAt || !generatedAt) {
    return "unavailable";
  }

  const now = Date.now();
  const expiry = expiresAt.getTime();
  const generated = generatedAt.getTime();

  if (expiry <= now) {
    return "expired";
  }

  const lifetime = expiry - generated;
  const remaining = expiry - now;

  if (remaining <= lifetime * 0.25) {
    return "expiring";
  }

  return "fresh";
}

export async function getIntelligenceOverview(): Promise<IntelligenceOverview> {
  const rivers = await SensorReading.distinct("river");

  const riverOverviews: RiverOverview[] = [];

  for (const river of rivers) {
    const latestReading = await SensorReading.findOne({
      river,
    }).sort({
      recordedAt: -1,
    });

    if (!latestReading) {
      continue;
    }

    const previousReading = await SensorReading.findOne({
      river,
      recordedAt: {
        $lt: latestReading.recordedAt,
      },
    }).sort({
      recordedAt: -1,
    });

    const latestPrediction = await RiskPrediction.findOne({
      river,
    }).sort({
      generatedAt: -1,
    });

    const stationsTotal = await SensorReading.distinct(
      "sensorId",
      { river },
    );

    const onlineSensors = await SensorReading.distinct(
      "sensorId",
      {
        river,
        status: "online",
      },
    );

    const riskScore = latestPrediction
      ? latestPrediction.riskScore
      : 0;

    riverOverviews.push({
      river,
      riskScore,
      riskLevel: latestPrediction
        ? getRiskLevel(riskScore)
        : "low",

      waterLevel: latestReading.waterLevel,
      rainfall: latestReading.rainfall,
      flowRate: latestReading.flowRate,
      temperature: latestReading.temperature ?? 0,

      trend: calculateTrend(
        latestReading.waterLevel,
        previousReading?.waterLevel ?? null,
      ),

      stationsOnline: onlineSensors.length,
      stationsTotal: stationsTotal.length,

      lastReadingAt:
        latestReading.recordedAt?.toISOString() ?? null,

      lastPredictionAt:
        latestPrediction?.generatedAt?.toISOString() ?? null,

      predictionFreshness: getPredictionFreshness(
        latestPrediction?.expiresAt,
        latestPrediction?.generatedAt,
      ),
    });
  }

  riverOverviews.sort(
    (a, b) => b.riskScore - a.riskScore,
  );

  const summary = {
    totalRivers: riverOverviews.length,

    lowRisk: riverOverviews.filter(
      (river) => river.riskLevel === "low",
    ).length,

    moderateRisk: riverOverviews.filter(
      (river) => river.riskLevel === "moderate",
    ).length,

    highRisk: riverOverviews.filter(
      (river) => river.riskLevel === "high",
    ).length,

    criticalRisk: riverOverviews.filter(
      (river) => river.riskLevel === "critical",
    ).length,

    stationsOnline: riverOverviews.reduce(
      (total, river) => total + river.stationsOnline,
      0,
    ),

    stationsTotal: riverOverviews.reduce(
      (total, river) => total + river.stationsTotal,
      0,
    ),
  };

  return {
    generatedAt: new Date().toISOString(),
    rivers: riverOverviews,
    summary,
  };
}

export async function getRiverIntelligence(
  river: string,
): Promise<RiverOverview | null> {
  const latestReading = await SensorReading.findOne({
    river,
  }).sort({
    recordedAt: -1,
  });

  if (!latestReading) {
    return null;
  }

  const previousReading = await SensorReading.findOne({
    river,
    recordedAt: {
      $lt: latestReading.recordedAt,
    },
  }).sort({
    recordedAt: -1,
  });

  const latestPrediction = await RiskPrediction.findOne({
    river,
  }).sort({
    generatedAt: -1,
  });

  const stationsTotal = await SensorReading.distinct(
    "sensorId",
    { river },
  );

  const onlineSensors = await SensorReading.distinct(
    "sensorId",
    {
      river,
      status: "online",
    },
  );

  const riskScore = latestPrediction?.riskScore ?? 0;

  return {
    river,

    riskScore,

    riskLevel: latestPrediction
      ? getRiskLevel(riskScore)
      : "low",

    waterLevel: latestReading.waterLevel,
    rainfall: latestReading.rainfall,
    flowRate: latestReading.flowRate,
    temperature: latestReading.temperature ?? 0,

    trend: calculateTrend(
      latestReading.waterLevel,
      previousReading?.waterLevel ?? null,
    ),

    stationsOnline: onlineSensors.length,
    stationsTotal: stationsTotal.length,

    lastReadingAt:
      latestReading.recordedAt?.toISOString() ?? null,

    lastPredictionAt:
      latestPrediction?.generatedAt?.toISOString() ?? null,

    predictionFreshness: getPredictionFreshness(
      latestPrediction?.expiresAt,
      latestPrediction?.generatedAt,
    ),
  };
}