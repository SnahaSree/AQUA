import { z } from "zod";

const positiveInteger = z.coerce
  .number()
  .int()
  .positive();

const optionalDate = z
  .string()
  .datetime({ offset: true })
  .optional();

export const sensorListQuerySchema = z.object({
  river: z.string().trim().min(1).max(100).optional(),
  status: z.enum(["online", "offline", "maintenance"]).optional(),
  page: positiveInteger.default(1),
  limit: positiveInteger.max(100).default(20),
});

export const readingQuerySchema = z.object({
  river: z.string().trim().min(1).max(100).optional(),
  sensorId: z.string().trim().min(1).max(100).optional(),
  from: optionalDate,
  to: optionalDate,
  page: positiveInteger.default(1),
  limit: positiveInteger.max(100).default(20),
});

export const predictionQuerySchema = z.object({
  river: z.string().trim().min(1).max(100).optional(),
  riskLevel: z
    .enum(["low", "moderate", "high", "critical"])
    .optional(),
  page: positiveInteger.default(1),
  limit: positiveInteger.max(100).default(20),
});

export const sensorIdParamSchema = z.object({
  sensorId: z.string().trim().min(1).max(100),
});

export const riverParamSchema = z.object({
  river: z.string().trim().min(1).max(100),
});