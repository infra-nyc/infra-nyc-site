export type Job = {
  id: string;
  company: string;
  companyUrl: string;
  careersUrl: string;
  description: string;
  role: string;
  location: string;
  compensation: string;
  seniority: string;
  stage?: string;
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
    companyUrl: "https://modal.com",
    careersUrl: "https://modal.com/careers",
    description:
      "Serverless infrastructure for AI and GPU workloads so engineers can run inference, training, and batch jobs without managing cloud infrastructure.",
    role: "Member of Technical Staff - Systems",
    location: "New York, NY",
    compensation: "$200k–$350k + equity",
    seniority: "Senior / Staff",
    stage: "Series C",
    stack: "Linux, File Systems, Containers, Rust",
    whyInteresting:
      "Greenfield infra work on a platform that's genuinely rethinking how compute is provisioned. Small team, high ownership, real systems problems. Quietly building one of the best engineering teams in NYC.",
    roleUrl: "https://jobs.ashbyhq.com/modal/9b33ebe7-e829-4f03-97ba-5c94dbd7daf6",
    investmentCase: [
      "One of the few infra companies with strong product-market fit in the AI wave",
      "Grew 5x in the last 6 months to $300M ARR, raised at a $3.5B valuation",
      "Tiny team relative to revenue — high leverage for early engineers",
      "Founders have deep technical credibility and have built at scale before",
    ],
  },
  {
    id: "turbopuffer-eng",
    company: "turbopuffer",
    companyUrl: "https://turbopuffer.com",
    careersUrl: "https://turbopuffer.com/jobs",
    description:
      "Fast, cost-efficient vector database built for scale. Designed from scratch for low-latency nearest-neighbor search on large datasets.",
    role: "Database Engineer",
    location: "New York, NY",
    compensation: "",
    seniority: "Senior / Staff",
    stage: "Series Seed",
    stack: "Linux, eBPF, Rust, Go, SIMD",
    whyInteresting:
      "Work on a deeply technical search and storage engine built from first principles alongside a tiny, elite team. Turbopuffer is scaling fast, but the company will likely stay lean, so this is one of the few chances to join early and have outsized impact.",
    roleUrl: "https://turbopuffer.com/jobs?ashby_jid=317f14bf-49dc-46ae-a4d8-6aea3fa41ecc",
    investmentCase: [
      "Vector search is becoming table stakes for AI applications — turbopuffer is the performance-first option",
      "Went from $1M to ~$100M ARR in 19 months",
      "Extremely lean team with outsized technical ambition",
      "Strong early traction with AI-native companies",
    ],
  },
  {
    id: "general-intuition-eng",
    company: "General Intuition",
    companyUrl: "https://generalintuition.com",
    careersUrl: "https://jobs.ashbyhq.com/medal",
    description:
      "Frontier research lab building foundation models for spatial and temporal reasoning, trained on billions of action-labeled gameplay clips from Medal — the world's largest gamer moments platform.",
    role: "Infra Engineer - API",
    location: "New York, NY",
    compensation: "$250k–$400k + equity",
    seniority: "Senior / Staff",
    stage: "Series Seed",
    stack: "GPUs, Kubernetes, Distributed Systems, Rust",
    whyInteresting:
      "Unique data moat: billions of action-labeled video clips from real human gameplay, at a scale no synthetic dataset can replicate. The infra challenge of ingesting, labeling, and training on that corpus is genuinely hard.",
    roleUrl: "https://jobs.ashbyhq.com/medal/cad1a16e-dc06-47c4-b154-a73787e9277f",
    investmentCase: [
      "$133.7M seed — one of the largest seed rounds in AI, signaling serious conviction from top-tier investors",
      "One of the only NYC-headquartered AI labs — cutting edge research led here in the city",
      "Medal's existing platform gives them a proprietary data flywheel that compounds over time",
      "Spatial and temporal reasoning is a meaningful gap in current foundation models",
    ],
  },
  {
    id: "gitai-eng",
    company: "Git AI",
    companyUrl: "https://usegitai.com",
    careersUrl: "https://usegitai.com/careers",
    description:
      "Open standard and tooling for AI code attribution in Git. Tracks which lines were written by which agent, model, and prompt — surviving rebases, merges, and squashes.",
    role: "Founding Engineer",
    location: "New York, NY",
    compensation: "$190k–$220k + equity",
    seniority: "Mid / Senior",
    stage: "Pre-Seed",
    stack: "Dev Infra, Rust, Observability, Git Internals",
    whyInteresting:
      "Git AI is building the observability layer for the AI software factory, helping engineering teams understand, measure, and improve how coding agents operate in production. Opportunity to join two exited founders with strong product-market fit as a founding engineer.",
    roleUrl: "https://usegitai.com/jobs/founding-engineer",
    investmentCase: [
      "Every engineering org will eventually need observability and governance for coding agents",
      "Open standard approach creates ecosystem leverage and easier adoption across existing developer workflows",
      "Strong early pull from F100 engineering teams and fast-growing Series B/C startups",
      "Tiny company with strong early product-market fit; opportunity to join two exited founders on the ground floor as the category forms",
    ],
  },
  {
    id: "daytona-eng",
    company: "Daytona",
    companyUrl: "https://www.daytona.io",
    careersUrl: "https://www.daytona.io/careers",
    description:
      "Secure, elastic infrastructure for running AI-generated code. Sub-90ms sandbox creation, stateful execution, and isolated environments for agents, evals, and code interpreters.",
    role: "Senior System Engineer",
    location: "New York, NY / Remote",
    compensation: "",
    seniority: "Senior",
    stage: "Series A",
    stack: "Distributed Systems, Observability, Containers",
    whyInteresting:
      "The execution layer for the agentic software stack is still being built. Daytona is solving the hard parts — fast cold starts, isolation guarantees, stateful sandboxes — at a moment when demand is accelerating sharply.",
    roleUrl: "https://daytonaio.notion.site/Senior-System-Engineer-25729a8a0d018003b6d4e503c41eec3e?pvs=74",
    investmentCase: [
      "72k+ GitHub stars and growing adoption from LangChain, CoreWeave, and Sentry",
      "Agentic code execution is a new infrastructure primitive — Daytona is early in a large category",
      "Customer-managed compute model is a strong enterprise differentiator",
    ],
  },
  {
    id: "railway-eng",
    company: "Railway",
    companyUrl: "https://railway.com",
    careersUrl: "https://railway.com/careers",
    description:
      "Developer platform rebuilding the cloud computing stack. 2M+ users, weekly shipping cadence, fully remote team focused on making infrastructure invisible to developers.",
    role: "Senior Infra Engineer: Platform",
    location: "Remote",
    compensation: "",
    seniority: "Senior",
    stage: "Series B",
    stack: "Go, Distributed Systems, Linux, Postgres, Networking",
    whyInteresting:
      "Small team with massive reach — 2M+ users and weekly releases. The engineering culture is direct, fast, and serious about craft. Real infrastructure problems at real scale without the overhead of a large org.",
    roleUrl: "https://railway.com/careers/infra-platform",
    investmentCase: [
      "Strong product-led growth and genuine developer love",
      "Large and expanding market for developer-first cloud infrastructure",
      "Product quality and developer experience appear strongly differentiated",
      "Lean, high-talent-density team with outsized individual leverage",
    ],
  },
  {
    id: "qualitate-eng",
    company: "Qualitate",
    companyUrl: "https://qualitate.io",
    careersUrl: "https://jobs.ashbyhq.com/qualitate",
    description:
      "AI platform delivering structured expert insights for investment firms and enterprises. Primary intelligence — the kind that moves before public data does.",
    role: "Staff Software Engineer",
    location: "New York, NY",
    compensation: "$220k–$280k + bonus + equity",
    seniority: "Staff",
    stage: "Series Seed",
    stack: "TypeScript, React, SQL, APIs, Voice AI",
    whyInteresting:
      "Voice AI is making it possible to automate and parallelize primary research at a scale traditional expert networks never could. Hard problems across AI, data infrastructure, and real-time knowledge synthesis.",
    roleUrl: "https://jobs.ashbyhq.com/qualitate/e147d797-86ee-4454-8d1d-6e77ca3b4189",
    investmentCase: [
      "Massive market historically dominated by expensive human analyst networks",
      "Proprietary data moat compounds with every expert interaction",
      "AI dramatically improves throughput and margins versus incumbents",
      "Revenue scaling quickly with a tiny NYC-based team",
      "Taking share from legacy expert network platforms in a category where buyers pay heavily for information edge",
    ],
  },
  {
    id: "blacksmith-eng",
    company: "Blacksmith",
    companyUrl: "https://www.blacksmith.sh",
    careersUrl: "https://jobs.ashbyhq.com/Blacksmith",
    description:
      "High-performance infrastructure for CI and AI coding agents, running tens of millions of Firecracker VMs on its own global bare-metal fleet.",
    role: "Principal Systems Engineer",
    location: "New York, NY",
    compensation: "$280k–$380k + equity",
    seniority: "Principal",
    stage: "Series B",
    stack: "Firecracker, Linux, Ceph, eBPF",
    whyInteresting:
      "Rare chance to work on deep infrastructure problems at real scale: bare metal orchestration, Firecracker VMs, distributed scheduling, and petabyte-scale storage systems. The company is now extending that infrastructure into agent sandboxes and AI coding systems.",
    roleUrl: "https://jobs.ashbyhq.com/Blacksmith/7f13567d-a9ab-4231-b439-99b84584257f",
    investmentCase: [
      "Strong technical differentiation through owning and operating a global bare-metal fleet rather than renting generic cloud infrastructure",
      "Proven execution: >$10M ARR in under 2 years serving 2,000+ companies",
      "Natural expansion from CI infrastructure into AI agent infrastructure and coding agents",
      "Deep systems pedigree across the founding team with strong GTM leadership",
      "Intentionally small, elite team tackling massive-scale infrastructure problems",
    ],
  },
  {
    id: "antimetal-eng",
    company: "Antimetal",
    companyUrl: "https://antimetal.com",
    careersUrl: "https://jobs.ashbyhq.com/antimetal",
    description:
      "Autonomous production engineering platform. Builds a live world model of your stack and deploys specialized agents to diagnose, fix, and prevent production issues — without waiting for a human to page in.",
    role: "Platform Engineer",
    location: "New York, NY",
    compensation: "Senior $200k–$250k · Staff $250k–$300k + equity",
    seniority: "Senior / Staff",
    stage: "Series A",
    stack: "Kubernetes, Distributed Systems, TypeScript",
    whyInteresting:
      "Production operations is one of the last high-leverage surfaces AI hasn't fully touched. Antimetal is building the autonomous layer between engineering teams and running systems — a world model that persists, learns, and acts.",
    roleUrl: "https://jobs.ashbyhq.com/antimetal/f7619c4a-8e35-4b70-875b-0586a93c9a54",
    investmentCase: [
      "Production complexity is growing faster than human operators can manage it",
      "Technically differentiated world-model approach versus traditional observability tooling",
      "Opportunity to apply frontier AI research directly to real-world infrastructure operations",
      "Small, high-talent-density team tackling a massive systems and organizational problem",
    ],
  },
  {
    id: "empathic-eng",
    company: "Empathic",
    companyUrl: "https://empathic.dev",
    careersUrl: "https://empathic.dev/careers/",
    description:
      "Infrastructure for human-AI collaboration in software engineering. Building the control plane for agentic development — making AI code auditable, collaborative, and trustworthy at the team level.",
    role: "Founding Engineer",
    location: "New York, NY",
    compensation: "$170k–$250k + equity",
    seniority: "Mid / Senior",
    stage: "Pre-Seed",
    stack: "Rust, Linux, Multi-cloud, Sandboxing",
    whyInteresting:
      "Empathic is building the trust and coordination layer for AI coding agents: sandboxing, collaboration, and control as engineering teams adopt increasingly autonomous systems. Rare opportunity to join a deeply technical team as a founding engineer and help shape the company from the ground up.",
    roleUrl: "https://empathic.dev/careers/",
    investmentCase: [
      "AI-generated code is scaling faster than existing engineering workflows can handle",
      "Technically differentiated sandboxing and control-plane approach",
      "Opportunity to become foundational infrastructure for agentic software engineering",
      "Tiny, deeply technical team attacking an inevitable problem category",
    ],
  },
];
