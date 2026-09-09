import { Schema, model } from "mongoose";

const riskPredictionSchema = new Schema(
  {
    sensorId: {
      type: String,
      required: true,
      index: true,
    },

    river: {
      type: String,
      required: true,
      index: true,
    },

    location: {
      type: String,
      required: true,
    },

    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    riskLevel: {
      type: String,
      enum: ["low", "moderate", "high", "critical"],
      required: true,
      index: true,
    },

    forecastHours: {
      type: Number,
      required: true,
      min: 1,
      max: 168,
    },

    predictedWaterLevel: {
      type: Number,
      required: true,
      min: 0,
    },

    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    modelVersion: {
      type: String,
      required: true,
      trim: true,
    },

    sourceReadingAt: {
  type: Date,
  required: true,
},

    generatedAt: {
      type: Date,
      required: true,
      index: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

riskPredictionSchema.index({
  river: 1,
  generatedAt: -1,
});

riskPredictionSchema.index({
  sensorId: 1,
  generatedAt: -1,
});
riskPredictionSchema.index({
  expiresAt: 1,
});
riskPredictionSchema.index(
  {
    sensorId: 1,
    sourceReadingAt: 1,
  },
  {
    unique: true,
  },
);


export const RiskPrediction = model(
  "RiskPrediction",
  riskPredictionSchema,
);