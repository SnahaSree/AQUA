import { SensorReading } from "../../../models/SensorReading.js";

export interface RiskTrendPoint {
  timestamp: string;
  waterLevel: number;
  rainfall: number;
  flowRate: number;
}

export async function getRiverTrend(
  river: string,
  hours: number,
): Promise<RiskTrendPoint[]> {
  const since = new Date(
    Date.now() - hours * 60 * 60 * 1000,
  );

  const readings = await SensorReading.find({
    river,
    recordedAt: {
      $gte: since,
    },
  })
    .sort({
      recordedAt: 1,
    })
    .limit(2000)
    .lean();

  return readings.map((reading) => ({
    timestamp: reading.recordedAt.toISOString(),
    waterLevel: reading.waterLevel,
    rainfall: reading.rainfall,
    flowRate: reading.flowRate,
  }));
}