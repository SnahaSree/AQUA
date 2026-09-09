import type {
  RiverSummary,
} from "../types/intelligence.types";

import {
  getFreshnessLabel,
} from "../utils/intelligence.utils";

interface PredictionStatusProps {
  summary: RiverSummary | null;
}

export function PredictionStatus({
  summary,
}: PredictionStatusProps) {
  if (!summary) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Prediction status
      </p>

      <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
        {getFreshnessLabel(
          summary.predictionFreshness,
        )}
      </p>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Intelligence score{" "}
        {summary.intelligenceScore.toFixed(0)}
      </p>
    </div>
  );
}