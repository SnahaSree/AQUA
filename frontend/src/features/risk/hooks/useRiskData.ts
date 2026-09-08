import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getLatestPredictions,
  getSensors,
} from "../api/riskApi";

import type {
  RiskPrediction,
  SensorReading,
} from "../types/risk.types";

interface UseRiskDataResult {
  sensors: SensorReading[];
  predictions: RiskPrediction[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

const REFRESH_INTERVAL = 60_000;

export function useRiskData(): UseRiskDataResult {
  const [sensors, setSensors] = useState<
    SensorReading[]
  >([]);

  const [predictions, setPredictions] =
    useState<RiskPrediction[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);

  const loadData = useCallback(
    async (isInitialLoad: boolean) => {
      try {
        if (isInitialLoad) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        setError(null);

        const [
          sensorsResponse,
          predictionsResponse,
        ] = await Promise.all([
          getSensors({
            page: 1,
            limit: 100,
          }),

          getLatestPredictions(),
        ]);

        setSensors(sensorsResponse.data);
        setPredictions(
          predictionsResponse.data,
        );

        setLastUpdated(new Date());
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load intelligence data.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadData(true);

    const interval = window.setInterval(() => {
      void loadData(false);
    }, REFRESH_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [loadData]);

  const refresh = useCallback(async () => {
    await loadData(false);
  }, [loadData]);

  return {
    sensors,
    predictions,
    loading,
    refreshing,
    error,
    lastUpdated,
    refresh,
  };
}