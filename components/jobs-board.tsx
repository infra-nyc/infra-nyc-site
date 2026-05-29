"use client";

import { useRef, useState } from "react";
import { JobCard } from "@/components/job-card";
import { JobsInterestForm } from "@/components/jobs-interest-form";
import { JobsFilter, type FilterState } from "@/components/jobs-filter";

function getLocationTypes(location: string): ("On-site" | "Remote")[] {
  const l = location.toLowerCase();
  const isRemote = l.includes("remote");
  const isOnsite = !l.includes("remote only") && (l.includes("ny") || l.includes("new york") || l.includes("san francisco") || l.includes("sf"));
  if (isRemote && isOnsite) return ["On-site", "Remote"];
  if (isRemote) return ["Remote"];
  return ["On-site"];
}
import { SelectionBar } from "@/components/selection-bar";
import type { Job } from "@/lib/jobs-data";

type Props = {
  jobs: Job[];
};

function unique(values: (string | undefined)[]): string[] {
  return [...new Set(values.filter(Boolean) as string[])].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
}

function uniqueStackTags(jobs: Job[]): string[] {
  const all = jobs.flatMap((j) => j.stack.split(",").map((s) => s.trim()));
  return [...new Set(all)].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
}

function matchesFilters(job: Job, filters: FilterState): boolean {
  if (filters.stage.length > 0 && (!job.stage || !filters.stage.includes(job.stage))) return false;
  if (filters.seniority.length > 0 && !filters.seniority.includes(job.seniority)) return false;
  if (filters.stack.length > 0) {
    const tags = job.stack.split(",").map((s) => s.trim());
    if (!filters.stack.some((s) => tags.includes(s))) return false;
  }
  if (filters.location.length > 0) {
    const locTypes = getLocationTypes(job.location);
    if (!filters.location.some((l) => locTypes.includes(l as "On-site" | "Remote"))) return false;
  }
  return true;
}

export function JobsBoard({ jobs }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    stage: [],
    seniority: [],
    stack: [],
    location: [],
  });
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

  const stages = unique(jobs.map((j) => j.stage));
  const seniorities = unique(jobs.map((j) => j.seniority));
  const stacks = uniqueStackTags(jobs);
  const locations = ["On-site", "Remote"];

  const filtered = jobs.filter((j) => matchesFilters(j, filters));
  const selectedJobs = jobs.filter((j) => selectedIds.has(j.id));

  return (
    <>
      <div className="space-y-8">
        {/* Filters */}
        <JobsFilter
          filters={filters}
          onChange={setFilters}
          stages={stages}
          seniorities={seniorities}
          stacks={stacks}
          locations={locations}
        />

        {/* Cards grid */}
        <section>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">No roles match the selected filters.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  selected={selectedIds.has(job.id)}
                  onToggle={toggleJob}
                />
              ))}
            </div>
          )}
        </section>

        {/* Interest form */}
        <section id="express-interest" ref={formRef} className="pt-8">
          <JobsInterestForm selectedJobs={selectedJobs} />
        </section>
      </div>

      {/* Sticky selection indicator */}
      <SelectionBar count={selectedIds.size} onScrollToForm={scrollToForm} />
    </>
  );
}
