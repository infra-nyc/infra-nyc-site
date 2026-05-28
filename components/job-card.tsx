"use client";

import { ArrowUpRight, MapPin, DollarSign, Layers } from "lucide-react";
import type { Job } from "@/lib/jobs-data";

type JobCardProps = {
  job: Job;
  selected: boolean;
  onToggle: (id: string) => void;
};

export function JobCard({ job, selected, onToggle }: JobCardProps) {
  return (
    <article
      className={`group relative flex flex-col rounded-xl border bg-card/80 transition-all duration-200 hover:shadow-soft ${
        selected
          ? "border-foreground/40 shadow-soft"
          : "border-border hover:border-border/80"
      }`}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-4 p-5 pb-4 md:p-6 md:pb-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-foreground">{job.company}</span>
            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:block" />
            <span className="hidden font-mono text-xs text-muted-foreground/60 sm:block">
              {job.seniority}
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {job.description}
          </p>
        </div>

        {/* Interest checkbox */}
        <label
          className="mt-0.5 flex cursor-pointer items-center gap-2 text-sm"
          title={selected ? "Remove from selection" : "Mark as interested"}
        >
          <span className="sr-only">I&apos;m interested</span>
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
              selected
                ? "border-foreground bg-foreground text-primary-foreground"
                : "border-border bg-card hover:border-foreground/50"
            }`}
            onClick={() => onToggle(job.id)}
          >
            {selected && (
              <svg
                className="h-3 w-3"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="2,6 5,9 10,3" />
              </svg>
            )}
          </div>
        </label>
      </div>

      {/* Role info */}
      <div className="border-t border-border/60 px-5 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-sm font-medium text-foreground">{job.role}</span>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            {job.location}
          </span>
          {job.compensation && (
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <DollarSign className="h-3 w-3 shrink-0" />
              {job.compensation}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-start gap-1">
          <Layers className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/60" />
          <span className="font-mono text-xs text-muted-foreground/70">
            {job.stack}
          </span>
        </div>
      </div>

      {/* Why interesting */}
      <div className="px-5 py-3 md:px-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground/80">Why it&apos;s interesting — </span>
          {job.whyInteresting}
        </p>
      </div>

      {/* Investment case */}
      <div className="mx-5 mb-5 mt-1 rounded-lg border border-border/50 bg-muted/40 px-4 py-3 md:mx-6 md:mb-6">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
          Investment case
        </p>
        <ul className="space-y-1.5">
          {job.investmentCase.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-border/60 px-5 py-3 md:px-6">
        <button
          type="button"
          onClick={() => onToggle(job.id)}
          className={`text-xs font-medium transition-colors ${
            selected
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {selected ? "✓ Interested" : "I'm interested"}
        </button>
        <a
          href={job.roleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          View role
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}
