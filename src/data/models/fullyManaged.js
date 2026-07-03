// ============================================================
// MODEL 2 — "FULLY MANAGED" (Brand 2)
// A premium managed staffing model: we recruit, vet, onboard,
// pay, and manage a dedicated remote professional for one flat
// monthly price. Payroll, HR, performance, and cover are ours.
// Same section schema as hireYourself.js — the toggle swaps
// this whole object into every section on the homepage.
// ============================================================

export const fullyManaged = {
  id: "managed",
  name: "BRAND 2",

  // Label shown on the homepage toggle.
  toggle: {
    label: "Fully Managed",
    sub: "Flat monthly, all-in",
  },

  // -- SECTION 1: Hero ---------------------------------------
  hero: {
    eyebrow: "Fully managed remote staffing",
    headline:
      "A dedicated remote professional, fully managed — for one flat monthly price.",
    subhead:
      "We recruit, vet, onboard, pay, and manage a dedicated team member who works only for you. Payroll, HR, and performance are handled. You direct the work; we run everything behind it.",
    secondaryCta: { label: "See pricing", href: "#pricing" },
    trust: [
      "Flat monthly pricing",
      "Payroll included",
      "Fully managed",
      "Replacement guarantee",
    ],
  },

  // -- Metrics band (count-up on scroll) ---------------------
  stats: [
    { value: 40, suffix: "+", label: "Countries in our talent network" },
    { value: 3000, suffix: "+", label: "Vetted professionals on the bench" },
    { value: 48, suffix: "h", label: "Average time to a shortlist" },
    { value: 98, suffix: "%", label: "12-month placement retention" },
  ],

  // -- Industries marquee ------------------------------------
  logos: {
    label: "We work closely with teams across every industry",
    items: [
      "Contractors",
      "Real Estate",
      "Accounting Firms",
      "E-commerce",
      "Agencies",
      "SaaS",
      "Property Management",
      "Trades",
      "Professional Services",
      "Healthcare",
      "Logistics",
      "Legal",
    ],
  },

  // -- Platform showcase (alternating rows w/ image slots) ---
  platform: {
    eyebrow: "The platform",
    title: "One system for your entire global team.",
    sub: "Everything that usually lives in five tools and three inboxes — recruiting, payroll, HR, and performance — runs in one managed layer.",
    rows: [
      {
        id: "payroll",
        title: "Payroll & compliance, handled",
        body: "We employ and pay your professionals, manage taxes and compliance across regions, and take the administrative weight off your plate entirely.",
        imageLabel: "Payroll & compliance",
        bullets: ["Multi-region payroll", "Contracts & NDAs", "Compliance managed"],
      },
      {
        id: "dashboard",
        title: "One dashboard for your whole team",
        body: "See every dedicated professional, their hours, output, and status in a single view. No spreadsheets, no guessing.",
        imageLabel: "Team dashboard",
        bullets: ["Live team status", "Hours & output", "Weekly reports"],
      },
    ],
  },

  // -- SECTION 2: Problem ------------------------------------
  problem: {
    title:
      "A local hire is expensive. DIY remote hiring is risky. There's a better third option.",
    costs: [
      { amount: "$65,000+", label: "Fully-loaded cost of a US hire" },
      { amount: "Weeks lost", label: "Sourcing, vetting & onboarding yourself" },
      { amount: "You carry it", label: "Payroll, HR & compliance risk" },
    ],
    prose: [
      "Hire locally and you pay a premium for roles that never needed to be in the room — salary, benefits, taxes, software, and management, all on you.",
      "Try to go remote on your own and you inherit a second job: sourcing strangers, running interviews, gambling on English and skills, then handling contracts, payroll, and time zones once someone starts.",
      "And most agencies that “manage” this for you quietly mark up the worker's wage three to five times, forever, buried inside a fee you can't see into.",
    ],
    transition:
      "We're the managed option in the middle — the upside of remote, without the operational load.",
  },

  // -- SECTION 3: Solution -----------------------------------
  solution: {
    title: "You get a teammate. We run everything behind them.",
    prose: [
      "We recruit from a private, vetted talent network, then onboard your dedicated professional onto your tools and your schedule. From day one, they work only for you — full-time, integrated into your team.",
      "Behind them, we handle payroll, HR, compliance, and ongoing performance management. One flat monthly price covers all of it — no wage markups you can't see, no surprise fees.",
    ],
    // When `features` is present, the Solution section renders these as
    // cards instead of the plain callout-only layout.
    features: [
      {
        title: "One Flat Rate",
        body: "A single predictable monthly price per role. No setup fees, no hidden wage markups.",
      },
      {
        title: "Payroll Included",
        body: "We pay your professional and handle taxes and compliance. Zero payroll admin for you.",
      },
      {
        title: "Fully Managed",
        body: "A dedicated success manager, performance tracking, and day-to-day HR — all handled.",
      },
      {
        title: "Replacement Guarantee",
        body: "If a hire isn't the right fit, we replace them quickly — at no additional cost.",
      },
      {
        title: "Dedicated Professional",
        body: "Full-time and works only for you, embedded in your team and your tools.",
      },
    ],
    callout: {
      title: "What “fully managed” actually means",
      body: "You direct the work. We manage the person — payroll, HR, performance, and cover. If they're ever out or not the right fit, that's our problem to solve, not yours.",
    },
  },

  // -- SECTION 4: Roles --------------------------------------
  roles: {
    eyebrow: "Roles we manage",
    title: "Dedicated professionals across the roles you need most",
    sub: "Each role is filled by a full-time professional who works only for you — recruited, onboarded, and managed by us.",
    items: [
      {
        title: "Accounting & Finance",
        desc: "Full-cycle bookkeeping, reconciliations, invoicing, and AP/AR — run by a dedicated finance professional on your systems.",
        bestFor:
          "Firms and owners who want their books handled reliably, without a $65K in-house hire.",
      },
      {
        title: "Sales & Outreach",
        desc: "Outbound outreach, pipeline generation, and sales support from a dedicated rep managed to clear targets.",
        bestFor:
          "Real estate, trades, and services businesses that live or die by pipeline.",
      },
      {
        title: "Customer Support",
        desc: "Inbox, chat, and ticket coverage from a dedicated support professional staffed to your working hours.",
        bestFor: "Growing teams that need dependable, always-on customer coverage.",
      },
    ],
    note: "Need a different role? If it can be done remotely, we can likely staff and manage it. Ask on your call.",
  },

  // -- SECTION 5: How it works (onboarding flow) -------------
  how: {
    eyebrow: "How it works",
    title: "From discovery call to a fully managed teammate in days.",
    steps: [
      {
        short: "Discovery",
        title: "Book a discovery call",
        body: "In 15 minutes we learn the role, your tools, the hours you need, and what great looks like for you. Your bar becomes our brief.",
      },
      {
        short: "Recruit",
        title: "We recruit and vet",
        body: "We source from our private network and run skills testing, structured interviews, and communication screening. You only meet finalists who've already passed.",
      },
      {
        short: "Approve",
        title: "You approve your hire",
        body: "Interview the shortlist and choose the person who fits. We handle the contract, equipment, and paperwork — you don't touch any of it.",
      },
      {
        short: "Onboard",
        title: "We onboard, pay and manage",
        body: "Payroll, HR, and compliance are ours. Your dedicated professional starts integrated into your workflow, managed by a success manager from day one.",
      },
      {
        short: "Manage",
        title: "Ongoing performance and cover",
        body: "We track performance, handle time off and cover, and the replacement guarantee has you protected the entire time.",
      },
    ],
  },

  // -- SECTION 6: Pricing ------------------------------------
  pricing: {
    eyebrow: "Pricing",
    title: "One flat monthly price. Payroll, management, and cover included.",
    sub: "No setup fees. No hidden wage markups. One predictable rate per role, all-in.",
    unit: "/mo", // recurring monthly price
    rows: [
      { role: "Customer Support", fee: "$2,900" },
      { role: "Sales & Outreach", fee: "$3,400" },
      { role: "Accounting & Bookkeeping", fee: "$3,900", featured: true },
      { role: "Development & Automation", fee: "$5,400" },
    ],
    note: "Flat monthly, all-in — includes payroll, HR, management, and the replacement guarantee.",
    savings:
      "Save 40–60% vs. a comparable US hire — with payroll and management handled for you.",
    valueFrame:
      "A comparable US hire runs $5,000–$9,000+ per month fully loaded — before payroll admin, benefits, software, and management overhead. You get the same output, fully managed, for one predictable flat rate.",
    cta: "Book a call to scope your role",
  },

  // -- SECTION 7: Guarantee ----------------------------------
  guarantee: {
    title: "Covered two ways: replacement and refund.",
    paras: [
      "Fit guarantee: if your dedicated professional isn't the right fit, we'll replace them — fast — at no extra cost, as many times as it takes to get it right.",
      "30-day refund: if you're not satisfied in your first 30 days, we'll refund your first month in full. You're never locked into a hire that isn't working.",
    ],
  },

  // -- SECTION 8: Why us -------------------------------------
  why: {
    eyebrow: "Why BRAND 2",
    title: "Operators who run this exact model — not a marketplace.",
    pillars: [
      {
        title: "Built by operators",
        body: "We run our own companies on this exact model. We're not guessing what a great remote hire looks like — we depend on ours every day.",
      },
      {
        title: "Transparent, flat pricing",
        body: "One monthly price, all-in. No wage markups you can't see, no surprise fees, and no long lock-ins — just a predictable rate per role.",
      },
      {
        title: "A fully managed team",
        body: "Payroll, HR, performance, and cover are ours. You get the output of a great hire without carrying the operational load.",
      },
    ],
  },

  // -- SECTION 9: FAQ ----------------------------------------
  faq: {
    title: "FAQ",
    items: [
      {
        q: "What's included in the monthly price?",
        a: "Everything: recruiting and vetting, the professional's wage, payroll and compliance, HR, ongoing management, and the replacement guarantee. One flat rate, no add-ons.",
      },
      {
        q: "Is the professional dedicated to us?",
        a: "Yes. Your professional is full-time and works only for you — embedded in your team, your tools, and your workflow. They're not shared across clients.",
      },
      {
        q: "Who handles payroll, taxes, and compliance?",
        a: "We do, entirely. We employ and pay the professional, handle taxes and compliance, and take on the administrative burden so you never touch payroll.",
      },
      {
        q: "What if the hire isn't a good fit?",
        a: "Our replacement guarantee covers you: if someone isn't working out, we replace them quickly at no additional cost. In your first 30 days, you can also take a full refund of your first month.",
      },
      {
        q: "How fast can we get started?",
        a: "Because we source from an existing vetted network, most roles are filled in days — not the weeks or months a traditional hire takes.",
      },
      {
        q: "Where are your professionals based?",
        a: "Our network spans the Philippines, India, and Nigeria — deep, skilled, English-fluent talent pools. We match you based on the role, the hours you need, and your communication requirements.",
      },
      {
        q: "Can we scale the team up or down?",
        a: "Yes. Add roles as you grow, and adjust under your agreement's terms. The flat monthly price makes scaling predictable.",
        draft: true,
      },
      {
        q: "Is there a long-term contract?",
        a: "We keep terms simple and flexible rather than locking you into long commitments. We'll walk you through the exact terms on your call.",
        draft: true,
      },
      {
        q: "Is our data safe?",
        a: "Every professional signs an NDA before they begin, and for sensitive roles like accounting and support we align with you on access controls and data-handling practices up front.",
        draft: true,
      },
    ],
  },

  // -- SECTION 10: Final CTA ---------------------------------
  finalCta: {
    title: "Ready for a dedicated teammate, fully managed?",
    body: "Book a 15-minute call. We'll learn your needs and match you with a vetted professional — payroll, management, and replacement cover all included.",
    formTitle: "Or tell us about your needs and we'll reach out",
    formSub: "Prefer not to book yet? Give us the basics and we'll be in touch.",
  },
};
