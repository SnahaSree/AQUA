export type RiskLevel =
  | "low"
  | "moderate"
  | "high"
  | "critical";

export type SensorStatus =
  | "online"
  | "offline"
  | "maintenance"
  | "warning";

export interface SensorReading {
  _id: string;
  sensorId: string;
  river: string;
  location: string;
  lat: number;
  lng: number;
  waterLevel: number;
  rainfall: number;
  flowRate: number;
  temperature: number;
  batteryLevel: number;
  status: SensorStatus;
  recordedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RiskPrediction {
  _id: string;
  sensorId: string;
  river: string;
  location: string;
  riskScore: number;
  riskLevel: RiskLevel;
  forecastHours: number;
  predictedWaterLevel: number;
  confidence: number;
  modelVersion: string;
  sourceReadingAt?: string;
  generatedAt: string;
  expiresAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface RiverSummary {
  river: string;
  stationCount: number;
  latestReading: string;
}

export interface RiverDetail {
  river: string;
  stationCount: number;
  latestReading: string;
  averageWaterLevel: number;
  averageRainfall: number;
  averageFlowRate: number;
}