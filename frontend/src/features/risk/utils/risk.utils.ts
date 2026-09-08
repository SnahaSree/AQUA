import type {
  RiskLevel,
  RiskPrediction,
  SensorReading,
} from "../types/risk.types";

export interface RiskStation {
  sensorId: string;
  river: string;
  location: string;
  lat: number;
  lng: number;
  riskScore: number;
  riskLevel: RiskLevel;
  waterLevel: number;
  rainfall: number;
  flowRate: number;
  batteryLevel: number;
  status: SensorReading["status"];
  recordedAt: string;
  generatedAt: string | null;
  confidence: number | null;
}

const riskPriority: Record<RiskLevel, number> = {
  critical: 4,
  high: 3,
  moderate: 2,
  low: 1,
};

function isValidCoordinate(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value)
  );
}

export function getRiskColor(
  riskLevel: RiskLevel,
): string {
  switch (riskLevel) {
    case "critical":
      return "#ef4444";

    case "high":
      return "#f97316";

    case "moderate":
      return "#eab308";

    case "low":
      return "#22c55e";

    default:
      return "#64748b";
  }
}

export function getRiskLabel(
  riskLevel: RiskLevel,
): string {
  return (
    riskLevel.charAt(0).toUpperCase() +
    riskLevel.slice(1)
  );
}

export function combineRiskData(
  sensors: SensorReading[],
  predictions: RiskPrediction[],
): RiskStation[] {
  const predictionMap = new Map<
    string,
    RiskPrediction
  >();

  predictions.forEach((prediction) => {
    const existing =
      predictionMap.get(prediction.sensorId);

    if (
      !existing ||
      new Date(prediction.generatedAt) >
        new Date(existing.generatedAt)
    ) {
      predictionMap.set(
        prediction.sensorId,
        prediction,
      );
    }
  });

  return sensors
    .filter((sensor) => {
      const validCoordinates =
        isValidCoordinate(sensor.lat) &&
        isValidCoordinate(sensor.lng);

      if (!validCoordinates) {
        console.warn(
          `[Aqua] Skipping sensor ${sensor.sensorId}: invalid coordinates`,
          {
            lat: sensor.lat,
            lng: sensor.lng,
          },
        );
      }

      return validCoordinates;
    })
    .map((sensor) => {
      const prediction =
        predictionMap.get(sensor.sensorId);

      return {
        sensorId: sensor.sensorId,
        river: sensor.river,
        location: sensor.location,

        lat: sensor.lat,
        lng: sensor.lng,

        riskScore:
          prediction?.riskScore ?? 0,

        riskLevel:
          prediction?.riskLevel ?? "low",

        waterLevel:
          sensor.waterLevel,

        rainfall:
          sensor.rainfall,

        flowRate:
          sensor.flowRate,

        batteryLevel:
          sensor.batteryLevel,

        status:
          sensor.status,

        recordedAt:
          sensor.recordedAt,

        generatedAt:
          prediction?.generatedAt ?? null,

        confidence:
          prediction?.confidence ?? null,
      };
    });
}

export function sortByRisk(
  stations: RiskStation[],
): RiskStation[] {
  return [...stations].sort(
    (a, b) =>
      riskPriority[b.riskLevel] -
        riskPriority[a.riskLevel] ||
      b.riskScore - a.riskScore,
  );
}