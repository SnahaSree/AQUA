import { z } from "zod";

export const riverParamSchema = z.object({
  river: z
    .string()
    .trim()
    .min(1)
    .max(100),
});

export const sensorParamSchema = z.object({
  sensorId: z
    .string()
    .trim()
    .min(1)
    .max(100),
});

export const trendQuerySchema = z.object({
  hours: z.coerce
    .number()
    .int()
    .min(1)
    .max(168)
    .default(24),
});