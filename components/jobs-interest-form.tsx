"use client";

import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Job } from "@/lib/jobs-data";

type Props = {
  selectedJobs: Job[];
};

type FieldErrors = Partial<Record<string, string[]>>;

export function JobsInterestForm({ selectedJobs }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const hasSelection = selectedJobs.length > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!hasSelection) return;

    setStatus("loading");
    setMessage("");
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = {
      linkedin: formData.get("linkedin") as string,
      email: formData.get("email") as string,
      note: formData.get("note") as string,
      selectedRoles: selectedJobs.map((j) => ({
        company: j.company,
        role: j.role,
        id: j.id,
      })),
    };

    try {
      const res = await fetch("/api/jobs-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: { ok: boolean; message?: string; errors?: FieldErrors } = { ok: res.ok };
      try {
        data = await res.json();
      } catch {
        // non-JSON
      }

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again or message megan@infra.community.");
        setErrors(data.errors ?? {});
        return;
      }

      setStatus("success");
      setMessage("Thanks — I'll take a look and follow up if there's a fit.");
    } catch {
      setStatus("error");
      setMessage("Something interrupted the submission. Please try again or message megan@infra.community.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card/80 p-6 md:p-8">
        <div className="flex items-center gap-2 text-foreground">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Sent.</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card/80 p-5 shadow-soft md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Interested in one or more roles?
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Share your background and if there&apos;s a strong fit, I&apos;ll follow up and make an intro directly to the founders or hiring manager. You can also apply directly, I&apos;ve added links for each role.
        </p>
      </div>

      {/* Selected roles summary */}
      <div className="mb-6 rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
        {hasSelection ? (
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
              Selected roles ({selectedJobs.length})
            </p>
            <ul className="space-y-1">
              {selectedJobs.map((j) => (
                <li key={j.id} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-1 w-1 rounded-full bg-foreground/40" />
                  {j.company} — {j.role}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select at least one role above to continue.
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/..."
            required
            disabled={!hasSelection || status === "loading"}
            aria-invalid={Boolean(errors.linkedin)}
          />
          {errors.linkedin?.[0] && (
            <p className="text-xs text-destructive">{errors.linkedin[0]}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            disabled={!hasSelection || status === "loading"}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email?.[0] && (
            <p className="text-xs text-destructive">{errors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <Label htmlFor="note">Background &amp; context</Label>
        <Textarea
          id="note"
          name="note"
          placeholder="Briefly share your background, relevant engineering experience, or why this role or company caught your attention."
          required
          minLength={20}
          disabled={!hasSelection || status === "loading"}
          aria-invalid={Boolean(errors.note)}
          className="min-h-28 resize-none"
        />
        {errors.note?.[0] && (
          <p className="text-xs text-destructive">{errors.note[0]}</p>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={!hasSelection || status === "loading"}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          Send interest
        </Button>

        {!hasSelection && (
          <p className="text-xs text-muted-foreground">
            Select at least one role above
          </p>
        )}
      </div>

      {message && status === "error" && (
        <p className="mt-3 text-sm text-destructive">{message}</p>
      )}
    </form>
  );
}
