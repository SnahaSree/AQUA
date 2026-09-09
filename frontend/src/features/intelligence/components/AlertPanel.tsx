import type {
  StationIntelligence,
} from "../types/intelligence.types";

interface AlertPanelProps {
  station: StationIntelligence | null;
}

export function AlertPanel({
  station,
}: AlertPanelProps) {
  if (!station) {
    return null;
  }

  const { alert } = station;

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Alert status
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
            {alert.triggered
              ? "Attention required"
              : "No active alert"}
          </h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize dark:bg-white/10">
          {alert.severity}
        </span>
      </div>

      {alert.reasons.length > 0 && (
        <ul className="mt-5 space-y-2">
          {alert.reasons.map((reason) => (
            <li
              key={reason}
              className="rounded-xl bg-slate-100/80 px-3 py-2 text-sm text-slate-700 dark:bg-white/[0.05] dark:text-slate-300"
            >
              {reason}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}