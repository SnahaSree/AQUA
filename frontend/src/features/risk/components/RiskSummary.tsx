import {
  Activity,
  Radio,
  ShieldAlert,
} from "lucide-react";

interface RiskSummaryProps {
  averageRisk: number;
  stationsOnline: number;
  activeSignals: number;
}

function getRiskLabel(
  score: number,
): string {
  if (score >= 80) {
    return "Critical";
  }

  if (score >= 60) {
    return "High";
  }

  if (score >= 30) {
    return "Moderate";
  }

  return "Low";
}

export function RiskSummary({
  averageRisk,
  stationsOnline,
  activeSignals,
}: RiskSummaryProps) {
  const cards = [
    {
      label: "Average risk",
      value: averageRisk,
      suffix: "/100",
      icon: Activity,
      description: getRiskLabel(
        averageRisk,
      ),
    },
    {
      label: "Stations online",
      value: stationsOnline,
      suffix: "",
      icon: Radio,
      description:
        "Connected monitoring stations",
    },
    {
      label: "Active signals",
      value: activeSignals,
      suffix: "",
      icon: ShieldAlert,
      description:
        "High or critical predictions",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {card.label}
              </p>

              <Icon
                size={18}
                className="text-cyan-500"
                aria-hidden="true"
              />
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-semibold text-slate-950 dark:text-white">
                {card.value}
              </span>

              {card.suffix && (
                <span className="text-sm text-slate-500">
                  {card.suffix}
                </span>
              )}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}