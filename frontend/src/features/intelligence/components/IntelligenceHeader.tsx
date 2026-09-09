import { RefreshCw } from "lucide-react";

interface IntelligenceHeaderProps {
  generatedAt: string | null;
  onRefresh: () => void;
  refreshing: boolean;
}

export function IntelligenceHeader({
  generatedAt,
  onRefresh,
  refreshing,
}: IntelligenceHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          AQUA / INTELLIGENCE
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          River intelligence
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          Real-time telemetry, predictive risk,
          station health, and emerging flood
          signals across monitored river systems.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {generatedAt && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Updated{" "}
            {new Date(
              generatedAt,
            ).toLocaleTimeString()}
          </span>
        )}

        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.08]"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              refreshing
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh
        </button>
      </div>
    </header>
  );
}