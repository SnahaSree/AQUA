import { SensorReading } from "../../models/SensorReading.js";
import { RiskPrediction } from "../../models/RiskPrediction.js";

interface PaginationInput {
  page: number;
  limit: number;
}

export class IntelligenceService {
  async getSensors(
    filters: {
      river?: string;
      status?: "online" | "offline" | "maintenance";
    },
    pagination: PaginationInput,
  ) {
    const query: Record<string, unknown> = {};

    if (filters.river) {
      query.river = filters.river;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [items, total] = await Promise.all([
      SensorReading.aggregate([
        { $match: query },
        {
          $sort: {
            recordedAt: -1,
          },
        },
        {
          $group: {
            _id: "$sensorId",
            latest: {
              $first: "$$ROOT",
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: "$latest",
          },
        },
        {
          $sort: {
            recordedAt: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: pagination.limit,
        },
      ]),
      SensorReading.distinct("sensorId", query).then(
        (sensorIds) => sensorIds.length,
      ),
    ]);

    return {
      items,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }

  async getSensor(sensorId: string) {
    return SensorReading.findOne({ sensorId })
      .sort({ recordedAt: -1 })
      .lean();
  }

  async getLatestReading(sensorId: string) {
    return SensorReading.findOne({ sensorId })
      .sort({ recordedAt: -1 })
      .lean();
  }

  async getReadings(
    filters: {
      river?: string;
      sensorId?: string;
      from?: string;
      to?: string;
    },
    pagination: PaginationInput,
  ) {
    const query: Record<string, unknown> = {};

    if (filters.river) {
      query.river = filters.river;
    }

    if (filters.sensorId) {
      query.sensorId = filters.sensorId;
    }

    if (filters.from || filters.to) {
      const recordedAt: Record<string, Date> = {};

      if (filters.from) {
        recordedAt.$gte = new Date(filters.from);
      }

      if (filters.to) {
        recordedAt.$lte = new Date(filters.to);
      }

      query.recordedAt = recordedAt;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [items, total] = await Promise.all([
      SensorReading.find(query)
        .sort({ recordedAt: -1 })
        .skip(skip)
        .limit(pagination.limit)
        .lean(),

      SensorReading.countDocuments(query),
    ]);

    return {
      items,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }

  async getRivers() {
    const rivers = await SensorReading.aggregate([
      {
        $group: {
          _id: "$river",
          sensorIds: {
            $addToSet: "$sensorId",
          },
          latestReading: {
            $max: "$recordedAt",
          },
        },
      },
      {
        $project: {
          _id: 0,
          river: "$_id",
          stationCount: {
            $size: "$sensorIds",
          },
          latestReading: 1,
        },
      },
      {
        $sort: {
          river: 1,
        },
      },
    ]);

    return rivers;
  }

  async getRiver(river: string) {
    const [summary] = await SensorReading.aggregate([
      {
        $match: {
          river,
        },
      },
      {
        $group: {
          _id: "$river",
          sensorIds: {
            $addToSet: "$sensorId",
          },
          latestReading: {
            $max: "$recordedAt",
          },
          averageWaterLevel: {
            $avg: "$waterLevel",
          },
          averageRainfall: {
            $avg: "$rainfall",
          },
          averageFlowRate: {
            $avg: "$flowRate",
          },
        },
      },
      {
        $project: {
          _id: 0,
          river: "$_id",
          stationCount: {
            $size: "$sensorIds",
          },
          latestReading: 1,
          averageWaterLevel: {
            $round: ["$averageWaterLevel", 2],
          },
          averageRainfall: {
            $round: ["$averageRainfall", 2],
          },
          averageFlowRate: {
            $round: ["$averageFlowRate", 2],
          },
        },
      },
    ]);

    return summary ?? null;
  }

  async getPredictions(
    filters: {
      river?: string;
      riskLevel?: "low" | "moderate" | "high" | "critical";
    },
    pagination: PaginationInput,
  ) {
    const query: Record<string, unknown> = {};

    if (filters.river) {
      query.river = filters.river;
    }

    if (filters.riskLevel) {
      query.riskLevel = filters.riskLevel;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [items, total] = await Promise.all([
      RiskPrediction.find(query)
        .sort({ generatedAt: -1 })
        .skip(skip)
        .limit(pagination.limit)
        .lean(),

      RiskPrediction.countDocuments(query),
    ]);

    return {
      items,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }

  async getLatestPredictions() {
    return RiskPrediction.aggregate([
      {
        $sort: {
          generatedAt: -1,
        },
      },
      {
        $group: {
          _id: "$sensorId",
          latest: {
            $first: "$$ROOT",
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$latest",
        },
      },
      {
        $sort: {
          riskScore: -1,
        },
      },
    ]);
  }

  async getPredictionsForSensor(sensorId: string) {
    return RiskPrediction.find({ sensorId })
      .sort({ generatedAt: -1 })
      .lean();
  }
}

export const intelligenceService = new IntelligenceService();