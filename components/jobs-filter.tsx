"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

export type FilterState = {
  stage: string[];
  seniority: string[];
  stack: string[];
  location: string[];
};

type Props = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  stages: string[];
  seniorities: string[];
  stacks: string[];
  locations: string[];
};

export function JobsFilter({ filters, onChange, stages, seniorities, stacks, locations }: Props) {
  const hasActive =
    filters.stage.length > 0 ||
    filters.seniority.length > 0 ||
    filters.stack.length > 0 ||
    filters.location.length > 0;

  function toggle(key: keyof FilterState, value: string) {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  }

  function clear() {
    onChange({ stage: [], seniority: [], stack: [], location: [] });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <MultiSelect
        placeholder="Stage"
        selected={filters.stage}
        options={stages}
        onToggle={(v) => toggle("stage", v)}
      />
      <MultiSelect
        placeholder="Seniority"
        selected={filters.seniority}
        options={seniorities}
        onToggle={(v) => toggle("seniority", v)}
      />
      <MultiSelect
        placeholder="Stack"
        selected={filters.stack}
        options={stacks}
        onToggle={(v) => toggle("stack", v)}
      />
      <MultiSelect
        placeholder="Location"
        selected={filters.location}
        options={locations}
        onToggle={(v) => toggle("location", v)}
      />
      {hasActive && (
        <button
          onClick={clear}
          className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      )}
    </div>
  );
}

function MultiSelect({
  placeholder,
  selected,
  options,
  onToggle,
}: {
  placeholder: string;
  selected: string[];
  options: string[];
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const label =
    selected.length === 0
      ? placeholder
      : selected.length === 1
      ? selected[0]
      : `${placeholder} (${selected.length})`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
          selected.length > 0
            ? "border-foreground/40 bg-card text-foreground"
            : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
        }`}
      >
        {label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 min-w-[160px] rounded-lg border border-border bg-card shadow-soft">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => onToggle(option)}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left font-mono text-xs transition-colors hover:bg-muted/60"
                >
                  <span
                    className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors ${
                      selected.includes(option)
                        ? "border-foreground bg-foreground text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {selected.includes(option) && (
                      <svg
                        viewBox="0 0 8 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-2 w-2"
                      >
                        <polyline points="1,4 3,6 7,2" />
                      </svg>
                    )}
                  </span>
                  <span className={selected.includes(option) ? "text-foreground" : "text-muted-foreground"}>
                    {option}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
