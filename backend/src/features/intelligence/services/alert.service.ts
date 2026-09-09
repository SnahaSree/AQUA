export type AlertSeverity =
  | "none"
  | "watch"
  | "warning"
  | "critical";

export interface AlertEvaluation {
  severity: AlertSeverity;
  triggered: boolean;
  reasons: string[];
}

export function evaluateAlert(
  riskScore: number,
  trend: "rising" | "falling" | "stable",
  waterLevel: number,
): AlertEvaluation {
  const reasons: string[] = [];

  if (riskScore >= 80) {
    reasons.push(
      "Predicted flood risk is critical.",
    );
  } else if (riskScore >= 60) {
    reasons.push(
      "Predicted flood risk is high.",
    );
  }

  if (trend === "rising") {
    reasons.push(
      "Water level is rising.",
    );
  }

  if (waterLevel >= 18) {
    reasons.push(
      "Water level is approaching the critical threshold.",
    );
  }

  let severity: AlertSeverity = "none";

  if (riskScore >= 80 || waterLevel >= 18) {
    severity = "critical";
  } else if (
    riskScore >= 60 ||
    trend === "rising"
  ) {
    severity = "warning";
  } else if (riskScore >= 30) {
    severity = "watch";
  }

  return {
    severity,
    triggered: severity !== "none",
    reasons,
  };
}