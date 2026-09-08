import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  MONGODB_URI: z.string().min(1),

  JWT_SECRET: z.string().min(32),

  FRONTEND_ORIGIN: z.string().url(),

  ML_SERVICE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);