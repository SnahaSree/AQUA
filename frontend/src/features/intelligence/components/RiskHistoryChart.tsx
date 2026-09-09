import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import type {
  RiverRiskHistory,
} from "../types/intelligence.types";

interface RiskHistoryChartProps {
  data: RiverRiskHistory | null;
}

export function RiskHistoryChart({
  data,
}: RiskHistoryChartProps) {
  if (!data || data.points.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-white/10 dark:bg-white/[0.04]">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
          Risk history
        </h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          No historical prediction data is available yet.
        </p>
      </section>
    );
  }

  const chartData =
    data.points.map((point) => ({
      time: new Date(
        point.timestamp,
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      risk: point.riskScore,
    }));

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {data.river}
        </p>

        <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
          Risk history
        </h2>
      </div>

      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.15}
            />

            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              minTickGap={24}
            />

            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="risk"
              stroke="currentColor"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}