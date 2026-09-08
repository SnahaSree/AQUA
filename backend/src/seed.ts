import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";

import {
  CaseStudy,
  SensorReading,
  RiskPrediction,
} from "./models/index.js";

const stations = [
  {
    sensorId: "AQ-JAM-001",
    river: "Jamuna",
    location: "Bahadurabad",
    latitude: 25.17,
    longitude: 89.68,
    waterLevel: 19.42,
    rainfall: 42,
    flowRate: 18500,
    temperature: 28,
    batteryLevel: 94,
    status: "online" as const,
  },
  {
    sensorId: "AQ-PAD-001",
    river: "Padma",
    location: "Goalanda",
    latitude: 23.96,
    longitude: 89.76,
    waterLevel: 8.31,
    rainfall: 27,
    flowRate: 14200,
    temperature: 29,
    batteryLevel: 88,
    status: "online" as const,
  },
  {
    sensorId: "AQ-MEG-001",
    river: "Meghna",
    location: "Bhairab",
    latitude: 24.05,
    longitude: 90.98,
    waterLevel: 5.87,
    rainfall: 18,
    flowRate: 9800,
    temperature: 28,
    batteryLevel: 91,
    status: "online" as const,
  },
  {
    sensorId: "AQ-TEE-001",
    river: "Teesta",
    location: "Kaunia",
    latitude: 25.76,
    longitude: 89.43,
    waterLevel: 29.18,
    rainfall: 67,
    flowRate: 21100,
    temperature: 27,
    batteryLevel: 61,
    status: "warning" as const,
  },
];

const predictions = [
  {
    sensorId: "AQ-JAM-001",
    river: "Jamuna",
    location: "Bahadurabad",
    riskScore: 78,
    riskLevel: "high" as const,
    forecastHours: 6,
    predictedWaterLevel: 19.81,
    confidence: 0.91,
    modelVersion: "Aqua-LSTM-Attention-v1",
  },
  {
    sensorId: "AQ-PAD-001",
    river: "Padma",
    location: "Goalanda",
    riskScore: 61,
    riskLevel: "moderate" as const,
    forecastHours: 6,
    predictedWaterLevel: 8.48,
    confidence: 0.87,
    modelVersion: "Aqua-LSTM-Attention-v1",
  },
  {
    sensorId: "AQ-MEG-001",
    river: "Meghna",
    location: "Bhairab",
    riskScore: 43,
    riskLevel: "moderate" as const,
    forecastHours: 6,
    predictedWaterLevel: 5.94,
    confidence: 0.84,
    modelVersion: "Aqua-LSTM-Attention-v1",
  },
  {
    sensorId: "AQ-TEE-001",
    river: "Teesta",
    location: "Kaunia",
    riskScore: 87,
    riskLevel: "critical" as const,
    forecastHours: 6,
    predictedWaterLevel: 29.63,
    confidence: 0.94,
    modelVersion: "Aqua-LSTM-Attention-v1",
  },
];

const caseStudies = [
  {
    title: "Jamuna Basin Early Warning Pilot",
    slug: "jamuna-basin-early-warning",
    location: "Bahadurabad, Bangladesh",
    summary:
      "A demonstration deployment combining river telemetry and predictive risk intelligence.",
    challenge:
      "Communities near rapidly changing river systems need earlier and clearer warning signals.",
    solution:
      "Aqua combines water-level observations, rainfall signals and predictive models into a unified monitoring workflow.",
    impact:
      "The pilot demonstrates how multiple environmental signals can be transformed into a single operational risk view.",
    metrics: [
      {
        label: "Monitoring points",
        value: "12",
      },
      {
        label: "Forecast horizon",
        value: "6 hr",
      },
      {
        label: "Signal types",
        value: "4",
      },
    ],
    tags: ["Flood", "Telemetry", "Prediction"],
    published: true,
  },
  {
    title: "Teesta Risk Monitoring Study",
    slug: "teesta-risk-monitoring",
    location: "Kaunia, Bangladesh",
    summary:
      "A simulated high-risk scenario demonstrating proactive river monitoring.",
    challenge:
      "Rapid water-level changes can create a narrow window for operational response.",
    solution:
      "Aqua continuously evaluates telemetry trends and converts them into interpretable risk scores.",
    impact:
      "Operators receive a prioritized view of stations requiring attention.",
    metrics: [
      {
        label: "Risk score",
        value: "87/100",
      },
      {
        label: "Station status",
        value: "Warning",
      },
      {
        label: "Model confidence",
        value: "94%",
      },
    ],
    tags: ["Flood", "Early Warning", "AI"],
    published: true,
  },
];

async function seed() {
  try {
    await connectDatabase();

    console.log("Clearing demo collections...");

    await Promise.all([
      SensorReading.deleteMany({}),
      RiskPrediction.deleteMany({}),
      CaseStudy.deleteMany({}),
    ]);

    const now = new Date();

    await SensorReading.insertMany(
      stations.map((station) => ({
        ...station,
        recordedAt: now,
      })),
    );

    await RiskPrediction.insertMany(
      predictions.map((prediction) => ({
        ...prediction,
        generatedAt: now,
        expiresAt: new Date(
          now.getTime() + 6 * 60 * 60 * 1000,
        ),
      })),
    );

    await CaseStudy.insertMany(caseStudies);

    console.log("✓ Aqua demo data seeded successfully");
    console.log(
      `✓ ${stations.length} sensor stations`,
    );
    console.log(
      `✓ ${predictions.length} risk predictions`,
    );
    console.log(
      `✓ ${caseStudies.length} case studies`,
    );
  } catch (error) {
    console.error("✗ Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();