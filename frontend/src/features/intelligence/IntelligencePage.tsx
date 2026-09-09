import { useMemo, useState } from "react";

import {
  useIntelligenceOverview,
} from "./hooks/useIntelligenceOverview";

import {
  useRiverSummary,
} from "./hooks/useRiverSummary";

import {
  useRiskHistory,
} from "./hooks/useRiskHistory";

import {
  useStationIntelligence,
} from "./hooks/useStationIntelligence";

import {
  IntelligenceHeader,
} from "./components/IntelligenceHeader";

import {
  OverallRiskCard,
} from "./components/OverallRiskCard";

import {
  StationHealthCard,
} from "./components/StationHealthCard";

import {
  RiverGrid,
} from "./components/RiverGrid";

import {
  TelemetryOverview,
} from "./components/TelemetryOverview";

import {
  RiskHistoryChart,
} from "./components/RiskHistoryChart";

import {
  IntelligenceMap,
} from "./components/IntelligenceMap";

import {
  StationIntelligencePanel,
} from "./components/StationIntelligencePanel";

import {
  AlertPanel,
} from "./components/AlertPanel";

import {
  PredictionStatus,
} from "./components/PredictionStatus";

import {
  IntelligenceSkeleton,
} from "./components/IntelligenceSkeleton";

export function IntelligencePage() {
  const {
    data,
    loading,
    error,
    refresh,
  } = useIntelligenceOverview();

  const [selectedRiver, setSelectedRiver] =
    useState<string | null>(null);

  const selectedRiverName =
    selectedRiver ??
    data?.rivers[0]?.river ??
    null;

  const {
    data: riverSummary,
  } =
    useRiverSummary(
      selectedRiverName,
    );

  const {
    data: riskHistory,
  } =
    useRiskHistory(
      selectedRiverName,
      24,
    );

  const selectedSensor =
    data?.rivers.find(
      (river) =>
        river.river ===
        selectedRiverName,
    )?.river ?? null;

  const sensorId =
    selectedSensor === "Jamuna"
      ? "AQ-JAM-001"
      : selectedSensor === "Padma"
        ? "AQ-PAD-001"
        : selectedSensor === "Meghna"
          ? "AQ-MEG-001"
          : selectedSensor === "Teesta"
            ? "AQ-TEE-001"
            : null;

  const {
    data: station,
  } =
    useStationIntelligence(sensorId);

  const averageRisk =
    useMemo(() => {
      if (!data?.rivers.length) {
        return 0;
      }

      return (
        data.rivers.reduce(
          (sum, river) =>
            sum + river.riskScore,
          0,
        ) / data.rivers.length
      );
    }, [data]);

  if (loading && !data) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-[#070a12] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <IntelligenceSkeleton />
        </div>
      </main>
    );
  }

  if (error && !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-[#070a12]">
        <section className="max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center dark:border-red-500/20 dark:bg-white/[0.04]">
          <h1 className="text-xl font-semibold text-slate-950 dark:text-white">
            Intelligence unavailable
          </h1>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() => void refresh()}
            className="mt-6 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-[#070a12] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <IntelligenceHeader
          generatedAt={data.generatedAt}
          onRefresh={() => void refresh()}
          refreshing={loading}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <OverallRiskCard
            averageRisk={averageRisk}
            critical={data.summary.criticalRisk}
            high={data.summary.highRisk}
            moderate={data.summary.moderateRisk}
            low={data.summary.lowRisk}
          />

          <StationHealthCard
            online={
              data.summary.stationsOnline
            }
            total={
              data.summary.stationsTotal
            }
          />

          <PredictionStatus
            summary={riverSummary}
          />
        </div>

        <RiverGrid
          rivers={data.rivers}
          selectedRiver={selectedRiverName}
          onSelectRiver={setSelectedRiver}
        />

        <IntelligenceMap
          rivers={data.rivers}
        />

        <TelemetryOverview
          summary={riverSummary}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <RiskHistoryChart
            data={riskHistory}
          />

          <StationIntelligencePanel
            station={station}
          />
        </div>

        <AlertPanel
          station={station}
        />
      </div>
    </main>
  );
}