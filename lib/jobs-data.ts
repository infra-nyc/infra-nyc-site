export type Job = {
  id: string;
  company: string;
  description: string;
  role: string;
  location: string;
  compensation: string;
  seniority: string;
  stack: string;
  whyInteresting: string;
  roleUrl: string;
  investmentCase: string[];
};

// Edit this array to update the jobs board.
export const jobs: Job[] = [
  {
    id: "modal-infra-eng",
    company: "Modal",
    description:
      "Cloud platform for running GPU workloads and serverless functions at scale. Built by engineers from Stripe, Dropbox, and Jane Street.",
    role: "Infrastructure Engineer",
    location: "New York, NY",
    compensation: "$200k–$280k + equity",
    seniority: "Senior / Staff",
    stack: "Python, Rust, Kubernetes, Linux, eBPF",
    whyInteresting:
      "Greenfield infra work on a platform that's genuinely rethinking how compute is provisioned. Small team, high ownership, real systems problems.",
    roleUrl: "https://jobs.ashbyhq.com/modal/9b33ebe7-e829-4f03-97ba-5c94dbd7daf6",
    investmentCase: [
      "One of the few infra companies with strong product-market fit in the AI wave",
      "Tiny team relative to revenue — high leverage for early engineers",
      "Founders have deep technical credibility and have built at scale before",
    ],
  },
  {
    id: "turbopuffer-eng",
    company: "turbopuffer",
    description:
      "Fast, cost-efficient vector database built for scale. Designed from scratch for low-latency nearest-neighbor search on large datasets.",
    role: "Database / Systems Engineer",
    location: "Remote (US)",
    compensation: "$220k–$300k + equity",
    seniority: "Senior / Staff",
    stack: "Rust, S3, SIMD, custom storage engine",
    whyInteresting:
      "Rare chance to work on a purpose-built storage engine. The team is doing serious systems work — custom SIMD kernels, novel index structures, tight latency budgets.",
    roleUrl: "https://turbopuffer.com/jobs?ashby_jid=317f14bf-49dc-46ae-a4d8-6aea3fa41ecc",
    investmentCase: [
      "Vector search is becoming table stakes for AI applications — turbopuffer is the performance-first option",
      "Extremely lean team with outsized technical ambition",
      "Strong early traction with AI-native companies",
    ],
  },
  {
    id: "general-intuition-eng",
    company: "General Intuition",
    description:
      "Frontier research lab building foundation models for spatial and temporal reasoning, trained on billions of action-labeled gameplay clips from Medal — the world's largest gamer moments platform.",
    role: "ML Infrastructure Engineer",
    location: "New York, NY",
    compensation: "Competitive + equity",
    seniority: "Senior / Staff",
    stack: "Python, CUDA, distributed training, video pipelines",
    whyInteresting:
      "Unique data moat: billions of action-labeled video clips from real human gameplay, at a scale no synthetic dataset can replicate. The infra challenge of ingesting, labeling, and training on that corpus is genuinely hard.",
    roleUrl: "https://jobs.ashbyhq.com/medal/cad1a16e-dc06-47c4-b154-a73787e9277f",
    investmentCase: [
      "$133.7M seed — one of the largest seed rounds in AI, signaling serious conviction from top-tier investors",
      "Medal's existing platform gives them a proprietary data flywheel that compounds over time",
      "Spatial and temporal reasoning is a meaningful gap in current foundation models",
    ],
  },
  {
    id: "daytona-eng",
    company: "Daytona",
    description:
      "Secure, elastic infrastructure for running AI-generated code. Sub-90ms sandbox creation, stateful execution, and isolated environments for agents, evals, and code interpreters.",
    role: "Infrastructure Engineer",
    location: "Remote",
    compensation: "Competitive + equity",
    seniority: "Senior",
    stack: "Go, Rust, Linux, containers, hypervisors",
    whyInteresting:
      "The execution layer for the agentic software stack is still being built. Daytona is solving the hard parts — fast cold starts, isolation guarantees, stateful sandboxes — at a moment when demand is accelerating sharply.",
    roleUrl: "https://daytonaio.notion.site/Senior-System-Engineer-25729a8a0d018003b6d4e503c41eec3e?pvs=74",
    investmentCase: [
      "72k+ GitHub stars and growing adoption from LangChain, SambaNova, and Sentry",
      "Agentic code execution is a new infrastructure primitive — Daytona is early in a large category",
      "Customer-managed compute model is a strong enterprise differentiator",
    ],
  },
  {
    id: "gitai-eng",
    company: "Git AI",
    description:
      "Open standard and tooling for AI code attribution in Git. Tracks which lines were written by which agent, model, and prompt — surviving rebases, merges, and squashes.",
    role: "Founding Engineer",
    location: "Remote",
    compensation: "Competitive + equity",
    seniority: "Mid / Senior",
    stack: "Rust, Git internals, SQLite, CLI tooling",
    whyInteresting:
      "As AI-generated code becomes the norm, attribution and auditability become infrastructure problems. Git AI is building the plumbing layer — local-first, no workflow changes, open standard.",
    roleUrl: "https://usegitai.com/jobs/founding-engineer",
    investmentCase: [
      "Every engineering team shipping AI-assisted code will eventually need this — the category is inevitable",
      "Open standard approach creates ecosystem leverage rather than lock-in",
      "Rust-native, Git-native implementation is technically credible and hard to replicate quickly",
    ],
  },
  {
    id: "railway-eng",
    company: "Railway",
    description:
      "Developer platform rebuilding the cloud computing stack. 2M+ users, weekly shipping cadence, fully remote team focused on making infrastructure invisible to developers.",
    role: "Infrastructure Engineer",
    location: "Remote",
    compensation: "Competitive + equity",
    seniority: "Senior",
    stack: "Rust, Go, Kubernetes, Linux, networking",
    whyInteresting:
      "Small team with massive reach — 2M+ users and weekly releases. The engineering culture is direct, fast, and serious about craft. Real infrastructure problems at real scale without the overhead of a large org.",
    roleUrl: "https://railway.com/careers/infra-platform",
    investmentCase: [
      "Strong product-led growth with a loyal developer community",
      "Competing in a large market (Heroku, Render, Fly) with a technically superior product",
      "Lean team means high individual leverage and equity upside",
    ],
  },
  {
    id: "qualitate-eng",
    company: "Qualitate",
    description:
      "AI platform delivering structured expert insights for investment firms and enterprises. Primary intelligence — the kind that moves before public data does.",
    role: "Backend / Infrastructure Engineer",
    location: "New York, NY",
    compensation: "Competitive + equity",
    seniority: "Senior",
    stack: "Python, LLMs, data pipelines, cloud infra",
    whyInteresting:
      "Applying AI to primary research is a genuinely hard problem — unstructured expert knowledge, low-latency delivery, and high accuracy requirements. The infra underneath has to be reliable and fast.",
    roleUrl: "https://jobs.ashbyhq.com/qualitate/e147d797-86ee-4454-8d1d-6e77ca3b4189",
    investmentCase: [
      "Primary intelligence is a high-value, defensible niche — enterprise buyers pay for information edges",
      "AI-native approach to a market historically dominated by expensive human analyst networks",
      "NYC-based, well-positioned in the finance and enterprise intelligence ecosystem",
    ],
  },
  {
    id: "blacksmith-eng",
    company: "Blacksmith",
    description:
      "Drop-in replacement for GitHub Actions runners. 2x faster on bare-metal gaming CPUs, 40x faster Docker builds via persistent NVMe layer caching, with full CI observability.",
    role: "Infrastructure Engineer",
    location: "Remote",
    compensation: "Competitive + equity",
    seniority: "Senior",
    stack: "Go, Linux, bare metal, virtualization, NVMe",
    whyInteresting:
      "CI infrastructure is unsexy but critical — and Blacksmith is winning on raw performance. The technical approach (bare-metal gaming CPUs, co-located caching) is clever and the results are measurable.",
    roleUrl: "https://jobs.ashbyhq.com/Blacksmith/7f13567d-a9ab-4231-b439-99b84584257f",
    investmentCase: [
      "GitHub Actions is the dominant CI platform — a faster, cheaper drop-in replacement has a clear adoption path",
      "Performance claims are verifiable and compelling: 2x speed, 40x Docker cache improvement",
      "Observability layer creates stickiness beyond raw compute",
    ],
  },
  {
    id: "antimetal-eng",
    company: "Antimetal",
    description:
      "Autonomous production engineering platform. Builds a live world model of your stack and deploys specialized agents to diagnose, fix, and prevent production issues — without waiting for a human to page in.",
    role: "Software Engineer",
    location: "New York, NY",
    compensation: "Competitive + equity",
    seniority: "Senior",
    stack: "Python, Go, LLMs, observability integrations, cloud infra",
    whyInteresting:
      "Production operations is one of the last high-leverage surfaces AI hasn't fully touched. Antimetal is building the autonomous layer between engineering teams and running systems — a world model that persists, learns, and acts. The problem is genuinely hard and the surface area is enormous.",
    roleUrl: "https://jobs.ashbyhq.com/antimetal/f7619c4a-8e35-4b70-875b-0586a93c9a54",
    investmentCase: [
      "Production complexity has outpaced human operational capacity — the category is inevitable",
      "World model approach is technically differentiated from point-solution observability tools",
      "Built in NYC, SOC 2 / GDPR / HIPAA compliant — enterprise-ready from day one",
    ],
  },
  {
    id: "empathic-eng",
    company: "Empathic",
    description:
      "Infrastructure for human-AI collaboration in software engineering. Building the control plane for agentic development — making AI code auditable, collaborative, and trustworthy at the team level.",
    role: "Founding Engineer",
    location: "Remote",
    compensation: "Competitive + equity",
    seniority: "Mid / Senior",
    stack: "TypeScript, Rust, Git, agent runtimes",
    whyInteresting:
      "The gap between what agents can do and what humans can control is widening fast. Empathic is building the layer that makes agentic development legible and safe for engineering teams — a problem that gets harder as models get more capable.",
    roleUrl: "https://empathic.dev/careers/",
    investmentCase: [
      "The 'AI governance for code' category is early but inevitable as agentic PRs become the norm",
      "Framing around human-AI collaboration rather than detection is technically honest and more defensible",
      "Strong product thesis: teams need structure, not just speed",
    ],
  },
];
