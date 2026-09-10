import { useEffect, useState } from "react";

import { PublicPageHero } from "../components/PublicPageHero";
import { PageContainer } from "../components/PageContainer";
import {
  CaseStudyCard,
  type CaseStudy,
} from "./components/CaseStudyCard";
import { getCaseStudies } from "../../risk/api/riskApi";

export function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getCaseStudies();

        if (mounted) {
          setStudies(data);
        }
      } catch {
        if (mounted) {
          setError("Unable to load case studies right now.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main>
      <PublicPageHero
        eyebrow="Field intelligence"
        title="Real-world problems. Measurable intelligence."
        description="Explore how Aqua's monitoring and predictive infrastructure can turn environmental signals into actionable insight."
      />

      <PageContainer>
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          >
            {error}
          </div>
        )}

        {!loading && !error && studies.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Case studies are coming soon
            </h2>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Our field intelligence library will appear here as projects are published.
            </p>
          </div>
        )}

        {!loading && !error && studies.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {studies.map((study) => (
              <CaseStudyCard key={study._id} study={study} />
            ))}
          </div>
        )}
      </PageContainer>
    </main>
  );
}