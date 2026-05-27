"use client";

import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FALLBACK_FORM_URL = "https://forms.gle/T79KScxRMrv3Y9Kp7";

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
];

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [showFallback, setShowFallback] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setShowFallback(false);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      event_cities: formData.getAll("event_cities"),
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: { ok: boolean; message?: string; errors?: FieldErrors; fallback?: boolean } = { ok: response.ok };
      try {
        data = await response.json();
      } catch {
        // non-JSON response
      }

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Please review your application.");
        setErrors(data.errors ?? {});
        setShowFallback(data.fallback ?? false);
        return;
      }

      setStatus("success");
      setMessage("You're on the list.");
      formRef.current?.reset();
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setMessage("Something interrupted the submission. Please try again.");
      setShowFallback(true);
    }
  }

  return (
    <form
      ref={formRef}
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
        <div className="grid gap-2">
          <Label>Interested in events in</Label>
          <div className="flex items-center gap-6 h-10">
            {["NYC", "SF"].map((city) => (
              <label key={city} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="event_cities"
                  value={city}
                  className="h-4 w-4 rounded border-border accent-foreground"
                />
                {city}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">

        <Button disabled={status === "loading"} type="submit">
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          Sign me up
        </Button>
      </div>

      {message ? (
        <div role="status" className="grid gap-1">
          <p
            className={
              status === "success"
                ? "text-sm text-foreground"
                : "text-sm text-destructive"
            }
          >
            {message}
          </p>
          {showFallback ? (
            <p className="text-sm text-muted-foreground">
              You can also apply via{" "}
              <a
                href={FALLBACK_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                this form
              </a>
              .
            </p>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
