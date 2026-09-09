import { useEffect, useState } from "react";

import { getRiskHistory } from "../../../lib/api";

import type {
  RiverRiskHistory,
} from "../types/intelligence.types";

export function useRiskHistory(
  river: string | null,
  hours = 24,
) {
  const [data, setData] =
    useState<RiverRiskHistory | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!river) {
      setData(null);
      return;
    }

    const selectedRiver = river;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result =
          await getRiskHistory(
            selectedRiver,
            hours,
          );

        if (!cancelled) {
          setData(result);
        }
      } catch {
        if (!cancelled) {
          setError(
            "Unable to load risk history.",
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
  }, [river, hours]);

  return {
    data,
    loading,
    error,
  };
}