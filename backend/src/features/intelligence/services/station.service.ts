import { RiskPrediction } from "../../../models/RiskPrediction.js";
import { SensorReading } from "../../../models/SensorReading.js";

import {
  getPredictionFreshness,
  type PredictionFreshness,
} from "./freshness.service.js";

import { evaluateAlert } from "./alert.service.js";

export interface StationIntelligence {
  sensorId: string;
  river: string;
  location: string;

  coordinates: {
    lat: number;
    lng: number;
  };

  reading: {
    waterLevel: number;
    rainfall: number;
    flowRate: number;
    temperature: number;
    batteryLevel: number;
    status: string;
    recordedAt: string;
  } | null;

  prediction: {
    riskScore: number;
    riskLevel: string;
    forecastHours: number;
    predictedWaterLevel: number;
    confidence: number;
    modelVersion: string;
    generatedAt: string;
    expiresAt: string;
    freshness: PredictionFreshness;
  } | null;

  trend: "rising" | "falling" | "stable";

  alert: {
    severity:
      | "none"
      | "watch"
      | "warning"
      | "critical";

    triggered: boolean;

    reasons: string[];
  };
}

export async function getStationIntelligence(
  sensorId: string,
): Promise<StationIntelligence | null> {
  const readings = await SensorReading.find({
    sensorId,
  })
    .sort({
      recordedAt: -1,
    })
    .limit(2)
    .lean();

  const latestReading =
    readings[0] ?? null;

  const previousReading =
    readings[1] ?? null;

  if (!latestReading) {
    return null;
  }

  const latestPrediction =
    await RiskPrediction.findOne({
      sensorId,
    })
      .sort({
        generatedAt: -1,
      })
      .lean();

  let trend:
    | "rising"
    | "falling"
    | "stable" = "stable";

  if (previousReading) {
    const difference =
      latestReading.waterLevel -
      previousReading.waterLevel;

    if (difference > 0.15) {
      trend = "rising";
    } else if (difference < -0.15) {
      trend = "falling";
    }
  }

  const riskScore =
    latestPrediction?.riskScore ?? 0;

  const alert = evaluateAlert(
    riskScore,
    trend,
    latestReading.waterLevel,
  );

  return {
    sensorId: latestReading.sensorId,

    river: latestReading.river,

    location: latestReading.location,

    coordinates: {
      lat: latestReading.latitude,
      lng: latestReading.longitude,
    },

    reading: {
      waterLevel:
        latestReading.waterLevel,

      rainfall:
        latestReading.rainfall,

      flowRate:
        latestReading.flowRate,

      temperature:
        latestReading.temperature ?? 0,

      batteryLevel:
        latestReading.batteryLevel ?? 0,

      status:
        latestReading.status,

      recordedAt:
        latestReading.recordedAt.toISOString(),
    },

    prediction: latestPrediction
      ? {
          riskScore:
            latestPrediction.riskScore,

          riskLevel:
            latestPrediction.riskLevel,

          forecastHours:
            latestPrediction.forecastHours,

          predictedWaterLevel:
            latestPrediction.predictedWaterLevel,

          confidence:
            latestPrediction.confidence,

          modelVersion:
            latestPrediction.modelVersion,

          generatedAt:
            latestPrediction.generatedAt.toISOString(),

          expiresAt:
            latestPrediction.expiresAt.toISOString(),

          freshness:
            getPredictionFreshness(
              latestPrediction.generatedAt,
              latestPrediction.expiresAt,
            ),
        }
      : null,

    trend,

    alert,
  };
}