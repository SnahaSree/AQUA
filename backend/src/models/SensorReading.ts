import { Schema, model } from "mongoose";

const sensorReadingSchema = new Schema(
  {
    sensorId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    river: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },

    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },

    waterLevel: {
      type: Number,
      required: true,
      min: 0,
    },

    rainfall: {
      type: Number,
      required: true,
      min: 0,
    },

    flowRate: {
      type: Number,
      required: true,
      min: 0,
    },

    temperature: {
      type: Number,
      min: -50,
      max: 70,
    },

    batteryLevel: {
      type: Number,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["online", "warning", "offline"],
      default: "online",
      index: true,
    },

    recordedAt: {
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

sensorReadingSchema.index({
  sensorId: 1,
  recordedAt: -1,
});

sensorReadingSchema.index({
  river: 1,
  recordedAt: -1,
});

export const SensorReading = model(
  "SensorReading",
  sensorReadingSchema,
);