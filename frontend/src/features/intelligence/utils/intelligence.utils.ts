import type {
  RiskLevel,
  Trend,
  PredictionFreshness,
} from "../types/intelligence.types";

export function getRiskLabel(
  level: RiskLevel,
): string {
  return (
    level.charAt(0).toUpperCase() +
    level.slice(1)
  );
}

export function getTrendLabel(
  trend: Trend,
): string {
  switch (trend) {
    case "rising":
      return "Rising";

    case "falling":
      return "Falling";

    default:
      return "Stable";
  }
}

export function getFreshnessLabel(
  freshness: PredictionFreshness,
): string {
  switch (freshness) {
    case "fresh":
      return "Prediction fresh";

    case "expiring":
      return "Prediction expiring";

    case "expired":
      return "Prediction expired";

    default:
      return "Prediction unavailable";
  }
}

export function formatTime(
  value: string | null,
): string {
  if (!value) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(new Date(value));
}