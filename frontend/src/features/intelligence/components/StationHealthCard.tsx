interface StationHealthCardProps {
  online: number;
  total: number;
}

export function StationHealthCard({
  online,
  total,
}: StationHealthCardProps) {
  const percentage =
    total > 0
      ? (online / total) * 100
      : 0;

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sensor network
          </p>

          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
            {online}/{total}
          </p>
        </div>

        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {percentage.toFixed(0)}% online
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </section>
  );
}