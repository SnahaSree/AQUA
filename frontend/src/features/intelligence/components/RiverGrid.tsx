import type {
  RiverOverview,
} from "../types/intelligence.types";

import {
  RiverIntelligenceCard,
} from "./RiverIntelligenceCard";

interface RiverGridProps {
  rivers: RiverOverview[];
  selectedRiver: string | null;
  onSelectRiver: (river: string) => void;
}

export function RiverGrid({
  rivers,
  selectedRiver,
  onSelectRiver,
}: RiverGridProps) {
  return (
    <section>
      <div className="mb-5">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Monitored rivers
        </p>

        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          River intelligence
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {rivers.map((river) => (
          <RiverIntelligenceCard
            key={river.river}
            river={river}
            selected={
              selectedRiver === river.river
            }
            onSelect={() =>
              onSelectRiver(river.river)
            }
          />
        ))}
      </div>
    </section>
  );
}