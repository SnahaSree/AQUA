import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const telemetry = [
  { time: "06:00", level: 17.8 },
  { time: "08:00", level: 18.1 },
  { time: "10:00", level: 18.4 },
  { time: "12:00", level: 18.7 },
  { time: "14:00", level: 19.0 },
  { time: "16:00", level: 19.2 },
  { time: "18:00", level: 19.42 },
];

export function TelemetryChart() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
          River telemetry
        </p>

        <h3 className="mt-1 text-xl font-semibold text-white">
          Water level trend
        </h3>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={telemetry}>
            <defs>
              <linearGradient
                id="waterGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#22d3ee"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#22d3ee"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.08)"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              width={42}
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="level"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#waterGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}