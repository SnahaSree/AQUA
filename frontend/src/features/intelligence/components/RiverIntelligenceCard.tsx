import type {
  RiverOverview,
} from "../types/intelligence.types";

import {
  getRiskLabel,
  getTrendLabel,
} from "../utils/intelligence.utils";

interface RiverIntelligenceCardProps {
  river: RiverOverview;
  selected: boolean;
  onSelect: () => void;
}

export function RiverIntelligenceCard({
  river,
  selected,
  onSelect,
}: RiverIntelligenceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-3xl border p-5 text-left transition-all duration-300 ${
        selected
          ? "border-slate-900 bg-slate-950 text-white shadow-xl dark:border-white dark:bg-white dark:text-slate-950"
          : "border-slate-200/70 bg-white/80 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p
            className={`text-xs ${
              selected
                ? "text-white/60 dark:text-slate-500"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            River
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            {river.river}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-3xl font-semibold">
            {river.riskScore.toFixed(0)}
          </p>

          <p className="text-xs opacity-60">
            risk score
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric
          label="Level"
          value={`${river.waterLevel.toFixed(1)} m`}
          selected={selected}
        />

        <Metric
          label="Trend"
          value={getTrendLabel(river.trend)}
          selected={selected}
        />

        <Metric
          label="Risk"
          value={getRiskLabel(river.riskLevel)}
          selected={selected}
        />

        <Metric
          label="Stations"
          value={`${river.stationsOnline}/${river.stationsTotal}`}
          selected={selected}
        />
      </div>
    </button>
  );
}

function Metric({
  label,
  value,
  selected,
}: {
  label: string;
  value: string;
  selected: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-3 ${
        selected
          ? "bg-white/10 dark:bg-slate-100"
          : "bg-slate-100/80 dark:bg-white/[0.05]"
      }`}
    >
      <p
        className={`text-xs ${
          selected
            ? "opacity-60"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {label}
      </p>

      <p className="mt-1 text-sm font-medium">
        {value}
      </p>
    </div>
  );
}