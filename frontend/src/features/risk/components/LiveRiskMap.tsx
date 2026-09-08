import {
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { riverRiskData } from "../data/riskData";
import { RiskMarker } from "./RiskMarker";

interface LiveRiskMapProps {
  onSelectPoint: (pointId: string) => void;
}

export function LiveRiskMap({
  onSelectPoint,
}: LiveRiskMapProps) {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
      <MapContainer
        center={[24.3, 90.5]}
        zoom={7}
        scrollWheelZoom
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        {riverRiskData.map((point) => (
          <RiskMarker
            key={point.id}
            point={point}
            onSelect={() => onSelectPoint(point.id)}
          />
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute left-5 top-5 z-[1000] rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-xl backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Live intelligence
        </p>

        <p className="mt-1 text-sm text-white">
          Bangladesh river network
        </p>
      </div>

      <div className="absolute bottom-5 left-5 z-[1000] rounded-2xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
          Risk level
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
          <Legend color="bg-emerald-500" label="Low" />
          <Legend color="bg-yellow-400" label="Moderate" />
          <Legend color="bg-orange-500" label="High" />
          <Legend color="bg-red-500" label="Critical" />
        </div>
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2.5 w-2.5 rounded-full ${color}`}
      />
      {label}
    </div>
  );
}