import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import type { Express } from "express";
import { env } from "../config/env.js";

export function configureSecurity(app: Express) {
  app.disable("x-powered-by");

  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: "cross-origin",
      },
    }),
  );

  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }),
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 200,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      message: {
        success: false,
        message: "Too many requests. Please try again later.",
      },
    }),
  );
}