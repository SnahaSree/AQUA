import {
  BellRing,
  Map,
  RadioTower,
  Waves,
} from "lucide-react";
import { Reveal } from "../components/motion/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const services = [
  {
    icon: Waves,
    title: "Flood intelligence",
    text: "Continuous monitoring and short-horizon forecasts for river systems vulnerable to rapid level changes.",
  },
  {
    icon: Map,
    title: "Erosion monitoring",
    text: "Track changing riverbanks and prioritize areas where morphology signals indicate elevated exposure.",
  },
  {
    icon: RadioTower,
    title: "Sensor networks",
    text: "Integrate gauge and environmental telemetry into a single operational data pipeline.",
  },
  {
    icon: BellRing,
    title: "Early-warning workflows",
    text: "Turn risk signals into understandable alerts for response teams and community-facing operations.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="border-y border-white/[0.07] bg-[#08151e]"
    >
      <div className="section-shell py-28">
        <Reveal>
          <SectionHeading
            eyebrow="What we build"
            title="Intelligence for the moments when water changes everything."
            description="Aqua's services are designed around the full warning lifecycle — from sensing the environment to helping people respond."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={index * 0.07}>
                <article className="group flex h-full gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.05] text-cyan-300 transition group-hover:bg-cyan-300/10">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                      {service.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}