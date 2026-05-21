"use client";

import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FieldErrors = Partial<Record<string, string[]>>;

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Ada Lovelace" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "ada@company.com",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Analytical Engines",
  },
  {
    name: "role",
    label: "Role",
    type: "text",
    placeholder: "Principal Infrastructure Engineer",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    type: "url",
    placeholder: "https://linkedin.com/in/...",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "New York",
  },
];

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Please review your application.");
        setErrors(data.errors ?? {});
        return;
      }

      setStatus("success");
      setMessage("Application received. We review new members carefully.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Something interrupted the submission. Please try again.");
    }
  }

  return (
    <form
      className="grid gap-5 rounded-lg border border-border bg-card/80 p-5 shadow-soft backdrop-blur md:p-7"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div className="grid gap-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              aria-invalid={Boolean(errors[field.name])}
              required
            />
            {errors[field.name]?.[0] ? (
              <p className="text-xs text-destructive">{errors[field.name]?.[0]}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="interests">
          What infrastructure/system problems are you interested in?
        </Label>
        <Textarea
          id="interests"
          name="interests"
          placeholder="Scheduling, database internals, observability at scale, GPU orchestration, storage engines..."
          aria-invalid={Boolean(errors.interests)}
          required
        />
        {errors.interests?.[0] ? (
          <p className="text-xs text-destructive">{errors.interests[0]}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Applications are reviewed for relevance, seniority, and signal.
        </p>
        <Button disabled={status === "loading"} type="submit">
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          Apply to join
        </Button>
      </div>

      {message ? (
        <p
          className={
            status === "success"
              ? "text-sm text-foreground"
              : "text-sm text-destructive"
          }
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
