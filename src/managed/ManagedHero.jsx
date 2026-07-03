import { Suspense, lazy } from "react";
import { useModel } from "../context/ModelContext.jsx";
import { BOOKING_URL } from "../data/content.js";
import { usePrefersReducedMotion } from "./hooks.js";
import { CheckIcon, ArrowRight } from "../components/icons.jsx";

// The globe is heavy (Three.js) so it's code-split and only loads
// on the managed page, behind a lightweight glowing fallback.
const Globe = lazy(() => import("./Globe.jsx"));

export default function ManagedHero() {
  const { content } = useModel();
  const { hero } = content;
  const reduced = usePrefersReducedMotion();
  const bookHref = BOOKING_URL || "#book";
  const bookProps = BOOKING_URL
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <header className="m-hero" id="top">
      <div className="m-bg" aria-hidden="true">
        <div className="m-bg-grid" />
        <div className="m-bg-glow a" />
        <div className="m-bg-glow b" />
      </div>

      <div className="m-hero-globe">
        <div className="m-globe-wrap">
          <Suspense fallback={<div className="m-globe-fallback" />}>
            <div className="m-globe-canvas">
              <Globe reduced={reduced} />
            </div>
          </Suspense>
        </div>
      </div>

      <div className="m-container m-hero-overlay">
        <div className="m-hero-tl">
          <span className="m-eyebrow">{hero.eyebrow}</span>
          <h1>
            Global talent,
            <br />
            <span className="grad">one managed team.</span>
          </h1>
        </div>

        <div className="m-hero-bl">
          {hero.trust.map((badge) => (
            <span className="m-badge" key={badge}>
              <CheckIcon size={15} />
              {badge}
            </span>
          ))}
        </div>

        <div className="m-hero-br">
          <p className="m-hero-sub">{hero.subhead}</p>
          <div className="m-hero-actions">
            <a href={bookHref} className="m-btn m-btn-primary m-btn-lg" {...bookProps}>
              Book a 15-minute call <ArrowRight />
            </a>
            <a href="#pricing" className="m-btn m-btn-ghost m-btn-lg">
              See pricing
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
