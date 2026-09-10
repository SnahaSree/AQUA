import { motion } from "framer-motion";

interface PublicPageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PublicPageHero({
  eyebrow,
  title,
  description,
}: PublicPageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-slate-50 py-24 dark:border-slate-800 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.14),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(34,197,94,0.10),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
            {eyebrow}
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}