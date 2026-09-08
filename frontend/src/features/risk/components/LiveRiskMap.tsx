import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import {
  useEffect,
  useMemo,
} from "react";

import L from "leaflet";

import type { RiskStation } from "../utils/risk.utils";

import {
  getRiskColor,
  getRiskLabel,
} from "../utils/risk.utils";

interface LiveRiskMapProps {
  stations: RiskStation[];
  selectedSensorId: string | null;
  onSelectSensor: (
    sensorId: string,
  ) => void;
}

interface MapFocusProps {
  station: RiskStation | null;
}

function MapFocus({
  station,
}: MapFocusProps) {
  const map = useMap();

  useEffect(() => {
    if (!station) {
      return;
    }

    map.flyTo(
      [station.lat, station.lng],
      9,
      {
        duration: 0.8,
      },
    );
  }, [map, station]);

  return null;
}

function createRiskIcon(
  station: RiskStation,
) {
  const color = getRiskColor(
    station.riskLevel,
  );

  const size =
    station.riskLevel === "critical"
      ? 24
      : station.riskLevel === "high"
        ? 22
        : 19;

  return L.divIcon({
    className: "aqua-risk-marker",

    html: `
      <div
        style="
          width:${size}px;
          height:${size}px;
          border-radius:50%;
          background:${color};
          border:3px solid white;
          box-shadow:
            0 0 0 5px ${color}33,
            0 0 20px ${color}99;
        "
      ></div>
    `,

    iconSize: [
      size,
      size,
    ],

    iconAnchor: [
      size / 2,
      size / 2,
    ],

    popupAnchor: [
      0,
      -(size / 2),
    ],
  });
}

export function LiveRiskMap({
  stations,
  selectedSensorId,
  onSelectSensor,
}: LiveRiskMapProps) {
  const validStations = useMemo(
    () =>
      stations.filter(
        (station) =>
          Number.isFinite(
            station.lat,
          ) &&
          Number.isFinite(
            station.lng,
          ),
      ),
    [stations],
  );

  const selectedStation =
    validStations.find(
      (station) =>
        station.sensorId ===
        selectedSensorId,
    ) ?? null;

  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl border border-[var(--aqua-border)] bg-slate-950 shadow-xl">
      <MapContainer
        center={[
          23.8,
          90.4,
        ]}
        zoom={7}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFocus
          station={selectedStation}
        />

        {validStations.map(
          (station) => (
            <Marker
              key={
                station.sensorId
              }
              position={[
                station.lat,
                station.lng,
              ]}
              icon={createRiskIcon(
                station,
              )}
              eventHandlers={{
                click: () =>
                  onSelectSensor(
                    station.sensorId,
                  ),
              }}
            >
              <Popup>
                <div className="min-w-[190px]">
                  <p className="font-semibold">
                    {station.river}
                  </p>

                  <p className="text-sm">
                    {station.location}
                  </p>

                  <div className="mt-3 space-y-1 text-sm">
                    <p>
                      Risk:{" "}
                      <strong>
                        {
                          station.riskScore
                        }
                      </strong>
                    </p>

                    <p>
                      Level:{" "}
                      <strong>
                        {getRiskLabel(
                          station.riskLevel,
                        )}
                      </strong>
                    </p>

                    <p>
                      Water level:{" "}
                      {
                        station.waterLevel
                      }
                    </p>

                    <p>
                      Rainfall:{" "}
                      {
                        station.rainfall
                      }
                    </p>

                    <p>
                      Flow rate:{" "}
                      {
                        station.flowRate
                      }
                    </p>

                    <p>
                      Battery:{" "}
                      {
                        station.batteryLevel
                      }
                      %
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ),
        )}
      </MapContainer>

      <div className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 text-white shadow-lg backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Live intelligence
        </p>

        <p className="mt-1 text-sm font-semibold">
          {
            validStations.length
          }{" "}
          monitoring stations
        </p>
      </div>
    </div>
  );
}