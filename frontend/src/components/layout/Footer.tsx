import { Waves } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="about"
      className="border-t border-white/[0.07] bg-[#040b11]"
    >
      <div className="section-shell flex flex-col justify-between gap-6 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300 text-slate-950">
            <Waves size={18} />
          </span>

          <div>
            <p className="text-sm font-black tracking-[0.16em]">
              AQUA
            </p>

            <p className="text-xs text-slate-600">
              Flood & river intelligence
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600">
          © 2026 Aqua. Built for earlier decisions.
        </p>
      </div>
    </footer>
  );
}