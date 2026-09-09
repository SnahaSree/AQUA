export type IntelligenceRiskLevel =
  | "low"
  | "moderate"
  | "high"
  | "critical";

export interface RiverOverview {
  river: string;
  riskScore: number;
  riskLevel: IntelligenceRiskLevel;

  waterLevel: number;
  rainfall: number;
  flowRate: number;
  temperature: number;

  trend: "rising" | "falling" | "stable";

  stationsOnline: number;
  stationsTotal: number;

  lastReadingAt: string | null;
  lastPredictionAt: string | null;

  predictionFreshness:
    | "fresh"
    | "expiring"
    | "expired"
    | "unavailable";
}

export interface IntelligenceOverview {
  generatedAt: string;
  rivers: RiverOverview[];

  summary: {
    totalRivers: number;
    lowRisk: number;
    moderateRisk: number;
    highRisk: number;
    criticalRisk: number;
    stationsOnline: number;
    stationsTotal: number;
  };
}

export interface AlertSummary {
  total: number;
  watch: number;
  warning: number;
  critical: number;
}

export interface StationHealthSummary {
  online: number;
  offline: number;
  stale: number;
  total: number;
}

export interface RiverIntelligenceSummary {
  river: string;

  risk: {
    score: number;
    level: IntelligenceRiskLevel;
  };

  telemetry: {
    waterLevel: number;
    rainfall: number;
    flowRate: number;
    temperature: number;
  };

  trend: "rising" | "falling" | "stable";

  stations: StationHealthSummary;

  alerts: AlertSummary;

  intelligenceScore: number;

  generatedAt: string;
}