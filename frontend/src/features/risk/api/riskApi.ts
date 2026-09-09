import { apiGet } from "../../../lib/api/client";

import type {
  ApiResponse,
  PaginatedResponse,
  RiverDetail,
  RiverSummary,
  RiskLevel,
  RiskPrediction,
  SensorReading,
} from "../types/risk.types";

export interface SensorListParams {
  river?: string;
  status?:
    | "online"
    | "offline"
    | "maintenance"
    | "warning";
  page?: number;
  limit?: number;
}

export interface ReadingParams {
  river?: string;
  sensorId?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface PredictionParams {
  river?: string;
  riskLevel?: RiskLevel;
  page?: number;
  limit?: number;
}

interface BackendRiverIntelligence {
  river: string;
  riskScore: number;
  riskLevel: RiskLevel;

  waterLevel: number;
  rainfall: number;
  flowRate: number;
  temperature: number;

  trend: string;

  stationsOnline: number;
  stationsTotal: number;

  coordinates?: {
    lat: number;
    lng: number;
  };

  latestReadingAt?: string;

  batteryLevel?: number;
  sensorStatus?: SensorReading["status"];
}

interface BackendOverview {
  success: boolean;
  data: {
    generatedAt: string;

    summary: {
      criticalRisk: number;
      highRisk: number;
      moderateRisk: number;
      lowRisk: number;
      stationsOnline: number;
      stationsTotal: number;
    };

    rivers: BackendRiverIntelligence[];
  };
}

interface BackendTrendPoint {
  timestamp: string;
  waterLevel?: number;
  rainfall?: number;
  flowRate?: number;
  riskScore?: number;
  riskLevel?: RiskLevel;
}

interface BackendTrendResponse {
  success: boolean;
  data: {
    river: string;
    hours: number;
    points: BackendTrendPoint[];
  };
}

interface BackendStationResponse {
  success: boolean;
  data: {
    sensorId: string;
    river: string;
    location: string;

    coordinates: {
      lat: number;
      lng: number;
    };

    reading: {
      waterLevel: number;
      rainfall: number;
      flowRate: number;
      temperature: number;
      batteryLevel: number;
      status:
        | "online"
        | "offline"
        | "maintenance"
        | "warning";
      recordedAt: string;
    };

    prediction?: {
      riskScore: number;
      riskLevel: RiskLevel;
      forecastHours: number;
      predictedWaterLevel: number;
      confidence: number;
      modelVersion: string;
      generatedAt: string;
      expiresAt: string;
    };
  };
}

function buildQuery(
  params: Record<
    string,
    string | number | undefined
  >,
): string {
  const searchParams =
    new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== ""
      ) {
        searchParams.set(
          key,
          String(value),
        );
      }
    },
  );

  const query =
    searchParams.toString();

  return query
    ? `?${query}`
    : "";
}

/*
|--------------------------------------------------------------------------
| Station mapping
|--------------------------------------------------------------------------
|
| The current backend exposes individual station
| intelligence endpoints rather than the previous
| /intelligence/sensors endpoint.
|
*/

const STATIONS = [
  "AQ-JAM-001",
  "AQ-PAD-001",
  "AQ-MEG-001",
  "AQ-TEE-001",
] as const;

function normalizeStation(
  response: BackendStationResponse,
): SensorReading {
  const station =
    response.data;

  return {
    _id: station.sensorId,

    sensorId:
      station.sensorId,

    river:
      station.river,

    location:
      station.location,

    lat:
      station.coordinates.lat,

    lng:
      station.coordinates.lng,

    waterLevel:
      station.reading.waterLevel,

    rainfall:
      station.reading.rainfall,

    flowRate:
      station.reading.flowRate,

    temperature:
      station.reading.temperature,

    batteryLevel:
      station.reading.batteryLevel,

    status:
      station.reading.status,

    recordedAt:
      station.reading.recordedAt,
  };
}

/*
|--------------------------------------------------------------------------
| Intelligence overview
|--------------------------------------------------------------------------
*/

export async function getIntelligenceOverview() {
  return apiGet<BackendOverview>(
    "/intelligence/overview",
  );
}

/*
|--------------------------------------------------------------------------
| Sensors
|--------------------------------------------------------------------------
*/

export async function getSensors(
  params: SensorListParams = {},
  signal?: AbortSignal,
): Promise<
  PaginatedResponse<SensorReading>
> {
  const responses =
    await Promise.all(
      STATIONS.map(
        (sensorId) =>
          apiGet<BackendStationResponse>(
            `/intelligence/stations/${encodeURIComponent(
              sensorId,
            )}`,
            signal,
          ),
      ),
    );

  let sensors =
    responses.map(normalizeStation);

  if (params.river) {
    sensors =
      sensors.filter(
        (sensor) =>
          sensor.river ===
          params.river,
      );
  }

  if (params.status) {
    sensors =
      sensors.filter(
        (sensor) =>
          sensor.status ===
          params.status,
      );
  }

  const page =
    params.page ?? 1;

  const limit =
    params.limit ?? 100;

  const total =
    sensors.length;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        total / limit,
      ),
    );

  const start =
    (page - 1) *
    limit;

  const paginated =
    sensors.slice(
      start,
      start + limit,
    );

  return {
    success: true,

    data: paginated,

    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

/*
|--------------------------------------------------------------------------
| Single sensor
|--------------------------------------------------------------------------
*/

export async function getSensor(
  sensorId: string,
  signal?: AbortSignal,
): Promise<
  ApiResponse<SensorReading>
> {
  const response =
    await apiGet<BackendStationResponse>(
      `/intelligence/stations/${encodeURIComponent(
        sensorId,
      )}`,
      signal,
    );

  return {
    success:
      response.success,

    data:
      normalizeStation(response),
  };
}

/*
|--------------------------------------------------------------------------
| Latest sensor reading
|--------------------------------------------------------------------------
*/

export async function getLatestReading(
  sensorId: string,
  signal?: AbortSignal,
): Promise<
  ApiResponse<SensorReading>
> {
  return getSensor(
    sensorId,
    signal,
  );
}

/*
|--------------------------------------------------------------------------
| Sensor telemetry
|--------------------------------------------------------------------------
*/

export async function getSensorReadings(
  sensorId: string,
  params: Omit<
    ReadingParams,
    "sensorId"
  > = {},
  signal?: AbortSignal,
): Promise<
  PaginatedResponse<SensorReading>
> {
  const response =
    await getSensor(
      sensorId,
      signal,
    );

  const sensor =
    response.data;

  /*
   * The current station endpoint gives us
   * the latest reading only.
   *
   * Historical telemetry comes from the
   * river trend endpoint.
   */

  const trend =
    await apiGet<BackendTrendResponse>(
      `/intelligence/rivers/${encodeURIComponent(
        sensor.river,
      )}/trend${buildQuery({
        hours: 24,
      })}`,
      signal,
    );

  const points =
    trend.data.points;

  let readings: SensorReading[] =
    points.map(
      (point, index) => ({
        _id:
          `${sensor.sensorId}-${index}`,

        sensorId:
          sensor.sensorId,

        river:
          sensor.river,

        location:
          sensor.location,

        lat:
          sensor.lat,

        lng:
          sensor.lng,

        waterLevel:
          point.waterLevel ??
          sensor.waterLevel,

        rainfall:
          point.rainfall ??
          sensor.rainfall,

        flowRate:
          point.flowRate ??
          sensor.flowRate,

        temperature:
          sensor.temperature,

        batteryLevel:
          sensor.batteryLevel,

        status:
          sensor.status,

        recordedAt:
          point.timestamp,

      }),
    );

  if (
    params.from
  ) {
    const from =
      new Date(params.from)
        .getTime();

    readings =
      readings.filter(
        (reading) =>
          new Date(
            reading.recordedAt,
          ).getTime() >=
          from,
      );
  }

  if (
    params.to
  ) {
    const to =
      new Date(params.to)
        .getTime();

    readings =
      readings.filter(
        (reading) =>
          new Date(
            reading.recordedAt,
          ).getTime() <=
          to,
      );
  }

  const page =
    params.page ?? 1;

  const limit =
    params.limit ?? 20;

  const total =
    readings.length;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        total / limit,
      ),
    );

  const start =
    (page - 1) *
    limit;

  return {
    success: true,

    data:
      readings.slice(
        start,
        start + limit,
      ),

    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

/*
|--------------------------------------------------------------------------
| Generic readings
|--------------------------------------------------------------------------
*/

export async function getReadings(
  params: ReadingParams = {},
  signal?: AbortSignal,
): Promise<
  PaginatedResponse<SensorReading>
> {
  if (params.sensorId) {
    return getSensorReadings(
      params.sensorId,
      params,
      signal,
    );
  }

  const sensors =
    await getSensors(
      {
        river:
          params.river,
        page: 1,
        limit: 100,
      },
      signal,
    );

  const allReadings =
    await Promise.all(
      sensors.data.map(
        (sensor) =>
          getSensorReadings(
            sensor.sensorId,
            {
              from:
                params.from,
              to:
                params.to,
              page: 1,
              limit:
                params.limit ??
                100,
            },
            signal,
          ),
      ),
    );

  const combined =
    allReadings.flatMap(
      (result) =>
        result.data,
    );

  const page =
    params.page ?? 1;

  const limit =
    params.limit ?? 20;

  const total =
    combined.length;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        total / limit,
      ),
    );

  const start =
    (page - 1) *
    limit;

  return {
    success: true,

    data:
      combined.slice(
        start,
        start + limit,
      ),

    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

/*
|--------------------------------------------------------------------------
| Rivers
|--------------------------------------------------------------------------
*/

export async function getRivers(
  signal?: AbortSignal,
): Promise<
  ApiResponse<RiverSummary[]>
> {
  const response =
    await apiGet<BackendOverview>(
      "/intelligence/overview",
      signal,
    );

  return {
    success:
      response.success,

    data:
      response.data.rivers.map(
        (river) => ({
          river:
            river.river,

          stationCount:
            river.stationsTotal,

          latestReading:
            river.latestReadingAt ??
            response.data.generatedAt,
        }),
      ),
  };
}

/*
|--------------------------------------------------------------------------
| River detail
|--------------------------------------------------------------------------
*/

export async function getRiver(
  river: string,
  signal?: AbortSignal,
): Promise<
  ApiResponse<RiverDetail>
> {
  const response =
    await apiGet<{
      success: boolean;
      data: BackendRiverIntelligence;
    }>(
      `/intelligence/rivers/${encodeURIComponent(
        river,
      )}`,
      signal,
    );

  const data =
    response.data;

  return {
    success:
      response.success,

    data: {
      river:
        data.river,

      stationCount:
        data.stationsTotal,

      latestReading:
        data.latestReadingAt ??
        new Date().toISOString(),

      averageWaterLevel:
        data.waterLevel,

      averageRainfall:
        data.rainfall,

      averageFlowRate:
        data.flowRate,
    },
  };
}

/*
|--------------------------------------------------------------------------
| Predictions
|--------------------------------------------------------------------------
*/
export async function getPredictions(
  params: PredictionParams = {},
  signal?: AbortSignal,
): Promise<
  PaginatedResponse<RiskPrediction>
> {
  const sensors =
    await getSensors(
      {
        river:
          params.river,
        page: 1,
        limit: 100,
      },
      signal,
    );

  const predictions =
    await Promise.all(
      sensors.data.map(
        async (sensor): Promise<RiskPrediction | null> => {
          try {
            const response =
              await apiGet<BackendStationResponse>(
                `/intelligence/stations/${encodeURIComponent(
                  sensor.sensorId,
                )}`,
                signal,
              );

            if (
              !response.data.prediction
            ) {
              return null;
            }

            const prediction =
              response.data.prediction;

            const normalizedPrediction: RiskPrediction =
              {
                _id:
                  `${sensor.sensorId}-${prediction.generatedAt}`,

                sensorId:
                  sensor.sensorId,

                river:
                  sensor.river,

                location:
                  sensor.location,

                riskScore:
                  prediction.riskScore,

                riskLevel:
                  prediction.riskLevel,

                forecastHours:
                  prediction.forecastHours,

                predictedWaterLevel:
                  prediction.predictedWaterLevel,

                confidence:
                  prediction.confidence,

                modelVersion:
                  prediction.modelVersion,

                generatedAt:
                  prediction.generatedAt,

                expiresAt:
                  prediction.expiresAt,

                sourceReadingAt:
                  sensor.recordedAt,
              };

            return normalizedPrediction;
          } catch {
            return null;
          }
        },
      ),
    );

  let result =
    predictions.filter(
      (
        prediction,
      ): prediction is RiskPrediction =>
        prediction !== null,
    );

  if (params.riskLevel) {
    result =
      result.filter(
        (prediction) =>
          prediction.riskLevel ===
          params.riskLevel,
      );
  }

  const page =
    params.page ?? 1;

  const limit =
    params.limit ?? 100;

  const total =
    result.length;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        total / limit,
      ),
    );

  const start =
    (page - 1) *
    limit;

  return {
    success: true,

    data:
      result.slice(
        start,
        start + limit,
      ),

    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}
/*
|--------------------------------------------------------------------------
| Latest predictions
|--------------------------------------------------------------------------
*/

export async function getLatestPredictions(
  signal?: AbortSignal,
): Promise<
  ApiResponse<RiskPrediction[]>
> {
  const response =
    await getPredictions(
      {
        page: 1,
        limit: 100,
      },
      signal,
    );

  return {
    success:
      response.success,

    data:
      response.data,
  };
}

/*
|--------------------------------------------------------------------------
| Predictions for one sensor
|--------------------------------------------------------------------------
*/

export async function getSensorPredictions(
  sensorId: string,
  signal?: AbortSignal,
): Promise<
  ApiResponse<RiskPrediction[]>
> {
  const response =
    await apiGet<BackendStationResponse>(
      `/intelligence/stations/${encodeURIComponent(
        sensorId,
      )}`,
      signal,
    );

  const prediction =
    response.data.prediction;

  if (!prediction) {
    return {
      success:
        response.success,

      data: [],
    };
  }

  const sensor =
    response.data;

  return {
    success:
      response.success,

    data: [
      {
        _id:
          `${sensor.sensorId}-${prediction.generatedAt}`,

        sensorId:
          sensor.sensorId,

        river:
          sensor.river,

        location:
          sensor.location,

        riskScore:
          prediction.riskScore,

        riskLevel:
          prediction.riskLevel,

        forecastHours:
          prediction.forecastHours,

        predictedWaterLevel:
          prediction.predictedWaterLevel,

        confidence:
          prediction.confidence,

        modelVersion:
          prediction.modelVersion,

        generatedAt:
          prediction.generatedAt,

        expiresAt:
          prediction.expiresAt,

        sourceReadingAt:
          sensor.reading.recordedAt,
      },
    ],
  };
}