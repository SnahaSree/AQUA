import { CircleMarker, Tooltip } from "react-leaflet";
import type { RiverRiskPoint } from "../data/riskData";

interface RiskMarkerProps {
  point: RiverRiskPoint;
  onSelect: (point: RiverRiskPoint) => void;
}

const riskColors = {
  low: "#22c55e",
  moderate: "#eab308",
  high: "#f97316",
  critical: "#ef4444",
};

export function RiskMarker({
  point,
  onSelect,
}: RiskMarkerProps) {
  const color = riskColors[point.riskLevel];

  return (
    <CircleMarker
      center={[point.lat, point.lng]}
      radius={9}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: 0.8,
        weight: 2,
        className: `risk-marker risk-marker-${point.riskLevel}`,
      }}
      eventHandlers={{
        click: () => onSelect(point),
      }}
    >
      <Tooltip direction="top" offset={[0, -8]}>
        <div className="min-w-[150px]">
          <p className="font-semibold">
            {point.river} — {point.location}
          </p>

          <p className="text-sm">
            Risk score: {point.riskScore}/100
          </p>

          <p className="text-sm capitalize">
            Status: {point.riskLevel}
          </p>
        </div>
      </Tooltip>
    </CircleMarker>
  );
}