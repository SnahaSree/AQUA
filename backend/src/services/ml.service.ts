import axios, { AxiosError } from "axios";
import { env } from "../config/env.js";

export interface MLSensorObservation {
  timestamp: string;
  water_level: number;
  rainfall: number;
  flow_rate: number;
  temperature: number;
}

export interface MLPredictionRequest {
  sensor_id: string;
  river: string;
  observations: MLSensorObservation[];
  forecast_hours: number;
}

export interface MLPredictionResponse {
  sensor_id: string;
  river: string;
  risk_score: number;
  risk_level: "low" | "moderate" | "high" | "critical";
  forecast_hours: number;
  predicted_water_level: number;
  confidence: number;
  model_version: string;
  generated_at: string;
}

const mlClient = axios.create({
  baseURL: env.ML_SERVICE_URL,
  timeout: env.ML_SERVICE_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    "X-ML-Service-Key": env.ML_SERVICE_API_KEY,
  },
});

export async function requestPrediction(
  payload: MLPredictionRequest,
): Promise<MLPredictionResponse> {
  try {
    const response = await mlClient.post<MLPredictionResponse>(
      "/api/v1/predictions/predict",
      payload,
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.code === "ECONNABORTED") {
      throw new Error("ML service request timed out");
    }

    if (axiosError.response) {
      throw new Error(
        `ML service returned HTTP ${axiosError.response.status}`,
      );
    }

    throw new Error("Unable to connect to ML service");
  }
}