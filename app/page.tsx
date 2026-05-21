import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";

import { ApplicationForm } from "@/components/application-form";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const companies = [
  "Datadog",
  "OpenAI",
  "Anthropic",
  "Stripe",
  "Modal",
  "WorkOS",
  "Databricks",
  "Vercel",
  "Ramp",
  "Motherduck",
  "Planetscale",
  "Temporal",
  "Railway",
  "Baseten",
  "Supabase",
  "turbopuffer",
  "Antithesis",
  "Render",
  "Ona",
  "Clickhouse",
  "Materialize",
  "Cloudflare",
  "Daytona",
  "MongoDB",
  "E2B",
];

const gallery = [
  {
    src: "/gallery/IMG_6792.jpeg",
    alt: "Infra.nyc event",
    className: "aspect-[4/3]",
  },
  {
    src: "/gallery/IMG_0504 2.JPG",
    alt: "Infra.nyc event",
    className: "aspect-[4/3]",
  },
  {
    src: "/gallery/IMG_2176.JPG",
    alt: "Infra.nyc event",
    className: "aspect-[4/3]",
  },
];


export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link
            href="#top"
            className="text-lg font-semibold tracking-wide"
            aria-label="infra.nyc home"
          >
            infra.nyc
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">

            <Link className="transition-colors hover:text-foreground" href="#events">
              Events
            </Link>
            <Link className="transition-colors hover:text-foreground" href="#apply">
              Join
            </Link>
          </nav>

        </div>
      </header>

      <section
        id="top"
        className="relative mx-auto flex max-w-7xl flex-col px-5 pb-10 pt-36 md:px-8 md:pb-14"
      >
        <Reveal className="max-w-5xl">
          <h1 className="text-balance text-5xl font-semibold leading-[0.94] tracking-tight text-foreground md:text-7xl lg:text-[7rem]">
            Where systems engineers meet.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Private monthly events for people building the future of software infrastructure.
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="#apply">
                Join
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
        <Reveal transition={{ delay: 0.1 }} className="mt-12">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/50">Members from</p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track">
            {[...companies, ...companies].map((company, i) => (
              <span
                key={i}
                className="mx-6 font-mono text-sm text-muted-foreground/60 whitespace-nowrap"
              >
                {company}
              </span>
            ))}
          </div>
          </div>
        </Reveal>
      </section>

      <section id="events" className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <Reveal className="mb-12 grid gap-6 md:grid-cols-[0.9fr_0.7fr] md:items-end">
          <div>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Discuss real systems problems.
            </h2>
          </div>
          <p className="text-lg leading-8 text-muted-foreground">
            Monthly meet-up with technical talks in NYC.<br />
            Smaller dinners and meet-ups across NYC and SF.
          </p>
        </Reveal>

        <div className="masonry">
          {gallery.map((image, index) => (
            <Reveal
              className="masonry-item mb-4"
              key={image.src}
              transition={{ delay: index * 0.04 }}
            >
              <div
                className={`relative w-full overflow-hidden rounded-lg border border-border bg-muted shadow-soft ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>



      <section id="apply" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1fr] lg:items-start">
          <Reveal>
            <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
              Join infra.nyc.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Weekly updates on upcoming events and what&apos;s happening across the infra.nyc community.
            </p>

            <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <ArrowDownRight className="h-4 w-4" />
              Event attendance is curated
            </div>
          </Reveal>
          <Reveal transition={{ delay: 0.08 }}>
            <ApplicationForm />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <Image
            src="/gallery/infra-nyc-logo.png"
            alt="infra.nyc"
            width={200}
            height={160}
            className="h-20 w-auto max-w-[8rem] object-contain opacity-70"
          />
          <p>Private systems community. New York and San Francisco.</p>
        </div>
      </footer>
    </main>
  );
}
