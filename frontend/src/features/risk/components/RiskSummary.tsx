import {
  Activity,
  CloudRain,
  Droplets,
  Gauge,
  TrendingUp,
} from "lucide-react";

import type { RiverRiskPoint } from "../data/riskData";

interface RiskSummaryProps {
  point: RiverRiskPoint;
}

export function RiskSummary({ point }: RiskSummaryProps) {
  const distanceToDanger = (
    point.dangerLevel - point.waterLevel
  ).toFixed(2);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">
            Selected station
          </p>

          <h3 className="mt-1 text-2xl font-semibold text-white">
            {point.river}
          </h3>

          <p className="text-sm text-slate-400">
            {point.location}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Risk score
          </p>

          <p className="text-4xl font-bold text-white">
            {point.riskScore}
          </p>

          <p className="text-xs capitalize text-orange-300">
            {point.riskLevel} risk
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-slate-400">
          <span>Current risk</span>
          <span>{point.riskScore}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-500"
            style={{ width: `${point.riskScore}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Stat
          icon={<Droplets size={17} />}
          label="Water level"
          value={`${point.waterLevel} m`}
        />

        <Stat
          icon={<Gauge size={17} />}
          label="Danger level"
          value={`${point.dangerLevel} m`}
        />

        <Stat
          icon={<CloudRain size={17} />}
          label="Rainfall"
          value={`${point.rainfall} mm`}
        />

        <Stat
          icon={<Activity size={17} />}
          label="Flow rate"
          value={`${point.flowRate.toLocaleString()} m³/s`}
        />
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-3 text-sm">
        <TrendingUp
          size={17}
          className={
            point.trend === "rising"
              ? "text-orange-400"
              : "text-emerald-400"
          }
        />

        <span className="text-slate-300">
          {point.trend === "rising"
            ? `${distanceToDanger} m below danger level`
            : "Conditions currently stable"}
        </span>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="text-xs text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}