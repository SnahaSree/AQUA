import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Satellite, Waves } from "lucide-react";
import { Button } from "../components/ui/Button";
import { StatusBadge } from "../components/ui/StatusBadge";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-20">
      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[20%] h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="absolute right-[5%] top-[25%] h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-cyan-400/[0.06] blur-[100px]" />
      </div>

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />

      {/* Moving river */}
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[45%] w-[120%] opacity-30">
        <motion.svg
          viewBox="0 0 1440 500"
          className="h-full w-full"
          preserveAspectRatio="none"
          animate={{
            x: [-25, 25, -25],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M-100 390 C180 240 320 480 570 320 C820 160 920 420 1180 250 C1320 160 1430 210 1540 130"
            fill="none"
            stroke="rgba(103,232,249,.5)"
            strokeWidth="90"
            strokeLinecap="round"
          />

          <path
            d="M-100 390 C180 240 320 480 570 320 C820 160 920 420 1180 250 C1320 160 1430 210 1540 130"
            fill="none"
            stroke="rgba(34,211,238,.18)"
            strokeWidth="150"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>

      {/* Main content */}
      <div className="section-shell relative z-10 flex min-h-[calc(100vh-5rem)] items-center py-20 lg:py-28">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <StatusBadge variant="safe">
                EARLY WARNING · EARLIER ACTION
              </StatusBadge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.08,
              }}
              className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-8xl"
            >
              See the river.
              <br />
              <span className="text-gradient">
                Before it rises.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.18,
              }}
              className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8"
            >
              Aqua transforms satellite intelligence, river-gauge
              telemetry and predictive modeling into clear,
              actionable flood and riverbank-erosion warnings.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href="#platform">
                Explore the platform
                <ArrowRight size={17} />
              </Button>

              <Button href="#technology" variant="secondary">
                How it works
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-12 flex flex-wrap items-center gap-6 text-sm text-slate-500"
            >
              <span className="flex items-center gap-2">
                <Satellite size={16} className="text-cyan-300" />
                Satellite intelligence
              </span>

              <span className="flex items-center gap-2">
                <Waves size={16} className="text-cyan-300" />
                Live gauge telemetry
              </span>
            </motion.div>
          </div>

          {/* Intelligence card */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.18,
            }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -inset-10 rounded-full bg-cyan-300/10 blur-[90px]" />

            <div className="glass relative overflow-hidden rounded-[2rem] p-3 shadow-glow">
              <div className="rounded-[1.5rem] border border-white/[0.07] bg-[#08151e]/95 p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                      Current intelligence
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-white">
                      Jamuna Basin
                    </h2>
                  </div>

                  <StatusBadge variant="danger">
                    HIGH RISK
                  </StatusBadge>
                </div>

                <div className="mt-9 flex items-end gap-4">
                  <div className="text-7xl font-black tracking-[-0.06em] text-red-300">
                    78
                  </div>

                  <div className="pb-2 text-sm leading-5 text-slate-500">
                    risk score
                    <br />
                    next 12 hours
                  </div>
                </div>

                {/* Chart */}
                <div className="relative mt-7 h-40 overflow-hidden rounded-2xl bg-white/[0.025]">
                  <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/10" />

                  <svg
                    viewBox="0 0 600 180"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="aquaChart"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#67e8f9"
                          stopOpacity=".25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#67e8f9"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 145 C70 130 90 100 150 108 S225 145 290 92 S365 45 420 66 S500 75 600 22 V180 H0Z"
                      fill="url(#aquaChart)"
                    />

                    <path
                      d="M0 145 C70 130 90 100 150 108 S225 145 290 92 S365 45 420 66 S500 75 600 22"
                      fill="none"
                      stroke="#67e8f9"
                      strokeWidth="4"
                    />
                  </svg>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    ["Gauge", "6.84 m"],
                    ["Rain", "62 mm"],
                    ["Trend", "↑ 14%"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl bg-white/[0.035] p-3"
                    >
                      <span className="text-[10px] uppercase tracking-wider text-slate-600">
                        {label}
                      </span>

                      <p className="mt-1 text-sm font-bold text-slate-200">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                  Telemetry stream operational
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a
        href="#platform"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-600 transition hover:text-cyan-300 sm:flex"
      >
        Explore
        <ArrowDown size={15} />
      </a>
    </section>
  );
}