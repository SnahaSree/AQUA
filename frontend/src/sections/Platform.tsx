import {
  Activity,
  BrainCircuit,
  Satellite,
  ShieldAlert,
} from "lucide-react";
import { Reveal } from "../components/motion/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const capabilities = [
  {
    icon: Satellite,
    title: "Observe",
    description:
      "Combine river-gauge telemetry, rainfall and satellite-derived observations into one environmental signal layer.",
  },
  {
    icon: BrainCircuit,
    title: "Predict",
    description:
      "Time-series models estimate how river conditions may evolve and convert complex signals into interpretable risk bands.",
  },
  {
    icon: Activity,
    title: "Understand",
    description:
      "Interactive intelligence surfaces show where conditions are changing, why they matter and what is likely next.",
  },
  {
    icon: ShieldAlert,
    title: "Act",
    description:
      "Translate model output into timely alerts and operational workflows for communities, infrastructure and response teams.",
  },
];

export function Platform() {
  return (
    <section id="platform" className="section-shell py-28">
      <Reveal>
        <SectionHeading
          eyebrow="The Aqua platform"
          title="One signal layer from raw water data to a decision."
          description="Aqua connects observation, prediction and action without forcing teams to interpret disconnected dashboards."
        />
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="group h-full rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/25 hover:bg-white/[0.045]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-300/15">
                  <Icon size={22} />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                  0{index + 1}
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}