import { useEffect, useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getCaseStudy } from "../../risk/api/riskApi";
import type { CaseStudy } from "./components/CaseStudyCard";
import { PageContainer } from "../components/PageContainer";

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();

  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const caseStudySlug = slug;

    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getCaseStudy(caseStudySlug);

        if (mounted) {
          setStudy(data);
        }
      } catch {
        if (mounted) {
          setError("This case study could not be found.");
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
  }, [slug]);

  if (loading) {
    return (
      <main>
        <PageContainer>
          <div className="h-96 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        </PageContainer>
      </main>
    );
  }

  if (error || !study) {
    return (
      <main>
        <PageContainer>
          <div
            role="alert"
            className="rounded-3xl border border-red-200 bg-red-50 p-10 dark:border-red-900 dark:bg-red-950/30"
          >
            <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">
              Case study unavailable
            </h1>

            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {error ?? "We could not find that case study."}
            </p>

            <Link
              to="/case-studies"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-600 dark:text-sky-400"
            >
              <ArrowLeft size={17} />
              Back to case studies
            </Link>
          </div>
        </PageContainer>
      </main>
    );
  }

  return (
    <main>
      <PageContainer>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400"
        >
          <ArrowLeft size={17} />
          All case studies
        </Link>

        <header className="mt-10 max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <MapPin size={16} />
            {study.location}
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            {study.title}
          </h1>

          <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300">
            {study.summary}
          </p>
        </header>

        {study.imageUrl && (
          <img
            src={study.imageUrl}
            alt=""
            className="mt-12 aspect-[21/9] w-full rounded-3xl object-cover"
          />
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_320px]">
          <article className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                The challenge
              </h2>
              <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                {study.challenge}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                The solution
              </h2>
              <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                {study.solution}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                The impact
              </h2>
              <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                {study.impact}
              </p>
            </section>
          </article>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-950 dark:text-white">
              Key metrics
            </h2>

            <div className="mt-6 space-y-5">
              {study.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {metric.label}
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                    {String(metric.value)}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </PageContainer>
    </main>
  );
}