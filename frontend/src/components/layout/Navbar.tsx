import { Menu, Waves, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "../../lib/constants";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../features/theme/ThemeProvider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#061018]/75 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <a
          href="#"
          className="group flex items-center gap-3"
          aria-label="Aqua home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 text-slate-950 transition-transform duration-300 group-hover:rotate-6">
            <Waves size={21} />
          </span>

          <span className="text-lg font-black tracking-[0.16em]">
            AQUA
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white focus:outline-none focus-visible:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Request a briefing
          </a>
        </div>

          <button
  type="button"
  onClick={toggleTheme}
  aria-label={`Switch to ${
    theme === "dark" ? "light" : "dark"
  } theme`}
  className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
>
  {theme === "dark" ? (
    <Sun size={18} />
  ) : (
    <Moon size={18} />
  )}
</button>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl p-2 text-slate-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/[0.07] bg-[#061018] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-cyan-300 px-4 py-3 text-center text-sm font-bold text-slate-950"
            >
              Request a briefing
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}