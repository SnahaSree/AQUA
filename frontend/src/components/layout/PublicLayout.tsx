import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function PublicLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#061018] text-slate-100">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}