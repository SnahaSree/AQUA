import { motion } from "framer-motion";
import { metrics } from "../lib/constants";
import { Reveal } from "../components/motion/Reveal";

function formatValue(value: number, index: number) {
  if (index === 1) {
    return value.toLocaleString();
  }

  return value;
}

export function Metrics() {
  return (
    <section className="border-y border-white/[0.07] bg-white/[0.015]">
      <div className="section-shell grid divide-y divide-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} className="py-8 sm:px-8 lg:py-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                {formatValue(metric.value, index)}
                <span className="text-cyan-300">
                  {metric.suffix}
                </span>
              </motion.div>

              <p className="mt-2 text-sm text-slate-500">
                {metric.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}