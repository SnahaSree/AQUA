
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0a1821] dark:shadow-none">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
            Historical intelligence
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
            Risk history
          </h2>
        </div>

        <div className="mt-6 flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02]">
          <p className="max-w-sm px-6 text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
            No historical prediction data is
            available yet.
          </p>
        </div>
      </section>
    );
  }

  const chartData = data.points.map(
    (point) => ({
      timestamp: point.timestamp,
      time: new Date(
        point.timestamp,
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      risk: Number(point.riskScore),
    }),
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-[#0a1821] dark:shadow-none">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
          {data.river} · 24 hours
        </p>

        <div className="mt-1 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Risk history
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Predicted risk score over time
            </p>
          </div>

          <div className="hidden rounded-xl bg-slate-100 px-3 py-2 text-right sm:block dark:bg-white/[0.05]">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-500">
              Latest
            </p>

            <p className="text-lg font-bold text-slate-950 dark:text-white">
              {chartData[
                chartData.length - 1
              ]?.risk.toFixed(0) ?? "--"}
            </p>
          </div>
        </div>
      </div>

      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 8,
              right: 8,
              left: -18,
              bottom: 4,
            }}
          >
            <CartesianGrid
              stroke="#94a3b8"
              strokeOpacity={0.16}
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              minTickGap={28}
              tick={{
                fontSize: 11,
                fill: "#64748b",
              }}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[
                0,
                20,
                40,
                60,
                80,
                100,
              ]}
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 11,
                fill: "#64748b",
              }}
              width={42}
            />

            <Tooltip
              cursor={{
                stroke: "#94a3b8",
                strokeOpacity: 0.25,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                background:
                  "rgba(15, 23, 42, 0.96)",
                color: "#ffffff",
                boxShadow:
                  "0 12px 30px rgba(0, 0, 0, 0.18)",
              }}
              labelStyle={{
                color: "#cbd5e1",
                fontSize: 12,
                marginBottom: 4,
              }}
              formatter={(value) => [
                `${Number(value).toFixed(0)}`,
                "Risk score",
              ]}
            />

            <Line
              type="monotone"
              dataKey="risk"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: "#ffffff",
                fill: "#22d3ee",
              }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Lower risk</span>

        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-cyan-400"
          />

          <span>
            Risk score · 0–100
          </span>
        </div>

        <span>Higher risk</span>
      </div>
    </section>
  );
}
