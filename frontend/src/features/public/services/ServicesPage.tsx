import { motion } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  Map,
  Satellite,
  ShieldCheck,
  Waves,
} from "lucide-react";

import { PublicPageHero } from "../components/PublicPageHero";
import { PageContainer } from "../components/PageContainer";

const services = [
  {
    icon: Waves,
    title: "Flood Risk Intelligence",
    description:
      "Continuous river and environmental monitoring transformed into understandable risk intelligence.",
  },
  {
    icon: Activity,
    title: "Real-Time Sensor Monitoring",
    description:
      "Track water level, rainfall, flow rate, temperature, battery health, and station status from one platform.",
  },
  {
    icon: BrainCircuit,
    title: "Predictive AI",
    description:
      "Machine-learning models analyze historical and current observations to estimate emerging flood risk.",
  },
  {
    icon: Satellite,
    title: "Environmental Intelligence",
    description:
      "Combine ground observations with future satellite and geospatial intelligence workflows.",
  },
  {
    icon: Map,
    title: "Interactive Risk Mapping",
    description:
      "Transform complex environmental data into visual maps that make risk easier to understand.",
  },
  {
    icon: ShieldCheck,
    title: "Early-Warning Infrastructure",
    description:
      "Build the technical foundation for reliable alerts, monitoring workflows, and operational response.",
  },
];

export function ServicesPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="Aqua platform"
        title="Environmental intelligence built for earlier decisions."
        description="Aqua combines sensor telemetry, predictive intelligence, geospatial visualization, and alert workflows into one flood and riverbank-risk platform."
      />

      <PageContainer>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                  <Icon size={24} aria-hidden="true" />
                </div>

                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                  {service.title}
                </h2>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </PageContainer>
    </main>
  );
}