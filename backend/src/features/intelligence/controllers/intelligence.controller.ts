import type {NextFunction,
 Request, Response } from "express";

import {
  getIntelligenceOverview,
  getRiverIntelligence,
} from "../services/intelligence.service.js";

import { getRiverTrend } from "../services/trend.service.js";

import {
  riverParamSchema,
    sensorParamSchema,

  trendQuerySchema,
} from "../validators/intelligence.validator.js";

import { getStationIntelligence } from "../services/station.service.js";
import {
  getRiverSummary,
} from "../services/river-summary.service.js";

export async function overview(
  _req: Request,
  res: Response,
) {
  const data = await getIntelligenceOverview();

  res.status(200).json({
    success: true,
    data,
  });
}

export async function river(
  req: Request,
  res: Response,
) {
  const { river } = riverParamSchema.parse(
    req.params,
  );

  const data = await getRiverIntelligence(river);

  if (!data) {
    res.status(404).json({
      success: false,
      message: "River not found",
    });

    return;
  }

  res.status(200).json({
    success: true,
    data,
  });
}

export async function riverTrend(
  req: Request,
  res: Response,
) {
  const { river } = riverParamSchema.parse(
    req.params,
  );

  const { hours } = trendQuerySchema.parse(
    req.query,
  );

  const data = await getRiverTrend(
    river,
    hours,
  );

  res.status(200).json({
    success: true,
    data: {
      river,
      hours,
      points: data,
    },
  });
}

export async function getStationIntelligenceController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { sensorId } =
      sensorParamSchema.parse(req.params);

    const station =
      await getStationIntelligence(sensorId);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: station,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRiverSummaryController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { river } =
      riverParamSchema.parse(req.params);

    const summary =
      await getRiverSummary(river);

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: "River not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
}