import { motion } from "framer-motion";
import { BrainCircuit, Globe2, ShieldCheck, Waves } from "lucide-react";

import { PublicPageHero } from "../components/PublicPageHero";
import { PageContainer } from "../components/PageContainer";

const principles = [
  {
    icon: Waves,
    title: "Understand the environment",
    description:
      "Environmental signals should be transformed into information people can actually use.",
  },
  {
    icon: BrainCircuit,
    title: "Use intelligence responsibly",
    description:
      "Machine learning should support decision-making while remaining transparent about uncertainty.",
  },
  {
    icon: ShieldCheck,
    title: "Design for trust",
    description:
      "Security, reliability, accessibility, and clear communication are foundational—not optional.",
  },
  {
    icon: Globe2,
    title: "Think beyond one location",
    description:
      "The platform is designed around reusable intelligence infrastructure that can scale across regions.",
  },
];

export function AboutPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="About Aqua"
        title="Building a clearer interface between people and environmental risk."
        description="Aqua is a technology concept focused on turning river, weather, sensor, and predictive signals into accessible environmental intelligence."
      />

      <PageContainer>
        <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Our mission
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Earlier information can create better decisions.
            </h2>

            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
              Aqua brings monitoring, predictive modeling, mapping, and
              operational workflows together so that complex environmental
              information can become understandable and actionable.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white dark:border-slate-800">
            <div className="text-6xl" aria-hidden="true">
              🌊
            </div>

            <p className="mt-8 text-lg leading-8 text-slate-300">
              From raw telemetry to risk intelligence, every layer of Aqua is
              designed around one principle: make important information easier
              to see, understand, and act upon.
            </p>
          </div>
        </section>

        <section className="mt-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Principles
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              How we build
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-3xl border border-slate-200 p-7 dark:border-slate-800"
                >
                  <Icon
                    className="text-sky-500"
                    size={26}
                    aria-hidden="true"
                  />

                  <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">
                    {principle.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {principle.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}