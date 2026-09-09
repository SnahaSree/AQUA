import { motion } from "framer-motion";

interface OverallRiskCardProps {
  averageRisk: number;
  critical: number;
  high: number;
  moderate: number;
  low: number;
}

export function OverallRiskCard({
  averageRisk,
  critical,
  high,
  moderate,
  low,
}: OverallRiskCardProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Regional risk index
          </p>

          <p className="mt-2 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {averageRisk.toFixed(0)}
          </p>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Current intelligence score
          </p>
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-200 dark:border-white/10">
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            {averageRisk.toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <RiskCount label="Critical" value={critical} />
        <RiskCount label="High" value={high} />
        <RiskCount label="Moderate" value={moderate} />
        <RiskCount label="Low" value={low} />
      </div>
    </motion.section>
  );
}

function RiskCount({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-slate-100/80 p-3 dark:bg-white/[0.05]">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}