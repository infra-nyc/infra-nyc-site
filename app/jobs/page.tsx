import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { jobs } from "@/lib/jobs-data";
import { JobsBoard } from "@/components/jobs-board";

export const metadata: Metadata = {
  title: "infra.nyc jobs",
  description:
    "A curated list of high-signal infrastructure and AI systems companies hiring senior technical talent.",
  alternates: {
    canonical: "https://infra.nyc/jobs",
  },
};

export default function JobsPage() {
  return (
    <main className="min-h-screen">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-wide"
            aria-label="infra.nyc home"
          >
            infra.nyc
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link className="transition-colors hover:text-foreground" href="/#events">
              Events
            </Link>
            <Link className="transition-colors hover:text-foreground" href="/#apply">
              Join
            </Link>
            <Link className="text-foreground" href="/jobs">
              Jobs
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          infra.nyc
        </Link>

        {/* Page header */}
        <div className="mb-14">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            infra.nyc jobs
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Handpicked roles at some of the most technically ambitious infrastructure and AI systems companies in the world. Built in NYC.
          </p>
          <p className="mt-2 text-sm text-muted-foreground/70">
            Select roles below and scroll to the bottom to express interest.
          </p>

        </div>

        {/* Jobs board — client component handles selection state */}
        <JobsBoard jobs={jobs} />
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            Hiring for a serious infrastructure role?{" "}
            <a
              href="mailto:megan@infra.community"
              className="text-foreground underline underline-offset-2 transition-colors hover:text-foreground/70"
            >
              Get in touch: megan@infra.community
            </a>
          </p>
          <Link
            href="/"
            className="font-mono text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            infra.nyc
          </Link>
        </div>
      </footer>
    </main>
  );
}
