import axios from "axios";
import type { Request, Response } from "express";

import { env } from "../config/env.js";

export async function mlHealth(
  _req: Request,
  res: Response,
) {
  try {
    const response = await axios.get(
      `${env.ML_SERVICE_URL}/api/v1/health`,
      {
        timeout: env.ML_SERVICE_TIMEOUT_MS,
      },
    );

    res.status(200).json({
      success: true,
      service: "ml-service",
      status: "healthy",
      data: response.data,
    });
  } catch {
    res.status(503).json({
      success: false,
      service: "ml-service",
      status: "unavailable",
    });
  }
}