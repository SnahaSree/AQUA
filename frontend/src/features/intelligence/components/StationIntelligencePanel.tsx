import type {
  StationIntelligence,
} from "../types/intelligence.types";

interface StationIntelligencePanelProps {
  station: StationIntelligence | null;
}

export function StationIntelligencePanel({
  station,
}: StationIntelligencePanelProps) {
  if (!station) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitoring station
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
            {station.location}
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {station.sensorId}
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {station.reading?.status ?? "Unknown"}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Data
          label="Water level"
          value={`${station.reading?.waterLevel.toFixed(2) ?? "--"} m`}
        />

        <Data
          label="Rainfall"
          value={`${station.reading?.rainfall.toFixed(1) ?? "--"} mm`}
        />

        <Data
          label="Flow"
          value={`${station.reading?.flowRate.toFixed(0) ?? "--"} m³/s`}
        />

        <Data
          label="Battery"
          value={`${station.reading?.batteryLevel.toFixed(0) ?? "--"}%`}
        />
      </div>

      {station.prediction && (
        <div className="mt-4 rounded-2xl bg-slate-100/80 p-4 dark:bg-white/[0.05]">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Forecast risk
          </p>

          <div className="mt-1 flex items-end justify-between">
            <p className="text-3xl font-semibold text-slate-950 dark:text-white">
              {station.prediction.riskScore.toFixed(0)}
            </p>

            <p className="text-sm capitalize text-slate-500 dark:text-slate-400">
              {station.prediction.riskLevel}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function Data({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-100/80 p-3 dark:bg-white/[0.05]">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}