"use client";

import { useRef, useState } from "react";
import { JobCard } from "@/components/job-card";
import { JobsInterestForm } from "@/components/jobs-interest-form";
import { SelectionBar } from "@/components/selection-bar";
import type { Job } from "@/lib/jobs-data";

type Props = {
  jobs: Job[];
};

export function JobsBoard({ jobs }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLElement>(null);

  function toggleJob(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const selectedJobs = jobs.filter((j) => selectedIds.has(j.id));

  return (
    <>
      <div className="space-y-16">
        {/* Cards grid */}
        <section>
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                selected={selectedIds.has(job.id)}
                onToggle={toggleJob}
              />
            ))}
          </div>
        </section>

        {/* Interest form */}
        <section id="express-interest" ref={formRef}>
          <JobsInterestForm selectedJobs={selectedJobs} />
        </section>
      </div>

      {/* Sticky selection indicator */}
      <SelectionBar count={selectedIds.size} onScrollToForm={scrollToForm} />
    </>
  );
}
