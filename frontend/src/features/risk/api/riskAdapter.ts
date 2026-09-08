import type {
  RiskPrediction,
  SensorReading,
} from "../types/risk.types";

export interface MapRiskPoint {
  id: string;
  river: string;
  location: string;
  lat: number;
  lng: number;
  riskScore: number;
  riskLevel:
    | "low"
    | "moderate"
    | "high"
    | "critical";
  waterLevel: number;
  rainfall: number;
  status:
    | "online"
    | "offline"
    | "maintenance"
    | "warning";

}

export function buildRiskPoints(
  sensors: SensorReading[],
  predictions: RiskPrediction[],
): MapRiskPoint[] {
  const predictionsBySensor = new Map(
    predictions.map((prediction) => [
      prediction.sensorId,
      prediction,
    ]),
  );

  return sensors.map((sensor) => {
    const prediction =
      predictionsBySensor.get(sensor.sensorId);

    return {
      id: sensor.sensorId,
      river: sensor.river,
      location: sensor.location,
      lat: sensor.lat,
      lng: sensor.lng,
      riskScore: prediction?.riskScore ?? 0,
      riskLevel:
        prediction?.riskLevel ?? "low",
      waterLevel: sensor.waterLevel,
      rainfall: sensor.rainfall,
      status: sensor.status,
    };
  });
}