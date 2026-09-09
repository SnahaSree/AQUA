import { useEffect, useState } from "react";

import { getRiverSummary } from "../../../lib/api";

import type {
  RiverSummary,
} from "../types/intelligence.types";

export function useRiverSummary(
  river: string | null,
) {
  const [data, setData] =
    useState<RiverSummary | null>(null);

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
          await getRiverSummary(selectedRiver);

        if (!cancelled) {
          setData(result);
        }
      } catch {
        if (!cancelled) {
          setError(
            "Unable to load river intelligence.",
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
  }, [river]);

  return {
    data,
    loading,
    error,
  };
}