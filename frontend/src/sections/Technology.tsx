import { Database, Gauge, Satellite, Sparkles } from "lucide-react";
import { Reveal } from "../components/motion/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const layers = [
  {
    icon: Satellite,
    label: "01",
    title: "Earth observation",
    text: "Satellite-derived environmental context provides spatial awareness beyond individual gauges.",
  },
  {
    icon: Gauge,
    label: "02",
    title: "River telemetry",
    text: "Gauge histories provide high-frequency local signals for water-level and flow dynamics.",
  },
  {
    icon: Sparkles,
    label: "03",
    title: "Predictive intelligence",
    text: "Sequence models learn temporal patterns and produce a transparent risk trajectory.",
  },
  {
    icon: Database,
    label: "04",
    title: "Operational data layer",
    text: "Predictions and observations are cached, queryable and ready for dashboards and alert workflows.",
  },
];

export function Technology() {
  return (
    <section id="technology" className="section-shell py-28">
      <div className="grid gap-16 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Under the surface"
            title="Built like an intelligence system, not a static dashboard."
            description="The interface is only the visible layer. Underneath, Aqua connects heterogeneous environmental signals into a scalable prediction pipeline."
          />
        </Reveal>

        <div className="space-y-4">
          {layers.map((layer, index) => {
            const Icon = layer.icon;

            return (
              <Reveal key={layer.title} delay={index * 0.06}>
                <div className="group flex gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:border-cyan-300/25 hover:bg-white/[0.04] sm:p-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300">
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-slate-600">
                        {layer.label}
                      </span>

                      <h3 className="font-bold text-white">
                        {layer.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {layer.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}