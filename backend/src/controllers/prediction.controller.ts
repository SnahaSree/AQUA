import type { Request, Response } from "express";

import { predictionRequestSchema } from "../validators/prediction.validator.js";
import { generateAndStorePrediction } from "../services/prediction.service.js";

export async function generatePrediction(
  req: Request,
  res: Response,
) {
  const payload = predictionRequestSchema.parse(req.body);

  const prediction =
    await generateAndStorePrediction(payload);

  res.status(201).json({
    success: true,
    data: prediction,
  });
}