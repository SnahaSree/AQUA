import {
  MLPredictionRequest,
  requestPrediction,
} from "./ml.service.js";

import { RiskPrediction } from "../models/RiskPrediction.js";
import { SensorReading } from "../models/SensorReading.js";

export async function generateAndStorePrediction(
  payload: MLPredictionRequest,
) {
  const result = await requestPrediction(payload);

  const latestSensorReading =
    await SensorReading.findOne({
      sensorId: payload.sensor_id,
    }).sort({
      recordedAt: -1,
    });

  if (!latestSensorReading) {
    throw new Error(
      `Sensor ${payload.sensor_id} was not found`,
    );
  }

  const generatedAt = new Date(
    result.generated_at,
  );

  const expiresAt = new Date(
    generatedAt.getTime() +
      result.forecast_hours *
        60 *
        60 *
        1000,
  );

  try {
    const prediction =
      await RiskPrediction.create({
        sensorId: result.sensor_id,

        river: result.river,

        location:
          latestSensorReading.location,

        riskScore:
          result.risk_score,

        riskLevel:
          result.risk_level,

        forecastHours:
          result.forecast_hours,

        predictedWaterLevel:
          result.predicted_water_level,

        confidence:
          result.confidence,

        modelVersion:
          result.model_version,

        sourceReadingAt:
          latestSensorReading.recordedAt,

        generatedAt,

        expiresAt,
      });

    return prediction;
  } catch (error) {
    /*
     * If a prediction for this exact sensor
     * and source reading already exists,
     * return the existing prediction instead
     * of failing because of a duplicate key.
     */
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      const existingPrediction =
        await RiskPrediction.findOne({
          sensorId: result.sensor_id,
          sourceReadingAt:
            latestSensorReading.recordedAt,
        });

      if (existingPrediction) {
        return existingPrediction;
      }
    }

    throw error;
  }
}