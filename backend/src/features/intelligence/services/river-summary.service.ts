import { RiskPrediction } from "../../../models/RiskPrediction.js";
import { SensorReading } from "../../../models/SensorReading.js";

import {
  calculateIntelligenceScore,
  getIntelligenceLevel,
} from "./intelligence-score.service.js";

import {
  getPredictionFreshness,
} from "./freshness.service.js";

import {
  evaluateAlert,
} from "./alert.service.js";

export async function getRiverSummary(
  river: string,
) {

  const predictions =
  await RiskPrediction.find({
    river,
  })
    .sort({
      generatedAt: -1,
    })
    .lean();

const predictionBySensor =
  new Map<
    string,
    (typeof predictions)[number]
  >();

for (const prediction of predictions) {
  if (
    !predictionBySensor.has(
      prediction.sensorId,
    )
  ) {
    predictionBySensor.set(
      prediction.sensorId,
      prediction,
    );
  }
}

  const stations =
    await SensorReading.distinct(
      "sensorId",
      { river },
    );

  if (stations.length === 0) {
    return null;
  }

  const latestReadings =
    await SensorReading.find({
      river,
    })
      .sort({
        recordedAt: -1,
      })
      .lean();

  const latestBySensor =
    new Map<string, (typeof latestReadings)[number]>();

  for (const reading of latestReadings) {
    if (!latestBySensor.has(reading.sensorId)) {
      latestBySensor.set(
        reading.sensorId,
        reading,
      );
    }
  }

  const currentReadings =
    Array.from(latestBySensor.values());

  const online = currentReadings.filter(
    (reading) =>
      reading.status === "online",
  ).length;

  const stale = currentReadings.filter(
    (reading) =>
      Date.now() -
        reading.recordedAt.getTime() >
      15 * 60 * 1000,
  ).length;

  const offline =
    currentReadings.filter(
      (reading) =>
        reading.status !== "online",
    ).length;

  const latestPrediction =
    await RiskPrediction.findOne({
      river,
    })
      .sort({
        generatedAt: -1,
      })
      .lean();

  const averageWaterLevel =
    currentReadings.length > 0
      ? currentReadings.reduce(
          (sum, reading) =>
            sum + reading.waterLevel,
          0,
        ) / currentReadings.length
      : 0;

  const averageRainfall =
    currentReadings.length > 0
      ? currentReadings.reduce(
          (sum, reading) =>
            sum + reading.rainfall,
          0,
        ) / currentReadings.length
      : 0;

  const averageFlowRate =
    currentReadings.length > 0
      ? currentReadings.reduce(
          (sum, reading) =>
            sum + reading.flowRate,
          0,
        ) / currentReadings.length
      : 0;

  const averageTemperature =
    currentReadings.length > 0
      ? currentReadings.reduce(
          (sum, reading) =>
            sum + (reading.temperature ?? 0),
          0,
        ) / currentReadings.length
      : 0;

  const previousReadings =
    await SensorReading.find({
      river,
    })
      .sort({
        recordedAt: -1,
      })
      .skip(stations.length)
      .limit(stations.length)
      .lean();

  const previousAverage =
    previousReadings.length > 0
      ? previousReadings.reduce(
          (sum, reading) =>
            sum + reading.waterLevel,
          0,
        ) / previousReadings.length
      : averageWaterLevel;

  let trend:
    | "rising"
    | "falling"
    | "stable" = "stable";

  const difference =
    averageWaterLevel -
    previousAverage;

  if (difference > 0.15) {
    trend = "rising";
  } else if (difference < -0.15) {
    trend = "falling";
  }

  const riskScore =
    latestPrediction?.riskScore ?? 0;

  const riskLevel =
    latestPrediction?.riskLevel ??
    "low";

  const confidence =
    latestPrediction?.confidence ?? 0;

  const stationHealthPercentage =
    stations.length > 0
      ? (online / stations.length) * 100
      : 0;

  const intelligenceScore =
    calculateIntelligenceScore({
      riskScore,
      confidence,
      trend,
      stationHealthPercentage,
    });

  const intelligenceLevel =
    getIntelligenceLevel(
      intelligenceScore,
    );

  let alertWatch = 0;
  let alertWarning = 0;
  let alertCritical = 0;

  for (const reading of currentReadings) {
    const prediction =
  predictionBySensor.get(
    reading.sensorId,
  );

    const alert = evaluateAlert(
      prediction?.riskScore ?? 0,
      trend,
      reading.waterLevel,
    );

    if (alert.severity === "watch") {
      alertWatch += 1;
    }

    if (alert.severity === "warning") {
      alertWarning += 1;
    }

    if (alert.severity === "critical") {
      alertCritical += 1;
    }
  }

  return {
    river,

    risk: {
      score: riskScore,
      level: riskLevel,
    },

    telemetry: {
      waterLevel: Number(
        averageWaterLevel.toFixed(2),
      ),

      rainfall: Number(
        averageRainfall.toFixed(2),
      ),

      flowRate: Number(
        averageFlowRate.toFixed(2),
      ),

      temperature: Number(
        averageTemperature.toFixed(2),
      ),
    },

    trend,

    stations: {
      online,
      offline,
      stale,
      total: stations.length,
    },

    alerts: {
      total:
        alertWatch +
        alertWarning +
        alertCritical,

      watch: alertWatch,

      warning: alertWarning,

      critical: alertCritical,
    },

    intelligenceScore,

    intelligenceLevel,

    predictionFreshness:
      latestPrediction
        ? getPredictionFreshness(
            latestPrediction.generatedAt,
            latestPrediction.expiresAt,
          )
        : "unavailable",

    generatedAt:
      new Date().toISOString(),
  };
}