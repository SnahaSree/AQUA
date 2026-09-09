import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import type {
  RiverOverview,
} from "../types/intelligence.types";

interface IntelligenceMapProps {
  rivers: RiverOverview[];
}

const riverCoordinates: Record<
  string,
  [number, number]
> = {
  Jamuna: [25.2, 89.7],
  Padma: [23.95, 89.75],
  Meghna: [24.05, 90.98],
  Teesta: [25.75, 89.42],
};

export function IntelligenceMap({
  rivers,
}: IntelligenceMapProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="border-b border-slate-200/70 p-6 dark:border-white/10">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Geographic intelligence
        </p>

        <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
          Bangladesh river network
        </h2>
      </div>

      <div className="h-[520px]">
        <MapContainer
          center={[23.8, 90.4]}
          zoom={6}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {rivers.map((river) => {
            const position =
              riverCoordinates[river.river];

            if (!position) {
              return null;
            }

            return (
              <CircleMarker
                key={river.river}
                center={position}
                radius={10}
                pathOptions={{
                  color: "currentColor",
                  fillOpacity: 0.7,
                }}
              >
                <Popup>
                  <strong>
                    {river.river}
                  </strong>

                  <br />

                  Risk:{" "}
                  {river.riskScore.toFixed(0)}

                  <br />

                  Level:{" "}
                  {river.riskLevel}
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </section>
  );
}