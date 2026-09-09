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

ENABLE_SENSOR_SIMULATION: z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true"),

  ML_SERVICE_URL: z
  .string()
  .url()
  .default("http://127.0.0.1:8000"),

ML_SERVICE_API_KEY: z
  .string()
  .min(16)
  .default("development-ml-service-key-change-me"),

ML_SERVICE_TIMEOUT_MS: z
  .coerce
  .number()
  .int()
  .positive()
  .default(5000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;