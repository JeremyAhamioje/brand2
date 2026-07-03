import { useModel } from "../context/ModelContext.jsx";
import Reveal from "./Reveal.jsx";
import ManagedNav from "./ManagedNav.jsx";
import { Footer } from "./Conversion.jsx";
import SceneBackground from "./SceneBackground.jsx";
import StickyBook from "./StickyBook.jsx";
import { BookLink } from "./booking.jsx";
import { ArrowRight, CheckIcon, ShieldIcon } from "../components/icons.jsx";
import plfPayroll from "./assets/platform/payroll.webp";
import plfDashboard from "./assets/platform/dashboard.webp";
import feat1 from "./assets/features/feat1.webp";
import feat2 from "./assets/features/feat2.webp";
import feat3 from "./assets/features/feat3.webp";
import feat4 from "./assets/features/feat4.webp";
import feat5 from "./assets/features/feat5.webp";
import feat6 from "./assets/features/feat6.webp";

// "Everything we handle" — a dedicated deep-dive on the managed
// infrastructure, structured like Deel's solution/engine pages.
// Homepage images are reused as placeholders (they don't need to
// match each pillar literally).

const CAPABILITIES = [
  {
    image: feat1,
    title: "Recruiting & vetting",
    body: "We source from a private, vetted network and screen for skills, communication, and fit — so you only ever meet finalists.",
  },
  {
    image: feat3,
    title: "Payroll & taxes",
    body: "We employ and pay your professional and run taxes across every region. You never touch a payslip or a filing.",
  },
  {
    image: feat5,
    title: "HR & compliance",
    body: "Contracts, NDAs, and local compliance handled in-house across 40+ countries, kept current as rules change.",
  },
  {
    image: feat2,
    title: "Onboarding",
    body: "From signed offer to first paycheck we run equipment, access, and a structured week-one plan onto your tools.",
  },
  {
    image: feat6,
    title: "Performance management",
    body: "A dedicated success manager, structured reviews, and weekly reporting keep every hire on track and visible.",
  },
  {
    image: feat4,
    title: "Cover & replacement",
    body: "Time off, sickness, and the replacement guarantee are ours to solve — your output never has to stop.",
  },
];

const STRIP = [
  { value: "40+", label: "Countries covered" },
  { value: "100%", label: "Payroll & compliance handled" },
  { value: "1", label: "Success manager per team" },
  { value: "0", label: "Admin left on your plate" },
];

// Deep-dive rows reuse the homepage platform screenshots.
const DEEP = [
  {
    id: "payroll",
    image: plfPayroll,
    title: "Payroll & compliance, handled",
    body: "We become the employer of record behind your professional — running multi-region payroll, taxes, contracts, and local compliance so the administrative weight never lands on you.",
    bullets: ["Multi-region payroll & taxes", "Employment contracts & NDAs", "Compliance kept current"],
  },
  {
    id: "dashboard",
    image: plfDashboard,
    title: "One dashboard for your whole team",
    body: "Every dedicated professional, their hours, output, and status live in a single view — with weekly reporting from your success manager, so nothing happens in the dark.",
    bullets: ["Live team & hours view", "Output & status tracking", "Weekly success reporting"],
  },
];

// The full breakdown — "everything we handle", by category.
const STACK = [
  {
    h: "Recruiting & matching",
    items: [
      "Private vetted talent network",
      "Role scorecard & brief",
      "Skills assessments",
      "Structured interviews",
      "Communication screening",
      "Shortlist in ~48 hours",
    ],
  },
  {
    h: "Payroll & compliance",
    items: [
      "Multi-region payroll",
      "Taxes & filings",
      "Employment contracts",
      "NDAs & IP assignment",
      "Local labour compliance",
      "Multi-currency payouts",
    ],
  },
  {
    h: "HR & people ops",
    items: [
      "Onboarding & offboarding",
      "Equipment provisioning",
      "Tool & system access",
      "Time-off management",
      "Benefits administration",
      "Day-to-day HR support",
    ],
  },
  {
    h: "Performance & cover",
    items: [
      "Dedicated success manager",
      "Weekly reporting",
      "Structured performance reviews",
      "Escalation handling",
      "Replacement guarantee",
      "Sickness & holiday cover",
    ],
  },
];

const TRUST = [
  "NDAs signed before day one",
  "Access controls aligned with you",
  "Secure data-handling practices",
  "Compliance across every region",
];

export default function InfrastructurePage() {
  const { content } = useModel();

  return (
    <div className="managed">
      <SceneBackground />
      <ManagedNav />

      {/* HERO */}
      <header className="m-section m-inf-hero" id="top">
        <div className="m-bg" aria-hidden="true">
          <div className="m-bg-grid" />
          <div className="m-bg-glow a" />
        </div>
        <div className="m-container m-inf-hero-grid">
          <div className="m-inf-hero-copy">
            <a href="#home" className="m-ob-back">
              ← Back to overview
            </a>
            <span className="m-eyebrow">Managed infrastructure</span>
            <h1>
              One managed layer running{" "}
              <span className="m-serif">everything</span> behind your team.
            </h1>
            <p className="m-ob-lead">
              Recruiting, payroll, HR, compliance, performance, and cover —
              owned and run in-house under a single managed layer, so you get
              the output of a great hire without any of the operational load.
            </p>
            <div className="m-hero-actions">
              <BookLink className="m-btn m-btn-primary m-btn-lg">
                Book a 15-minute call <ArrowRight />
              </BookLink>
              <a href="#stack" className="m-btn m-btn-ghost m-btn-lg">
                See everything included
              </a>
            </div>
          </div>

          <div className="m-inf-hero-visual" aria-hidden="true">
            <div className="m-inf-shot main">
              <img src={plfPayroll} alt="" loading="eager" />
            </div>
            <div className="m-inf-shot float">
              <img src={plfDashboard} alt="" loading="eager" />
            </div>
          </div>
        </div>
      </header>

      {/* STAT STRIP */}
      <section className="m-inf-strip-sec">
        <div className="m-container">
          <Reveal className="m-inf-strip">
            {STRIP.map((s) => (
              <div className="m-inf-strip-item" key={s.label}>
                <span className="m-inf-strip-val">{s.value}</span>
                <span className="m-inf-strip-lab">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="m-section m-inf-caps" id="capabilities">
        <div className="m-container">
          <div className="m-do-head">
            <Reveal as="span" className="m-eyebrow">
              What we handle
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              Six functions. One managed layer.
            </Reveal>
            <Reveal as="p" className="m-inf-sub" delay={0.1}>
              The work that normally lives across five tools and three teams —
              consolidated and run for you.
            </Reveal>
          </div>

          <div className="m-inf-cap-grid">
            {CAPABILITIES.map((c, i) => (
              <Reveal className="m-inf-cap" key={c.title} delay={(i % 3) * 0.07}>
                <div className="m-inf-cap-img">
                  <img src={c.image} alt="" loading="lazy" />
                </div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEEP-DIVE ROWS (cream, matches homepage platform band) */}
      <section className="m-section m-light m-inf-deep" id="deep">
        <div className="m-container">
          <div className="m-section-head">
            <Reveal as="span" className="m-eyebrow">
              Under the hood
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              {content.platform.title}
            </Reveal>
            <Reveal as="p" delay={0.1}>
              {content.platform.sub}
            </Reveal>
          </div>

          {DEEP.map((row, i) => (
            <div className={`m-platform-row ${i % 2 ? "flip" : ""}`} key={row.id}>
              <Reveal className="m-platform-copy">
                <span className="m-eyebrow">0{i + 1}</span>
                <h3>{row.title}</h3>
                <p>{row.body}</p>
                <ul className="m-platform-bullets">
                  {row.bullets.map((b) => (
                    <li key={b}>
                      <CheckIcon size={16} />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="m-shot has-img" delay={0.08}>
                <img src={row.image} alt={row.title} loading="lazy" />
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* EVERYTHING INCLUDED — the full checklist (cream) */}
      <section className="m-section m-light m-inf-stack-sec" id="stack">
        <div className="m-container">
          <div className="m-do-head">
            <Reveal as="span" className="m-eyebrow">
              The full stack
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              Everything we handle, in full.
            </Reveal>
            <Reveal as="p" className="m-inf-sub" delay={0.1}>
              Every task below is ours — included in one flat monthly price, with
              nothing billed as an add-on.
            </Reveal>
          </div>

          <div className="m-inf-stack">
            {STACK.map((col, i) => (
              <Reveal className="m-inf-col" key={col.h} delay={(i % 4) * 0.06}>
                <h3>{col.h}</h3>
                <ul>
                  {col.items.map((it) => (
                    <li key={it}>
                      <CheckIcon size={15} />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY / TRUST BAND (dark) */}
      <section className="m-section m-inf-trust-sec" id="trust">
        <div className="m-container">
          <Reveal className="m-inf-trust">
            <div className="m-inf-trust-copy">
              <span className="m-inf-trust-ic">
                <ShieldIcon size={28} />
              </span>
              <div>
                <span className="m-eyebrow">Security & trust</span>
                <h2>Your data and your business, protected.</h2>
                <p>
                  Every professional is contracted and screened before they
                  begin, and for sensitive roles we align on access controls and
                  data handling with you up front.
                </p>
              </div>
            </div>
            <ul className="m-inf-trust-list">
              {TRUST.map((t) => (
                <li key={t}>
                  <CheckIcon size={15} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="m-inf-trust-shot" aria-hidden="true">
              <img src={feat2} alt="" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA (cream band, dark card — matches homepage) */}
      <section className="m-cta m-light">
        <div className="m-container">
          <Reveal className="m-cta-card">
            <div className="m-bg" aria-hidden="true">
              <div className="m-bg-grid" />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2>Let us run everything behind your next hire.</h2>
              <p>
                Book a 15-minute call and we'll scope your first role — payroll,
                management, and replacement cover all included from day one.
              </p>
              <div className="m-cta-actions">
                <BookLink className="m-btn m-btn-primary m-btn-lg">
                  Book a 15-minute call <ArrowRight />
                </BookLink>
                <a href="#home" className="m-btn m-btn-ghost m-btn-lg">
                  Back to overview
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <StickyBook />
    </div>
  );
}
