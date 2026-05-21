import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Braces, Database, Network } from "lucide-react";

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
];

const gallery = [
  {
    src: "/gallery/systems-room.svg",
    alt: "Infra.nyc members gathered around a technical systems discussion",
    className: "aspect-[4/5]",
  },
  {
    src: "/gallery/lightning-talk.svg",
    alt: "Lightning talk stage with infrastructure diagrams",
    className: "aspect-[4/3]",
  },
  {
    src: "/gallery/whiteboard.svg",
    alt: "Whiteboard notes from a distributed systems conversation",
    className: "aspect-[3/4]",
  },
  {
    src: "/gallery/networking.svg",
    alt: "Small group engineering discussion after talks",
    className: "aspect-[5/4]",
  },
  {
    src: "/gallery/terminal-wall.svg",
    alt: "Terminal-style event visuals with systems metrics",
    className: "aspect-[4/5]",
  },
];

const values = [
  {
    icon: Braces,
    title: "Lightning talks",
    body: "Short, technical talks from people building storage layers, inference platforms, schedulers, clouds, and developer infrastructure.",
  },
  {
    icon: Database,
    title: "Systems conversations",
    body: "Room-level conversations about reliability, performance, distributed coordination, database internals, cost curves, and what actually worked.",
  },
  {
    icon: Network,
    title: "Focused network",
    body: "A warm, private room for senior builders to compare notes, find collaborators, and stay close to the frontier without the noise.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link
            href="#top"
            className="font-mono text-sm font-semibold tracking-[0.18em]"
            aria-label="infra.nyc home"
          >
            infra.nyc
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link className="transition-colors hover:text-foreground" href="#community">
              Community
            </Link>
            <Link className="transition-colors hover:text-foreground" href="#events">
              Events
            </Link>
            <Link className="transition-colors hover:text-foreground" href="#apply">
              Apply
            </Link>
          </nav>
          <Button asChild size="sm">
            <Link href="#apply">Apply to join</Link>
          </Button>
        </div>
      </header>

      <section
        id="top"
        className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20"
      >
        <div className="absolute inset-x-5 top-24 -z-10 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent md:inset-x-8" />
        <Reveal className="max-w-6xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            Private infrastructure room
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-foreground md:text-7xl lg:text-8xl">
            A private community of 3,000+ senior systems engineers, engineering
            leaders, and technical founders.
          </h1>
        </Reveal>
        <Reveal
          className="mt-8 grid gap-8 border-t border-border pt-8 md:grid-cols-[1fr_0.72fr]"
          transition={{ delay: 0.08 }}
        >
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
            infra.nyc convenes the people building infrastructure, distributed
            systems, AI infra, databases, cloud platforms, and developer tools.
            The signal is technical, the room is private, and the standard is
            unusually high.
          </p>
          <div className="flex flex-col gap-4 md:items-end">
            <Button asChild size="lg">
              <Link href="#apply">
                Apply to join
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground md:text-right">
              Membership is reviewed. No spectators, no vendor theater, no empty
              panels.
            </p>
          </div>
        </Reveal>
      </section>

      <section
        id="community"
        className="border-y border-border bg-card/45 py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="grid gap-10 md:grid-cols-[0.62fr_1fr] md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Community proof
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
                Builders from the teams shaping modern infrastructure.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
              {companies.map((company) => (
                <div
                  className="flex h-24 items-center justify-center bg-background px-4 text-center font-mono text-sm text-foreground/80 transition-colors hover:bg-secondary"
                  key={company}
                >
                  {company}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="events" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-12 grid gap-6 md:grid-cols-[0.9fr_0.7fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              In the room
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Technical nights with texture, constraint, and edge.
            </h2>
          </div>
          <p className="text-lg leading-8 text-muted-foreground">
            Events are built for people who would rather talk about queueing,
            isolation levels, GPU scheduling, incident lessons, and durable
            company-building than listen to a polished sales story.
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
                  className="object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-foreground text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-px bg-primary-foreground/15 md:grid-cols-3">
          {values.map((item) => (
            <Reveal
              className="bg-foreground px-5 py-10 md:px-8 md:py-14"
              key={item.title}
            >
              <item.icon className="mb-8 h-5 w-5" />
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-primary-foreground/70">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="apply" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1fr] lg:items-start">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Apply
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Join the room where infrastructure gets specific.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Tell us what you build, what problems you keep returning to, and
              where your work sits in the stack. The strongest applications are
              precise.
            </p>
            <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <ArrowDownRight className="h-4 w-4" />
              Reviewed on a rolling basis
            </div>
          </Reveal>
          <Reveal transition={{ delay: 0.08 }}>
            <ApplicationForm />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-mono tracking-[0.16em]">infra.nyc</p>
          <p>Private systems community. New York signal, internet scale.</p>
        </div>
      </footer>
    </main>
  );
}
