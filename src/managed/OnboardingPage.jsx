import { Suspense, lazy, useEffect, useState } from "react";
import { usePrefersReducedMotion, useEnable3D } from "./hooks.js";
import { useTheme } from "../context/ThemeContext.jsx";
import Reveal from "./Reveal.jsx";
import ManagedNav from "./ManagedNav.jsx";
import { Footer } from "./Conversion.jsx";
import SceneBackground from "./SceneBackground.jsx";
import StickyBook from "./StickyBook.jsx";
import { BookLink } from "./booking.jsx";
import { ArrowRight, CheckIcon } from "../components/icons.jsx";
import orbitPoster from "./assets/orbit-poster.png";
import orbitPosterLight from "./assets/orbit-poster-light.png";

const OrbitModel = lazy(() => import("./OrbitModel.jsx"));

// The detailed managed-onboarding walkthrough (wgb-style service page).
const PHASES = [
  {
    short: "Discovery",
    title: "Discovery & role design",
    body: "We start with a short call to understand the role, your tools, the hours you need, and what a great hire looks like for you. Your bar becomes our written brief.",
    deliverables: ["Role scorecard", "Tooling & hours brief", "Success criteria", "Timeline & pricing"],
  },
  {
    short: "Sourcing",
    title: "Sourcing & vetting",
    body: "We source from our private, vetted network and run every candidate through skills testing, structured interviews, and communication screening — so you only meet finalists.",
    deliverables: ["Curated shortlist", "Skills assessments", "Structured interviews", "Comms screening"],
  },
  {
    short: "Selection",
    title: "Selection & contracts",
    body: "You interview the shortlist and pick the person who fits. We handle offers, contracts, equipment, and access — you don't touch any of the paperwork.",
    deliverables: ["Final interviews", "Offer & contract", "Equipment provisioning", "NDAs & access"],
  },
  {
    short: "Onboard",
    title: "Onboarding & payroll",
    body: "Your professional is onboarded onto your tools and workflow with a structured week-one plan, while we set up payroll, taxes, and compliance behind the scenes.",
    deliverables: ["Tool onboarding", "Payroll & taxes", "Compliance setup", "Week-one plan"],
  },
  {
    short: "Manage",
    title: "Management & cover",
    body: "A dedicated success manager tracks performance, runs reviews, and handles time off and cover — with the replacement guarantee protecting you the entire time.",
    deliverables: ["Success manager", "Weekly reporting", "Performance reviews", "Replacement cover"],
  },
];

export default function OnboardingPage() {
  const reduced = usePrefersReducedMotion();
  const enable3D = useEnable3D();
  const { theme } = useTheme();
  const [active, setActive] = useState(0);

  // Gently cycle the orbit highlight in the hero (only when the 3D
  // model is actually mounted).
  useEffect(() => {
    if (reduced || !enable3D) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % PHASES.length),
      2600
    );
    return () => clearInterval(id);
  }, [reduced, enable3D]);

  return (
    <div className="managed">
      <SceneBackground />
      <ManagedNav />

      <header className="m-section m-ob-hero" id="top">
        <div className="m-bg" aria-hidden="true">
          <div className="m-bg-grid" />
          <div className="m-bg-glow a" />
        </div>
        <div className="m-container m-ob-hero-grid">
          <div className="m-ob-hero-copy">
            <a href="#home" className="m-ob-back">
              ← Back to overview
            </a>
            <span className="m-eyebrow">Onboarding process</span>
            <h1>
              Your onboarding, <span className="m-serif">engineered</span> end
              to end.
            </h1>
            <p className="m-ob-lead">
              A predictable, fully managed path from your first call to a
              dedicated teammate who's live, paid, and performing — with every
              step handled for you.
            </p>
            <div className="m-hero-actions">
              <BookLink className="m-btn m-btn-primary m-btn-lg">
                Book a 15-minute call <ArrowRight />
              </BookLink>
              <a href="#phases" className="m-btn m-btn-ghost m-btn-lg">
                See the process
              </a>
            </div>
          </div>

          <div className="m-how-stage m-ob-stage">
            {enable3D ? (
              <Suspense fallback={<div className="m-how-fallback" />}>
                <OrbitModel
                  steps={PHASES.map((p) => p.short)}
                  active={active}
                  reduced={reduced}
                  theme={theme}
                />
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
      </header>

      <section className="m-section m-ob-phases" id="phases">
        <div className="m-container">
          <div className="m-do-head">
            <Reveal as="span" className="m-eyebrow">
              The process
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              Five phases. Everything handled.
            </Reveal>
          </div>

          {PHASES.map((phase, i) => (
            <Reveal className="m-ob-phase" key={phase.title} delay={0.04}>
              <div className="m-ob-phase-head">
                <span className="m-ob-phase-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{phase.title}</h3>
                  <p>{phase.body}</p>
                </div>
              </div>
              <div className="m-ob-deliverables">
                <span className="m-ob-deliverables-label">The deliverables</span>
                {phase.deliverables.map((d) => (
                  <div className="m-ob-deliverable" key={d}>
                    <CheckIcon size={15} />
                    {d}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="m-cta">
        <div className="m-container">
          <Reveal className="m-cta-card">
            <div className="m-bg" aria-hidden="true">
              <div className="m-bg-grid" />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2>Ready to start onboarding?</h2>
              <p>
                Book a 15-minute call and we'll map your first role to this exact
                process — with a shortlist in your inbox within days.
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
