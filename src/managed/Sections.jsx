import { lazy, Suspense, useState } from "react";
import { useModel } from "../context/ModelContext.jsx";
import { useCountUp, useInView, usePrefersReducedMotion, useEnable3D } from "./hooks.js";
import { useTheme } from "../context/ThemeContext.jsx";
import Reveal from "./Reveal.jsx";
import { CheckIcon, ArrowRight } from "../components/icons.jsx";

const OrbitModel = lazy(() => import("./OrbitModel.jsx"));
import feat1 from "./assets/features/feat1.webp";
import feat2 from "./assets/features/feat2.webp";
import feat3 from "./assets/features/feat3.webp";
import feat4 from "./assets/features/feat4.webp";
import feat5 from "./assets/features/feat5.webp";
import feat6 from "./assets/features/feat6.webp";
import plfPayroll from "./assets/platform/payroll.webp";
import plfDashboard from "./assets/platform/dashboard.webp";
import role1 from "./assets/roles/role1.webp";
import role2 from "./assets/roles/role2.webp";
import role3 from "./assets/roles/role3.webp";
import roleInfra from "./assets/roles/infra.webp";
import orbitPoster from "./assets/orbit-poster.png";
import orbitPosterLight from "./assets/orbit-poster-light.png";

const ROLE_SHOTS = [role1, role2, role3];

// Real screenshots for specific platform rows (by row id).
const PLATFORM_IMAGES = { payroll: plfPayroll, dashboard: plfDashboard };

// ============================================================
// INDUSTRIES MARQUEE (animated, distinct display font)
// ============================================================
function MarqueeRow({ items, reverse }) {
  // Duplicate the list so a -50% translate loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="m-marquee-row">
      <div className={`m-marquee-track ${reverse ? "reverse" : ""}`}>
        {loop.map((name, i) => (
          <span className="m-marquee-item" key={i}>
            {name}
            <span className="m-marquee-sep" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Logos() {
  const { content } = useModel();
  const { logos } = content;
  const half = Math.ceil(logos.items.length / 2);
  const rowA = logos.items;
  const rowB = [...logos.items.slice(half), ...logos.items.slice(0, half)];

  return (
    <section className="m-marquee">
      <div className="m-container">
        <Reveal className="m-marquee-label" as="p">
          {logos.label}
        </Reveal>
      </div>
      <MarqueeRow items={rowA} />
      <MarqueeRow items={rowB} reverse />
    </section>
  );
}

// ============================================================
// STATS (count-up on scroll)
// ============================================================
function Stat({ value, suffix, label }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const n = useCountUp(value, inView);
  const display =
    value >= 1000 ? n.toLocaleString("en-US") : String(n);
  return (
    <div className="m-stat" ref={ref}>
      <div className="m-stat-value">
        {display}
        {suffix}
      </div>
      <div className="m-stat-label">{label}</div>
    </div>
  );
}

export function Stats() {
  const { content } = useModel();
  return (
    <section className="m-stats">
      <div className="m-container">
        <Reveal className="m-stats-grid">
          {content.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// WHAT WE DO — product-illustration card grid (Deel-style)
// ============================================================
const DO_CARDS = [
  {
    title: "Managed payroll",
    desc: "We pay your team on schedule — taxes and compliance handled.",
    image: feat3,
    alt: "Payroll dashboard showing cost, schedule and team members",
  },
  {
    title: "Talent, vetted & matched",
    desc: "Vetted professionals from our network, matched to your role in days.",
    image: feat1,
    alt: "Interface discovering vetted workers across countries",
  },
  {
    title: "Onboarding, handled",
    desc: "From offer to first paycheck, we run the entire onboarding.",
    image: feat2,
    alt: "Onboarded, deliverable and paid milestones on a timeline",
  },
  {
    title: "Your dedicated team",
    desc: "Full-time professionals who work only for you, live across regions.",
    image: feat4,
    alt: "New hires with onboarding and pending status",
  },
  {
    title: "Performance you can see",
    desc: "Success managers, reviews, and weekly reporting on every hire.",
    image: feat6,
    alt: "Performance tracking dashboard with KPIs and charts",
  },
  {
    title: "Compliance & benefits",
    desc: "Contracts, NDAs, and compliant benefits managed across 150+ regions.",
    image: feat5,
    alt: "Payroll complete with benefits and multi-currency support",
  },
];

export function Features() {
  const { content } = useModel();
  return (
    <section className="m-section m-do" id="features">
      <div className="m-container">
        <div className="m-do-head">
          <Reveal as="span" className="m-eyebrow">
            What we do
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            Everything a managed team needs.
          </Reveal>
        </div>

        <div className="m-do-grid">
          {DO_CARDS.map((card, i) => (
            <Reveal className="m-do-card" key={card.title} delay={(i % 3) * 0.08}>
              <div className="m-do-copy">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
              <div className="m-do-shot">
                <div className="m-do-shot-inner">
                  <img src={card.image} alt={card.alt} loading="lazy" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PLATFORM SHOWCASE (alternating rows + image placeholders)
// ============================================================
export function Platform() {
  const { content } = useModel();
  const { platform } = content;
  return (
    <section className="m-section m-light" id="platform">
      <div className="m-container">
        <div className="m-section-head">
          <Reveal as="span" className="m-eyebrow">
            {platform.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            {platform.title}
          </Reveal>
          <Reveal as="p" delay={0.1}>
            {platform.sub}
          </Reveal>
        </div>

        {platform.rows.map((row, i) => (
          <div className={`m-platform-row ${i % 2 ? "flip" : ""}`} key={row.title}>
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

            {PLATFORM_IMAGES[row.id] ? (
              <Reveal className="m-shot has-img" delay={0.08}>
                <img src={PLATFORM_IMAGES[row.id]} alt={row.title} loading="lazy" />
              </Reveal>
            ) : (
              /* Image placeholder — drop a product screenshot here. */
              <Reveal className="m-shot" delay={0.08}>
                <span className="m-shot-label">
                  <span className="m-shot-tag">Image</span>
                  {row.imageLabel}
                </span>
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ROLES — interactive showcase (hover a card → switch the image)
// ============================================================
export function Roles() {
  const { content } = useModel();
  const { roles } = content;
  const items = roles.items.slice(0, 3);
  const [active, setActive] = useState(0);

  return (
    <section className="m-section m-light" id="roles">
      <div className="m-container">
        <div className="m-do-head">
          <Reveal as="span" className="m-eyebrow">
            {roles.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            {roles.title}
          </Reveal>
        </div>

        <Reveal className="m-roles-banner">
          <div className="m-roles-cards">
            {items.map((role, i) => (
              <button
                key={role.title}
                type="button"
                className={`m-role-card2 ${active === i ? "active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <h3>{role.title}</h3>
                <p>{role.desc}</p>
                <span className="m-role-more">
                  Learn more <ArrowRight />
                </span>
              </button>
            ))}
          </div>

          <div className="m-roles-stage">
            {ROLE_SHOTS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={items[i] ? items[i].title : ""}
                className={active === i ? "on" : ""}
                loading="lazy"
              />
            ))}
            <span className="m-roles-cap">{items[active].title}</span>
          </div>

          <div className="m-roles-infra">
            <div className="m-roles-infra-copy">
              <h3>Built on our managed infrastructure</h3>
              <p>
                Recruiting, payroll, HR, and performance — handled in-house under
                one managed layer, so nothing lands on your plate.
              </p>
              <a href="#infrastructure" className="m-role-more">
                See everything we handle <ArrowRight />
              </a>
            </div>
            <div className="m-roles-infra-pills">
              <img src={roleInfra} alt="Managed capabilities" loading="lazy" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// HOW IT WORKS — interactive orbit model
// Each step in the list highlights its own ring in the 3D model.
// ============================================================
export function HowItWorks() {
  const { content } = useModel();
  const { how } = content;
  const reduced = usePrefersReducedMotion();
  const enable3D = useEnable3D();
  const { theme } = useTheme();
  const [active, setActive] = useState(0);
  const shorts = how.steps.map((s) => s.short);

  return (
    <section className="m-section m-how" id="how">
      <div className="m-container m-how-grid">
        <div className="m-how-copy">
          <Reveal as="span" className="m-eyebrow">
            {how.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            {how.title}
          </Reveal>

          <Reveal as="div" className="m-how-list" delay={0.1}>
            {how.steps.map((step, i) => (
              <button
                key={step.title}
                type="button"
                className={`m-how-item ${active === i ? "active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <span className="m-how-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="m-how-body">
                  <span className="m-how-title">{step.title}</span>
                  <span className="m-how-desc">{step.body}</span>
                </span>
              </button>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <a href="#onboarding" className="m-btn m-btn-primary m-btn-lg">
              <span className="m-plus">+</span> Discover our onboarding process
            </a>
          </Reveal>
        </div>

        <div className="m-how-stage">
          <span className="m-how-mark a">+</span>
          <span className="m-how-mark b">+</span>
          <span className="m-how-mark c">+</span>
          {enable3D ? (
            <Suspense fallback={<div className="m-how-fallback" />}>
              <OrbitModel steps={shorts} active={active} reduced={reduced} theme={theme} />
            </Suspense>
          ) : (
            <img
              className="m-how-poster"
              src={theme === "light" ? orbitPosterLight : orbitPoster}
              alt="Onboarding process shown as concentric orbits"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
}
