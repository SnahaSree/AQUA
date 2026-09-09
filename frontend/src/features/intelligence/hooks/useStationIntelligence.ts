import { useEffect, useState } from "react";

import {
  getStationIntelligence,
} from "../../../lib/api";

import type {
  StationIntelligence,
} from "../types/intelligence.types";

export function useStationIntelligence(
  sensorId: string | null,
) {
  const [data, setData] =
    useState<StationIntelligence | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!sensorId) {
      setData(null);
      return;
    }

    const stationId = sensorId;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result =
          await getStationIntelligence(
            stationId,
          );

        if (!cancelled) {
          setData(result);
        }
      } catch {
        if (!cancelled) {
          setError(
            "Unable to load station intelligence.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [sensorId]);

  return {
    data,
    loading,
    error,
  };
}