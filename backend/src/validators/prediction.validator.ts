import { z } from "zod";

const observationSchema = z.object({
  timestamp: z.string().datetime(),

  water_level: z
    .number()
    .min(0)
    .max(100),

  rainfall: z
    .number()
    .min(0)
    .max(1000),

  flow_rate: z
    .number()
    .min(0)
    .max(100000),

  temperature: z
    .number()
    .min(-50)
    .max(70),
});

export const predictionRequestSchema = z.object({
  sensor_id: z
    .string()
    .trim()
    .min(1)
    .max(100),

  river: z
    .string()
    .trim()
    .min(1)
    .max(100),

  observations: z
    .array(observationSchema)
    .min(8)
    .max(500),

  forecast_hours: z
    .number()
    .int()
    .min(1)
    .max(72),
});

export type PredictionRequest = z.infer<
  typeof predictionRequestSchema
>;