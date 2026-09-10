import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  location: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  metrics: Array<{
    label: string;
    value: string | number;
  }>;
  tags: string[];
  imageUrl?: string | null;
}

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {study.imageUrl ? (
        <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={study.imageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-sky-500/20 via-cyan-500/10 to-emerald-500/20">
          <span className="text-5xl" aria-hidden="true">
            🌊
          </span>
        </div>
      )}

      <div className="p-7">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={15} aria-hidden="true" />
          {study.location}
        </div>

        <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">
          {study.title}
        </h2>

        <p className="mt-3 line-clamp-3 leading-7 text-slate-600 dark:text-slate-300">
          {study.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/case-studies/${study.slug}`}
          className="mt-7 inline-flex items-center gap-2 font-semibold text-sky-600 transition hover:gap-3 dark:text-sky-400"
        >
          Explore case study
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}