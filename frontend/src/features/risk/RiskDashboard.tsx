import { useMemo, useState } from "react";
import { Activity, Radio, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

import { riverRiskData, rivers } from "./data/riskData";
import { useRiskData } from "./hooks/useRiskData";
import { LiveRiskMap } from "./components/LiveRiskMap";
import { RiskSummary } from "./components/RiskSummary";
import { TelemetryChart } from "./components/TelemetryChart";

export function RiskDashboard() {
  const {
    selectedRiver,
    setSelectedRiver,
    filteredData,
    averageRisk,
  } = useRiskData();

  const [selectedPointId, setSelectedPointId] =
    useState(riverRiskData[0].id);

  const selectedPoint = useMemo(
    () =>
      riverRiskData.find(
        (point) => point.id === selectedPointId,
      ) ?? filteredData[0],
    [selectedPointId, filteredData],
  );

  const handleRiverChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const river = event.target.value;

    setSelectedRiver(river);

    const firstPoint =
      river === "All Rivers"
        ? riverRiskData[0]
        : riverRiskData.find(
            (point) => point.river === river,
          );

    if (firstPoint) {
      setSelectedPointId(firstPoint.id);
    }
  };

  return (
    <section
      id="risk-dashboard"
      className="section-shell py-24"
    >
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Live risk intelligence
          </p>

          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
            Watch the river network
            <span className="text-gradient">
              {" "}
              change in real time.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-slate-400">
            A unified view of river conditions, sensor telemetry,
            rainfall and predictive risk signals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedRiver}
            onChange={handleRiverChange}
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
            aria-label="Select river"
          >
            {rivers.map((river) => (
              <option key={river}>{river}</option>
            ))}
          </select>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:bg-white/[0.08]"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <DashboardStat
          icon={<Activity size={18} />}
          label="Average risk"
          value={`${averageRisk}/100`}
        />

        <DashboardStat
          icon={<Radio size={18} />}
          label="Stations online"
          value={`${filteredData.filter(
            (point) => point.sensorStatus === "online",
          ).length}/${filteredData.length}`}
        />

        <DashboardStat
          icon={<Activity size={18} />}
          label="Active signals"
          value={`${filteredData.filter(
            (point) =>
              point.riskLevel === "high" ||
              point.riskLevel === "critical",
          ).length}`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <LiveRiskMap
          onSelectPoint={setSelectedPointId}
        />

        {selectedPoint && (
          <RiskSummary point={selectedPoint} />
        )}
      </div>

      <div className="mt-6">
        <TelemetryChart />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredData.map((point, index) => (
          <motion.button
            key={point.id}
            type="button"
            onClick={() => setSelectedPointId(point.id)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`rounded-2xl border p-4 text-left transition ${
              point.id === selectedPointId
                ? "border-cyan-400/40 bg-cyan-400/[0.06]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">
                  {point.river}
                </p>

                <p className="text-sm text-slate-400">
                  {point.location}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  {point.riskScore}
                </p>

                <p className="text-xs text-slate-500">
                  risk
                </p>
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${point.riskScore}%` }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.05,
                }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              />
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function DashboardStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-cyan-300">
        {icon}

        <span className="text-sm text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-3 text-3xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}