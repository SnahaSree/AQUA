
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

const SENSOR_IDS: Record<string, string> = {
  Jamuna: "AQ-JAM-001",
  Padma: "AQ-PAD-001",
  Meghna: "AQ-MEG-001",
  Teesta: "AQ-TEE-001",
};

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
    selectedRiver &&
    data?.rivers.some(
      (river) =>
        river.river === selectedRiver,
    )
      ? selectedRiver
      : data?.rivers[0]?.river ?? null;

  const {
    data: riverSummary,
  } = useRiverSummary(
    selectedRiverName,
  );

  const {
    data: riskHistory,
  } = useRiskHistory(
    selectedRiverName,
    24,
  );

  const sensorId =
    selectedRiverName
      ? SENSOR_IDS[selectedRiverName] ?? null
      : null;

  const {
    data: station,
  } = useStationIntelligence(
    sensorId,
  );

  const averageRisk = useMemo(() => {
    if (!data?.rivers.length) {
      return 0;
    }

    const totalRisk = data.rivers.reduce(
      (sum, river) =>
        sum + river.riskScore,
      0,
    );

    return totalRisk / data.rivers.length;
  }, [data]);

  if (loading && !data) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 pb-12 pt-28 text-slate-950 transition-colors duration-300 dark:bg-[#061018] dark:text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <IntelligenceSkeleton />
        </div>
      </main>
    );
  }

  if (error && !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-28 text-slate-950 transition-colors duration-300 dark:bg-[#061018] dark:text-white">
        <section
          role="alert"
          className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50 dark:border-red-500/20 dark:bg-white/[0.04] dark:shadow-none"
        >
          <div
            aria-hidden="true"
            className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-100 text-lg font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400"
          >
            !
          </div>

          <h1 className="mt-5 text-xl font-semibold">
            Intelligence unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() => void refresh()}
            className="mt-6 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200 dark:focus-visible:ring-offset-[#061018]"
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
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 text-slate-950 transition-colors duration-300 dark:bg-[#061018] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <IntelligenceHeader
          generatedAt={data.generatedAt}
          onRefresh={() => void refresh()}
          refreshing={loading}
        />

        <section
          aria-label="Intelligence overview"
          className="grid gap-4 lg:grid-cols-3"
        >
          <OverallRiskCard
            averageRisk={averageRisk}
            critical={
              data.summary.criticalRisk
            }
            high={
              data.summary.highRisk
            }
            moderate={
              data.summary.moderateRisk
            }
            low={
              data.summary.lowRisk
            }
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
        </section>

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

        <section
          aria-label="Detailed intelligence"
          className="grid gap-6 lg:grid-cols-2"
        >
          <RiskHistoryChart
            data={riskHistory}
          />

          <StationIntelligencePanel
            station={station}
          />
        </section>

        <AlertPanel
          station={station}
        />
      </div>
    </main>
  );
}
