import cron from "node-cron";

import { SensorReading } from "../models/SensorReading.js";
import { generateAndStorePrediction } from "../services/prediction.service.js";
import { RiskPrediction } from "../models/RiskPrediction.js";

const FEATURE_HISTORY_SIZE = 24;



export async function generatePredictions() {
  const sensors = await SensorReading.distinct(
    "sensorId",
  );

  for (const sensorId of sensors) {
    try {
      const readings = await SensorReading.find({
        sensorId,
      })
        .sort({
          recordedAt: -1,
        })
        .limit(FEATURE_HISTORY_SIZE)
        .lean();

      if (readings.length < 8) {
        console.warn(
          `[prediction-job] Not enough observations for ${sensorId}`,
        );

        continue;
      }

      const orderedReadings = [
        ...readings,
      ].reverse();

      const latestReading =
        orderedReadings[
          orderedReadings.length - 1
        ];

      if (!latestReading) {
        continue;
      }

      const latestPrediction =
        await RiskPrediction.findOne({
          sensorId,
        }).sort({
          generatedAt: -1,
        });

      if (
        latestPrediction &&
        latestPrediction.generatedAt >=
          latestReading.recordedAt
      ) {
        console.info(
          `[prediction-job] Prediction already covers latest reading for ${sensorId}`,
        );

        continue;
      }

      await generateAndStorePrediction({
        sensor_id: sensorId,

        river: latestReading.river,

        observations:
          orderedReadings.map(
            (reading) => ({
              timestamp:
                reading.recordedAt.toISOString(),

              water_level:
                reading.waterLevel,

              rainfall:
                reading.rainfall,

              flow_rate:
                reading.flowRate,

              temperature:
                reading.temperature ?? 0,
            }),
          ),

        forecast_hours: 24,
      });

      console.info(
        `[prediction-job] Prediction generated for ${sensorId}`,
      );
    } catch (error) {
      console.error(
        `[prediction-job] Failed for ${sensorId}`,
        error,
      );
    }
  }
}



export function startPredictionJob() {
  cron.schedule(
    "*/15 * * * *",
    async () => {
      await generatePredictions();
    },
    {
      timezone: "UTC",
    },
  );

  console.info(
    "[prediction-job] Scheduled every 15 minutes",
  );
}