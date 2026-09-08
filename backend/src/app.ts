import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import  {pinoHttp } from "pino-http";

import { env } from "./config/env.js";

export const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use(
  express.json({
    limit: "100kb",
  }),
);

app.use(pinoHttp());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "aqua-api",
    status: "healthy",
  });
});