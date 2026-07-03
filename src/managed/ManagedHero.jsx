import { Suspense, lazy } from "react";
import { useModel } from "../context/ModelContext.jsx";
import { usePrefersReducedMotion, useEnable3D } from "./hooks.js";
import { BookLink } from "./booking.jsx";
import { CheckIcon, ArrowRight } from "../components/icons.jsx";
import globePoster from "./assets/globe-poster.png";

// The globe is heavy (Three.js). It's code-split AND only mounted on
// capable devices — phones, low-end, and data-saver users get the
// static poster below and never download Three.js at all.
const Globe = lazy(() => import("./Globe.jsx"));

export default function ManagedHero() {
  const { content } = useModel();
  const { hero } = content;
  const reduced = usePrefersReducedMotion();
  const enable3D = useEnable3D();

  return (
    <header className="m-hero" id="top">
      <div className="m-bg" aria-hidden="true">
        <div className="m-bg-grid" />
        <div className="m-bg-glow a" />
        <div className="m-bg-glow b" />
      </div>

      <div className="m-hero-globe">
        <div className="m-globe-wrap">
          {enable3D ? (
            <Suspense fallback={<div className="m-globe-fallback" />}>
              <div className="m-globe-live">
                <Globe reduced={reduced} />
              </div>
            </Suspense>
          ) : (
            <img
              className="m-globe-poster"
              src={globePoster}
              alt="A US client connected to talent hubs in Nigeria, India, and the Philippines"
              width="720"
              height="720"
              loading="eager"
            />
          )}
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
            <BookLink className="m-btn m-btn-primary m-btn-lg">
              Book a 15-minute call <ArrowRight />
            </BookLink>
            <a href="#pricing" className="m-btn m-btn-ghost m-btn-lg">
              See pricing
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
