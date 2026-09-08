import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(5000),

  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required"),

  CLIENT_URL: z
    .string()
    .url("CLIENT_URL must be a valid URL"),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must contain at least 32 characters"),

  JWT_EXPIRES_IN: z.string().default("30m"),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
});

export const env = envSchema.parse(process.env);