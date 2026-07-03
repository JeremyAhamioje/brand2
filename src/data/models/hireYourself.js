// ============================================================
// MODEL 1 — "HIRE YOURSELF" (Brand 1)
// You find + vet the person, the client hires and pays them
// directly, and pays one flat placement fee, once.
// Every field here is rendered by a shared section component.
// Edit copy freely — the layout stays the same.
// ============================================================

export const hireYourself = {
  id: "hire",
  name: "BRAND 1",

  // Label shown on the homepage toggle.
  toggle: {
    label: "Hire Yourself",
    sub: "One flat fee, once",
  },

  // -- SECTION 1: Hero ---------------------------------------
  hero: {
    eyebrow: "Hire remote. Pay once. Own the relationship.",
    headline:
      "Get a vetted remote professional for a fraction of a local hire — and pay one flat fee, one time.",
    subhead:
      "We source, test, and hand you a qualified bookkeeper, developer, sales rep, or admin. You hire them directly, pay them directly, and manage them as your own. One flat placement fee. No monthly markup on their wage — ever.",
    secondaryCta: { label: "See how it works", href: "#how" },
    trust: [
      "Flat one-time fee",
      "Fluent, skills-tested talent",
      "2-week money-back guarantee",
      "Built by operators who staff their own companies this way",
    ],
  },

  // -- SECTION 2: Problem ------------------------------------
  problem: {
    title:
      "Hiring locally is slow and expensive. Hiring remote is a minefield.",
    costs: [
      { amount: "$55,000+", label: "A US bookkeeper's cost" },
      { amount: "$40,000+", label: "A customer-service rep, before benefits" },
      { amount: "Six figures", label: "for a developer" },
    ],
    prose: [
      "So you either overpay for roles that don't need to be local — or you leave the work undone and stay stuck.",
      "Going remote should fix that. But then you hit a new wall: Where do you find people? How do you know they can actually do the job? What if their English isn't what the profile promised? Sorting through freelance platforms, running interviews, and gambling on a stranger is a project in itself — one you don't have time for.",
      "And most agencies that “solve” this quietly bill you three to five times what the worker actually earns, hidden inside a monthly fee you can't see into.",
    ],
    transition: "We do it differently — and we do it once.",
  },

  // -- SECTION 3: Solution -----------------------------------
  solution: {
    title: "We find your person. You keep everything after that.",
    prose: [
      "BRAND 1 sources candidates from a private network we've built and tested across our own companies. We run the skills tests, the interviews, and the English and communication screening. We hand you a shortlist of people who've already cleared the bar.",
      "You pick who fits. From that point on, they're yours: you hire them directly, you pay them directly, you manage them like any other member of your team. We charge one flat placement fee for the work of finding and vetting them — and that's the last you'll hear from our billing.",
      "No monthly subscription. No cut of their wage. No agency sitting between you and your own employee.",
    ],
    callout: {
      title: "What makes this different",
      body: "Most staffing agencies mark up your worker's wage 3–5x, forever. We don't touch their wage at all. You pay them what they earn, and you pay us once for finding them. That's it.",
    },
  },

  // -- SECTION 4: Roles --------------------------------------
  roles: {
    eyebrow: "Roles we place",
    title: "Where we already have deep bench strength",
    sub: "These are the roles we staff every day inside our own operations — so we know exactly what “great” looks like.",
    items: [
      {
        title: "Accounting & Bookkeeping",
        desc: "Full-cycle bookkeeping, reconciliations, invoicing, AP/AR, and cleanup.",
        bestFor:
          "Accounting firms adding capacity, and any business that needs its books handled without a $55K hire.",
      },
      {
        title: "Development & Automation",
        desc: "Developers and automation specialists who build the workflows, integrations, and tools that eliminate manual work.",
        bestFor:
          "Businesses drowning in repetitive processes that should be automated.",
      },
      {
        title: "Sales & Outreach",
        desc: "Cold-email outreach, lead-pipeline generation, and sales support that keeps your funnel full.",
        bestFor:
          "Real estate management, trades, and services businesses that live or die by pipeline.",
      },
      {
        title: "General Admin & Support",
        desc: "Inbox and calendar management, data entry, customer service, and the day-to-day work that eats your team's hours.",
        bestFor: "Owners and small teams buried in operational busywork.",
      },
    ],
    note: "Don't see your role? If it can be done remotely, we can likely place it. Ask on your call.",
  },

  // -- SECTION 5: How it works (onboarding flow) -------------
  how: {
    eyebrow: "How it works",
    title: "From “I need someone” to “they're hired” in days, not months.",
    steps: [
      {
        title: "Tell us the role",
        body: "On a short call, we learn the role, the skills, and what great looks like for you — the software they need, the English level, the hours, the personality. Your bar becomes our brief.",
      },
      {
        title: "We source and vet",
        body: "We pull from our private network and put candidates through skills testing, structured interviews, and communication screening. You only meet people who've already passed.",
      },
      {
        title: "You interview and choose",
        body: "We send you a shortlist. You interview the finalists and pick the one who fits. No pressure, no filler candidates.",
      },
      {
        title: "You hire them directly",
        body: "They join your team, on your terms, paid by you. You pay us one flat placement fee — and you're done with us on billing.",
      },
      {
        title: "Try them risk-free for two weeks",
        body: "If it's not a fit in the first two weeks, you get your money back. (See the guarantee below.)",
      },
    ],
  },

  // -- SECTION 6: Pricing ------------------------------------
  pricing: {
    eyebrow: "Pricing",
    title: "One flat fee. Paid once. That's the whole cost of working with us.",
    sub: "You pay your professional their wage directly — we never mark it up. Our fee is a single flat placement charge based on the role.",
    unit: "", // one-time fee, no suffix
    rows: [
      { role: "General Admin & Support", fee: "$2,250" },
      { role: "Sales & Outreach", fee: "$2,700" },
      { role: "Accounting & Bookkeeping", fee: "$3,300" },
      { role: "Development & Automation", fee: "$4,800" },
    ],
    note: "Fees are flat per placement.",
    valueFrame:
      "Compare that to a recruiter's typical 20–25% of first-year salary, an agency's permanent 3–5x wage markup, or the cost of a bad hire you sourced yourself. One flat fee, paid once, and the person is yours.",
    cta: "Book a call to scope your role",
  },

  // -- SECTION 7: Guarantee ----------------------------------
  guarantee: {
    title: "Two weeks to be sure. Or your money back.",
    paras: [
      "We're confident in our people because we vet them the same way we vet talent for our own companies. So your placement is protected: if your new hire isn't the right fit within the first two weeks, we'll refund your placement fee in full.",
      "The only condition: a refund means you part ways with the person. The guarantee protects you from a bad fit — it isn't a way to keep the hire for free. Fair to you, fair to us.",
    ],
  },

  // -- SECTION 8: Why us -------------------------------------
  why: {
    eyebrow: "Why BRAND 1",
    title: "We're not a job board. We're operators who hire this way ourselves.",
    pillars: [
      {
        title: "We run our own companies on this model",
        body: "BRAND 1 was built by a team that has hired, tested, and managed remote professionals to build real, profitable businesses. We're not guessing what a great remote hire looks like — we depend on ours every day.",
      },
      {
        title: "A vetted network, not an open marketplace",
        body: "Our candidates come from a private talent network we've developed across our operations — professionals in the Philippines, India, and Nigeria who've already proven themselves on real work. You're hiring from a bench, not fishing in a sea of unknown profiles.",
      },
      {
        title: "We screen for what actually matters",
        body: "Skills tests. Structured interviews. English and communication screening. And we calibrate every search to your definition of great — not a generic one — before a single candidate reaches you.",
      },
    ],
  },

  // -- SECTION 9: FAQ ----------------------------------------
  faq: {
    title: "FAQ",
    items: [
      {
        q: "Where are your professionals based?",
        a: "Our network spans the Philippines, India, and Nigeria — regions with deep, skilled, English-fluent talent pools. We match you based on the role, the hours you need, and your communication requirements.",
      },
      {
        q: "How does payment work?",
        a: "You pay your professional their wage directly — we take no cut of it and never mark it up. You pay us one flat placement fee for finding and vetting them. That's the entire cost.",
      },
      {
        q: "Who manages the person day-to-day?",
        a: "You do. Once you hire them, they work as part of your team, on your systems, reporting to you — exactly like any other team member.",
      },
      {
        q: "How do you vet candidates?",
        a: "Every candidate goes through skills testing, a structured interview, and communication screening. Before we start, we align with you on exactly what the role requires, so you only meet people who clear your bar.",
      },
      {
        q: "How fast can I get someone?",
        a: "Because we source from an existing vetted network instead of starting from scratch, most roles are filled in days — not the weeks or months a traditional hire takes.",
      },
      {
        q: "What if it doesn't work out?",
        a: "Your first two weeks are covered by our money-back guarantee. If it's not a fit, we refund your placement fee — provided you part ways with the person.",
      },
      {
        q: "What stops me from just hiring the person and not paying you?",
        a: "Our placement agreement includes a standard non-circumvention clause: anyone we introduce to you is covered, so the fee is owed if you hire them. In practice, our clients don't want to — the fee is small, one-time, and the vetting we've done is the value.",
      },
      {
        q: "What hours will they work?",
        a: "We match to your required hours, including US-hours coverage where needed. Back-office roles like bookkeeping, admin, and development are flexible; live roles such as customer service and sales calls are staffed to overlap with your working day.",
        draft: true,
      },
      {
        q: "Is my data safe?",
        a: "Every professional signs an NDA before they begin, and for sensitive roles like accounting and customer service we'll align with you on access controls and data-handling practices. We'll cover your specific requirements on the call.",
        draft: true,
      },
    ],
  },

  // -- SECTION 10: Final CTA ---------------------------------
  finalCta: {
    title: "Tell us the role. We'll bring you the person.",
    body: "One call is all it takes to get started. We'll learn what you need, and you'll have vetted candidates in hand within days — for one flat fee, paid once.",
    formTitle: "Or send us the role details and we'll reach out",
    formSub: "Prefer not to book yet? Give us the basics and we'll be in touch.",
  },
};
