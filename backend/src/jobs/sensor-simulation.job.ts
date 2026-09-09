import cron from "node-cron";

import { SensorReading } from "../models/SensorReading.js";

interface SimulatedStation {
  sensorId: string;
  river: string;
  location: string;
  latitude: number;
  longitude: number;

  baseWaterLevel: number;
  baseRainfall: number;
  baseFlowRate: number;
  temperature: number;
}

interface SimulatedReading {
  sensorId: string;
  river: string;
  location: string;
  latitude: number;
  longitude: number;
  waterLevel: number;
  rainfall: number;
  flowRate: number;
  temperature: number;
  batteryLevel: number;
  status: "online";
  recordedAt: Date;
}

const stations: SimulatedStation[] = [
  {
    sensorId: "AQ-JAM-001",
    river: "Jamuna",
    location: "Bahadurabad",
    latitude: 25.2,
    longitude: 89.7,
    baseWaterLevel: 15.2,
    baseRainfall: 42,
    baseFlowRate: 2800,
    temperature: 27,
  },
  {
    sensorId: "AQ-PAD-001",
    river: "Padma",
    location: "Goalanda",
    latitude: 23.95,
    longitude: 89.75,
    baseWaterLevel: 12.8,
    baseRainfall: 30,
    baseFlowRate: 2200,
    temperature: 28,
  },
  {
    sensorId: "AQ-MEG-001",
    river: "Meghna",
    location: "Bhairab",
    latitude: 24.05,
    longitude: 90.98,
    baseWaterLevel: 10.5,
    baseRainfall: 24,
    baseFlowRate: 1800,
    temperature: 29,
  },
  {
    sensorId: "AQ-TEE-001",
    river: "Teesta",
    location: "Kaunia",
    latitude: 25.75,
    longitude: 89.42,
    baseWaterLevel: 8.4,
    baseRainfall: 18,
    baseFlowRate: 1300,
    temperature: 26,
  },
];

function randomVariation(magnitude: number): number {
  return (Math.random() * 2 - 1) * magnitude;
}

function clamp(
  value: number,
  minimum: number,
  maximum: number,
): number {
  return Math.min(
    Math.max(value, minimum),
    maximum,
  );
}

function createReading(
  station: SimulatedStation,
): SimulatedReading {
  const rainfall = clamp(
    station.baseRainfall +
      randomVariation(15),
    0,
    1000,
  );

  const waterLevel = clamp(
    station.baseWaterLevel +
      randomVariation(0.8) +
      rainfall * 0.008,
    0,
    100,
  );

  const flowRate = clamp(
    station.baseFlowRate +
      randomVariation(250) +
      rainfall * 4,
    0,
    100000,
  );

  const temperature = clamp(
    station.temperature +
      randomVariation(2),
    -50,
    70,
  );

  const batteryLevel = clamp(
    80 + randomVariation(5),
    0,
    100,
  );

  return {
    sensorId: station.sensorId,
    river: station.river,
    location: station.location,

    latitude: station.latitude,
    longitude: station.longitude,

    waterLevel: Number(
      waterLevel.toFixed(2),
    ),

    rainfall: Number(
      rainfall.toFixed(2),
    ),

    flowRate: Number(
      flowRate.toFixed(2),
    ),

    temperature: Number(
      temperature.toFixed(2),
    ),

    batteryLevel: Number(
      batteryLevel.toFixed(2),
    ),

    status: "online",

    recordedAt: new Date(),
  };
}

export async function generateSensorReadings(): Promise<
  SimulatedReading[]
> {
  const readings = stations.map(
    (station) => createReading(station),
  );

  await SensorReading.insertMany(
    readings,
  );

  console.info(
    `[sensor-simulation] Inserted ${readings.length} readings`,
  );

  return readings;
}

export function startSensorSimulationJob(): void {
  cron.schedule(
    "*/5 * * * *",
    async () => {
      try {
        await generateSensorReadings();
      } catch (error) {
        console.error(
          "[sensor-simulation] Failed",
          error,
        );
      }
    },
    {
      timezone: "UTC",
    },
  );

  console.info(
    "[sensor-simulation] Scheduled every 5 minutes",
  );
}