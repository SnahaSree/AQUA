import { CTA } from "../sections/CTA";
import { Hero } from "../sections/Hero";
import { RiskDashboard } from "../features/risk/RiskDashboard";
import { Metrics } from "../sections/Metrics";
import { Platform } from "../sections/Platform";
import { Services } from "../sections/Services";
import { Technology } from "../sections/Technology";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#061018] text-slate-100">
      <Navbar />

      <main>
        <Hero />

        <RiskDashboard />

        <Metrics />

        <Platform />

        <Services />

        <Technology />

        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;