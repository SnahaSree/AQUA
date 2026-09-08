import type { Request, Response, NextFunction } from "express";

import {
  predictionQuerySchema,
  riverParamSchema,
  readingQuerySchema,
  sensorIdParamSchema,
  sensorListQuerySchema,
} from "./intelligence.validator.js";

import { intelligenceService } from "./intelligence.service.js";

export class IntelligenceController {
  async getSensors(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = sensorListQuerySchema.parse(req.query);

      const result = await intelligenceService.getSensors(
        {
          river: query.river,
          status: query.status,
        },
        {
          page: query.page,
          limit: query.limit,
        },
      );

      res.json({
        success: true,
        data: result.items,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSensor(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { sensorId } = sensorIdParamSchema.parse(req.params);

      const sensor =
        await intelligenceService.getSensor(sensorId);

      if (!sensor) {
        res.status(404).json({
          success: false,
          message: "Sensor not found",
        });
        return;
      }

      res.json({
        success: true,
        data: sensor,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLatestReading(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { sensorId } = sensorIdParamSchema.parse(req.params);

      const reading =
        await intelligenceService.getLatestReading(sensorId);

      if (!reading) {
        res.status(404).json({
          success: false,
          message: "No reading found for this sensor",
        });
        return;
      }

      res.json({
        success: true,
        data: reading,
      });
    } catch (error) {
      next(error);
    }
  }

  async getReadings(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = readingQuerySchema.parse(req.query);
    const params = req.params;

    const sensorId =
      typeof params.sensorId === "string"
        ? params.sensorId
        : query.sensorId;

    if (params.sensorId) {
      sensorIdParamSchema.parse({
        sensorId: params.sensorId,
      });
    }

    const result =
      await intelligenceService.getReadings(
        {
          river: query.river,
          sensorId,
          from: query.from,
          to: query.to,
        },
        {
          page: query.page,
          limit: query.limit,
        },
      );

    res.json({
      success: true,
      data: result.items,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
}
  async getRivers(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const rivers = await intelligenceService.getRivers();

      res.json({
        success: true,
        data: rivers,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRiver(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { river } = riverParamSchema.parse(req.params);

      const result =
        await intelligenceService.getRiver(river);

      if (!result) {
        res.status(404).json({
          success: false,
          message: "River not found",
        });
        return;
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPredictions(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = predictionQuerySchema.parse(req.query);

      const result =
        await intelligenceService.getPredictions(
          {
            river: query.river,
            riskLevel: query.riskLevel,
          },
          {
            page: query.page,
            limit: query.limit,
          },
        );

      res.json({
        success: true,
        data: result.items,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLatestPredictions(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const predictions =
        await intelligenceService.getLatestPredictions();

      res.json({
        success: true,
        data: predictions,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPredictionsForSensor(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { sensorId } = sensorIdParamSchema.parse(req.params);

      const predictions =
        await intelligenceService.getPredictionsForSensor(
          sensorId,
        );

      res.json({
        success: true,
        data: predictions,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const intelligenceController =
  new IntelligenceController();