import axios from "axios";

import type {
  IntelligenceOverview,
  RiverSummary,
  RiverRiskHistory,
  StationIntelligence,
} from "../features/intelligence/types/intelligence.types";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    "http://localhost:5000/api/v1",
});

// ------------------------------------
// AQUA INTELLIGENCE API
// ------------------------------------

export async function getIntelligenceOverview(): Promise<IntelligenceOverview> {
  const response = await api.get<{
    success: boolean;
    data: IntelligenceOverview;
  }>("/intelligence/overview");

  return response.data.data;
}

export async function getRiverSummary(
  river: string,
): Promise<RiverSummary> {
  const response = await api.get<{
    success: boolean;
    data: RiverSummary;
  }>(
    `/intelligence/rivers/${encodeURIComponent(
      river,
    )}/summary`,
  );

  return response.data.data;
}

export async function getRiskHistory(
  river: string,
  hours = 24,
): Promise<RiverRiskHistory> {
  const response = await api.get<{
    success: boolean;
    data: {
      river: string;
      hours: number;
      points: RiverRiskHistory["points"];
    };
  }>(
    `/intelligence/rivers/${encodeURIComponent(
      river,
    )}/trend`,
    {
      params: {
        hours,
      },
    },
  );

  return {
    river: response.data.data.river,
    hours: response.data.data.hours,
    points: response.data.data.points,
  };
}

export async function getStationIntelligence(
  sensorId: string,
): Promise<StationIntelligence> {
  const response = await api.get<{
    success: boolean;
    data: StationIntelligence;
  }>(
    `/intelligence/stations/${encodeURIComponent(
      sensorId,
    )}`,
  );

  return response.data.data;
}