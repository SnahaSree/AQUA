import {
  useEffect,
  useState,
} from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getSensorReadings } from "../api/riskApi";
import type { SensorReading } from "../types/risk.types";

interface TelemetryChartProps {
  sensorId: string | null;
}

interface ChartPoint {
  time: string;
  waterLevel: number;
  rainfall: number;
}

export function TelemetryChart({
  sensorId,
}: TelemetryChartProps) {
  const [readings, setReadings] =
    useState<SensorReading[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!sensorId) {
      setReadings([]);
      return;
    }

    const controller =
      new AbortController();

    async function loadReadings() {
      try {
        setLoading(true);
        setError(null);

            const currentSensorId = sensorId;

    if (!currentSensorId) {
      return;
    }


        const response =
          await getSensorReadings(
            currentSensorId,
            {
              page: 1,
              limit: 20,
            },
            controller.signal,
          );

        setReadings(
          [...response.data].reverse(),
        );
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
            : "Unable to load telemetry.",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadReadings();

    return () => {
      controller.abort();
    };
  }, [sensorId]);

  const data: ChartPoint[] =
    readings.map((reading) => ({
      time: new Date(
        reading.recordedAt,
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      waterLevel: reading.waterLevel,
      rainfall: reading.rainfall,
    }));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
          Telemetry
        </p>

        <h3 className="mt-2 font-semibold text-slate-950 dark:text-white">
          Water & rainfall trend
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {sensorId ?? "Select a monitoring station"}
        </p>
      </div>

      <div className="h-[350px]">
        {!sensorId ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Select a station to view telemetry.
          </div>
        ) : loading ? (
          <div className="flex h-full items-center justify-center">
            <div
              className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-500"
              aria-label="Loading telemetry"
            />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-center text-sm text-red-500">
            {error}
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No telemetry readings available.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={data}
              margin={{
                top: 8,
                right: 8,
                left: -20,
                bottom: 8,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                tick={{
                  fontSize: 10,
                }}
              />

              <YAxis
                tick={{
                  fontSize: 10,
                }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="waterLevel"
                name="Water level"
                stroke="currentColor"
                className="text-cyan-500"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="rainfall"
                name="Rainfall"
                stroke="currentColor"
                className="text-indigo-500"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}