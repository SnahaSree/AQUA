import type {
  Request,
  Response,
} from "express";

import { SensorReading } from "../../../models/SensorReading.js";
import { RiskPrediction } from "../../../models/RiskPrediction.js";

export async function status(
  _req: Request,
  res: Response,
) {
  const [
    latestReading,
    latestPrediction,
  ] = await Promise.all([
    SensorReading.findOne().sort({
      recordedAt: -1,
    }),

    RiskPrediction.findOne().sort({
      generatedAt: -1,
    }),
  ]);

  const now = Date.now();

  const readingAge = latestReading
    ? now -
      latestReading.recordedAt.getTime()
    : null;

  const predictionAge =
    latestPrediction
      ? now -
        latestPrediction.generatedAt.getTime()
      : null;

  res.status(200).json({
    success: true,

    data: {
      sensorPipeline: {
        status:
          readingAge !== null &&
          readingAge <=
            15 * 60 * 1000
            ? "healthy"
            : "stale",

        lastReadingAt:
          latestReading?.recordedAt
            .toISOString() ?? null,
      },

      predictionPipeline: {
        status:
          predictionAge !== null &&
          predictionAge <=
            60 * 60 * 1000
            ? "healthy"
            : "stale",

        lastPredictionAt:
          latestPrediction?.generatedAt
            .toISOString() ?? null,
      },

      checkedAt:
        new Date().toISOString(),
    },
  });
}