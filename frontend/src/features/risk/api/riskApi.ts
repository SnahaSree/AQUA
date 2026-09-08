import { apiGet } from "../../../lib/api/client";

import type {
  ApiResponse,
  PaginatedResponse,
  RiverDetail,
  RiverSummary,
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
  riskLevel?:
    | "low"
    | "moderate"
    | "high"
    | "critical";
  page?: number;
  limit?: number;
}

interface ApiSensorReading {
  _id: string;
  sensorId: string;
  river: string;
  location: string;
  latitude: number;
  longitude: number;
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
  createdAt?: string;
  updatedAt?: string;
}

interface ApiPaginatedSensorResponse {
  success: boolean;
  data: ApiSensorReading[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ApiSensorResponse {
  success: boolean;
  data: ApiSensorReading;
}

function buildQuery(
  params: Record<
    string,
    string | number | undefined
  >,
): string {
  const searchParams = new URLSearchParams();

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

  const query = searchParams.toString();

  return query ? `?${query}` : "";
}

function normalizeSensor(
  sensor: ApiSensorReading,
): SensorReading {
  return {
    _id: sensor._id,
    sensorId: sensor.sensorId,
    river: sensor.river,
    location: sensor.location,

    lat: sensor.latitude,
    lng: sensor.longitude,

    waterLevel: sensor.waterLevel,
    rainfall: sensor.rainfall,
    flowRate: sensor.flowRate,
    temperature: sensor.temperature,
    batteryLevel: sensor.batteryLevel,
    status: sensor.status,
    recordedAt: sensor.recordedAt,
    createdAt: sensor.createdAt,
    updatedAt: sensor.updatedAt,
  };
}

function normalizeSensors(
  response: ApiPaginatedSensorResponse,
): PaginatedResponse<SensorReading> {
  return {
    success: response.success,
    data: response.data.map(normalizeSensor),
    pagination: response.pagination,
  };
}

export async function getSensors(
  params: SensorListParams = {},
  signal?: AbortSignal,
): Promise<PaginatedResponse<SensorReading>> {
  const query = buildQuery({
    river: params.river,
    status: params.status,
    page: params.page,
    limit: params.limit,
  });

  const response =
    await apiGet<ApiPaginatedSensorResponse>(
      `/intelligence/sensors${query}`,
      signal,
    );

  return normalizeSensors(response);
}

export async function getSensor(
  sensorId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<SensorReading>> {
  const response =
    await apiGet<ApiSensorResponse>(
      `/intelligence/sensors/${encodeURIComponent(
        sensorId,
      )}`,
      signal,
    );

  return {
    success: response.success,
    data: normalizeSensor(response.data),
  };
}

export async function getLatestReading(
  sensorId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<SensorReading>> {
  const response =
    await apiGet<ApiSensorResponse>(
      `/intelligence/sensors/${encodeURIComponent(
        sensorId,
      )}/latest`,
      signal,
    );

  return {
    success: response.success,
    data: normalizeSensor(response.data),
  };
}

export async function getReadings(
  params: ReadingParams = {},
  signal?: AbortSignal,
): Promise<PaginatedResponse<SensorReading>> {
  const query = buildQuery({
    river: params.river,
    sensorId: params.sensorId,
    from: params.from,
    to: params.to,
    page: params.page,
    limit: params.limit,
  });

  const response =
    await apiGet<ApiPaginatedSensorResponse>(
      `/intelligence/sensors/readings${query}`,
      signal,
    );

  return normalizeSensors(response);
}

export async function getSensorReadings(
  sensorId: string,
  params: Omit<
    ReadingParams,
    "sensorId"
  > = {},
  signal?: AbortSignal,
): Promise<PaginatedResponse<SensorReading>> {
  const query = buildQuery({
    river: params.river,
    from: params.from,
    to: params.to,
    page: params.page,
    limit: params.limit,
  });

  const response =
    await apiGet<ApiPaginatedSensorResponse>(
      `/intelligence/sensors/${encodeURIComponent(
        sensorId,
      )}/readings${query}`,
      signal,
    );

  return normalizeSensors(response);
}

export async function getRivers(
  signal?: AbortSignal,
): Promise<ApiResponse<RiverSummary[]>> {
  return apiGet<ApiResponse<RiverSummary[]>>(
    "/intelligence/rivers",
    signal,
  );
}

export async function getRiver(
  river: string,
  signal?: AbortSignal,
): Promise<ApiResponse<RiverDetail>> {
  return apiGet<ApiResponse<RiverDetail>>(
    `/intelligence/rivers/${encodeURIComponent(
      river,
    )}`,
    signal,
  );
}

export async function getPredictions(
  params: PredictionParams = {},
  signal?: AbortSignal,
): Promise<PaginatedResponse<RiskPrediction>> {
  const query = buildQuery({
    river: params.river,
    riskLevel: params.riskLevel,
    page: params.page,
    limit: params.limit,
  });

  return apiGet<
    PaginatedResponse<RiskPrediction>
  >(
    `/intelligence/predictions${query}`,
    signal,
  );
}

export async function getLatestPredictions(
  signal?: AbortSignal,
): Promise<ApiResponse<RiskPrediction[]>> {
  return apiGet<
    ApiResponse<RiskPrediction[]>
  >(
    "/intelligence/predictions/latest",
    signal,
  );
}

export async function getSensorPredictions(
  sensorId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<RiskPrediction[]>> {
  return apiGet<
    ApiResponse<RiskPrediction[]>
  >(
    `/intelligence/predictions/${encodeURIComponent(
      sensorId,
    )}`,
    signal,
  );
}