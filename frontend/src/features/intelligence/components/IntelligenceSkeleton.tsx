export function IntelligenceSkeleton() {
  return (
    <div
      className="space-y-6"
      aria-label="Loading intelligence dashboard"
      aria-busy="true"
    >
      <div className="h-32 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" />

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10"
            />
          ),
        )}
      </div>

      <div className="h-[520px] animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" />
    </div>
  );
}