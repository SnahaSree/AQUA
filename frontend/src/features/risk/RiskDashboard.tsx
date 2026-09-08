import { useMemo, useState } from "react";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { motion } from "framer-motion";

import { useRiskData } from "./hooks/useRiskData";
import {
  combineRiskData,
  sortByRisk,
} from "./utils/risk.utils";

import { LiveRiskMap } from "./components/LiveRiskMap";
import { RiskSummary } from "./components/RiskSummary";
import { TelemetryChart } from "./components/TelemetryChart";

export function RiskDashboard() {
  const {
    sensors,
    predictions,
    loading,
    refreshing,
    error,
    lastUpdated,
    refresh,
  } = useRiskData();

  const [selectedSensorId, setSelectedSensorId] =
    useState<string | null>(null);

  const stations = useMemo(
    () =>
      sortByRisk(
        combineRiskData(
          sensors,
          predictions,
        ),
      ),
    [sensors, predictions],
  );

  const selectedStation =
    stations.find(
      (station) =>
        station.sensorId ===
        selectedSensorId,
    ) ?? stations[0];

  const averageRisk = useMemo(() => {
    if (stations.length === 0) {
      return 0;
    }

    const total = stations.reduce(
      (sum, station) =>
        sum + station.riskScore,
      0,
    );

    return Math.round(
      total / stations.length,
    );
  }, [stations]);

  const onlineStations = stations.filter(
    (station) =>
      station.status === "online",
  ).length;

  const activeSignals = predictions.filter(
    (prediction) =>
      prediction.riskLevel === "high" ||
      prediction.riskLevel === "critical",
  ).length;

  if (loading) {
    return (
      <section
        id="risk-dashboard"
        className="px-6 py-24"
        aria-labelledby="risk-dashboard-title"
      >
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 rounded bg-slate-200 dark:bg-slate-800" />

            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="h-[500px] rounded-3xl bg-slate-200 dark:bg-slate-800" />

              <div className="h-[500px] rounded-3xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="risk-dashboard"
        className="px-6 py-24"
        aria-labelledby="risk-dashboard-title"
      >
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
            <div className="mb-4 flex items-center gap-3">
              <WifiOff
                className="text-red-500"
                size={24}
                aria-hidden="true"
              />

              <h2
                id="risk-dashboard-title"
                className="text-xl font-semibold"
              >
                Intelligence unavailable
              </h2>
            </div>

            <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void refresh()}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <RefreshCw
                size={16}
                aria-hidden="true"
              />
              Retry connection
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="risk-dashboard"
      className="px-6 py-24"
      aria-labelledby="risk-dashboard-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                Live intelligence
              </span>
            </div>

            <h2
              id="risk-dashboard-title"
              className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl"
            >
              River risk intelligence
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Real-time sensor observations and
              risk predictions from the Aqua
              intelligence API.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
              aria-live="polite"
            >
              <Wifi
                size={14}
                className="text-emerald-500"
                aria-hidden="true"
              />

              {lastUpdated
                ? `Updated ${lastUpdated.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "Connected"}
            </div>

            <button
              type="button"
              onClick={() => void refresh()}
              disabled={refreshing}
              aria-label="Refresh intelligence data"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <RefreshCw
                size={15}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
                aria-hidden="true"
              />
              Refresh
            </button>
          </div>
        </div>

        <RiskSummary
          averageRisk={averageRisk}
          stationsOnline={onlineStations}
          activeSignals={activeSignals}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <LiveRiskMap
            stations={stations}
            selectedSensorId={
              selectedStation?.sensorId ?? null
            }
            onSelectSensor={
              setSelectedSensorId
            }
          />

          <TelemetryChart
            sensorId={
              selectedStation?.sensorId ??
              null
            }
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-950 dark:text-white">
                Monitoring stations
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {stations.length} station
                {stations.length === 1
                  ? ""
                  : "s"} reporting
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {stations.map((station) => (
              <button
                key={station.sensorId}
                type="button"
                onClick={() =>
                  setSelectedSensorId(
                    station.sensorId,
                  )
                }
                className={`rounded-xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  selectedStation?.sensorId ===
                  station.sensorId
                    ? "border-cyan-500 bg-cyan-500/5"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-medium text-slate-950 dark:text-white">
                    {station.river}
                  </span>

                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      station.status ===
                      "online"
                        ? "bg-emerald-500"
                        : "bg-slate-400"
                    }`}
                    aria-label={
                      station.status
                    }
                  />
                </div>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {station.location}
                </p>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-slate-950 dark:text-white">
                      {station.riskScore}
                    </p>

                    <p className="text-[11px] uppercase tracking-wide text-slate-500">
                      Risk score
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {station.waterLevel}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Water level
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}