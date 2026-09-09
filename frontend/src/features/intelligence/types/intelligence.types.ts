export type RiskLevel =
  | "low"
  | "moderate"
  | "high"
  | "critical";

export type Trend =
  | "rising"
  | "falling"
  | "stable";

export type PredictionFreshness =
  | "fresh"
  | "expiring"
  | "expired"
  | "unavailable";

export type AlertSeverity =
  | "none"
  | "watch"
  | "warning"
  | "critical";

export interface RiverOverview {
  river: string;
  riskScore: number;
  riskLevel: RiskLevel;

  waterLevel: number;
  rainfall: number;
  flowRate: number;
  temperature: number;

  trend: Trend;

  stationsOnline: number;
  stationsTotal: number;

  lastReadingAt: string | null;
  lastPredictionAt: string | null;

  predictionFreshness: PredictionFreshness;
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

export interface RiskHistoryPoint {
  timestamp: string;
  riskScore: number;
  riskLevel: RiskLevel;
  confidence: number;
  modelVersion: string;
}

export interface RiverRiskHistory {
  river: string;
  hours: number;
  points: RiskHistoryPoint[];
}

export interface RiverSummary {
  river: string;

  risk: {
    score: number;
    level: RiskLevel;
  };

  telemetry: {
    waterLevel: number;
    rainfall: number;
    flowRate: number;
    temperature: number;
  };

  trend: Trend;

  stations: {
    online: number;
    offline: number;
    stale: number;
    total: number;
  };

  alerts: {
    total: number;
    watch: number;
    warning: number;
    critical: number;
  };

  intelligenceScore: number;
  intelligenceLevel: RiskLevel;

  predictionFreshness: PredictionFreshness;

  generatedAt: string;
}

export interface StationIntelligence {
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
    status: string;
    recordedAt: string;
  } | null;

  prediction: {
    riskScore: number;
    riskLevel: RiskLevel;
    forecastHours: number;
    predictedWaterLevel: number;
    confidence: number;
    modelVersion: string;
    generatedAt: string;
    expiresAt: string;
    freshness: PredictionFreshness;
  } | null;

  trend: Trend;

  alert: {
    severity: AlertSeverity;
    triggered: boolean;
    reasons: string[];
  };
}