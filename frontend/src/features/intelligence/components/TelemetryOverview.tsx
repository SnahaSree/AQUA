import type {
  RiverSummary,
} from "../types/intelligence.types";

interface TelemetryOverviewProps {
  summary: RiverSummary | null;
}

export function TelemetryOverview({
  summary,
}: TelemetryOverviewProps) {
  if (!summary) {
    return null;
  }

  const metrics = [
    {
      label: "Water level",
      value: `${summary.telemetry.waterLevel.toFixed(2)} m`,
    },
    {
      label: "Rainfall",
      value: `${summary.telemetry.rainfall.toFixed(1)} mm`,
    },
    {
      label: "Flow rate",
      value: `${summary.telemetry.flowRate.toFixed(0)} m³/s`,
    },
    {
      label: "Temperature",
      value: `${summary.telemetry.temperature.toFixed(1)} °C`,
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Live telemetry
        </p>

        <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">
          {summary.river} conditions
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {metric.label}
            </p>

            <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}