import { ArrowRight } from "lucide-react";
import { Reveal } from "../components/motion/Reveal";

export function CTA() {
  return (
    <section id="contact" className="section-shell pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-cyan-300 p-8 text-slate-950 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em]">
              Start with a river
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Make your next warning earlier.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-800/70">
              Tell us the river, region or operational challenge you
              want to understand. Aqua can turn that problem into a
              monitoring and early-warning concept.
            </p>

            <a
              href="mailto:hello@aqua.example"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-300"
            >
              Talk to Aqua
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}