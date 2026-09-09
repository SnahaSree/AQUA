import { useCallback, useEffect, useState } from "react";

import { getIntelligenceOverview } from "../../../lib/api";

import type {
  IntelligenceOverview,
} from "../types/intelligence.types";

interface UseIntelligenceOverviewResult {
  data: IntelligenceOverview | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useIntelligenceOverview(
  refreshInterval = 30_000,
): UseIntelligenceOverviewResult {
  const [data, setData] =
    useState<IntelligenceOverview | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);

      const result =
        await getIntelligenceOverview();

      setData(result);
    } catch {
      setError(
        "Unable to load intelligence data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();

    const interval = window.setInterval(
      () => {
        void load();
      },
      refreshInterval,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [load, refreshInterval]);

  return {
    data,
    loading,
    error,
    refresh: load,
  };
}