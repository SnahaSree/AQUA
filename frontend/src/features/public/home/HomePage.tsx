import { CTA } from "../../../sections/CTA";
import { Hero } from "../../../sections/Hero";
import { Metrics } from "../../../sections/Metrics";
import { Platform } from "../../../sections/Platform";
import { Services } from "../../../sections/Services";
import { Technology } from "../../../sections/Technology";

import { RiskDashboard } from "../../risk/RiskDashboard";

export function HomePage() {
  return (
    <>
      <Hero />

      <RiskDashboard />

      <Metrics />

      <Platform />

      <Services />

      <Technology />

      <CTA />
    </>
  );
}