import { useModel } from "../context/ModelContext.jsx";
import BookButton from "./BookButton.jsx";
import { CheckIcon, ArrowRight } from "./icons.jsx";

// SECTION 1 — Hero. All copy comes from the active model, so the
// headline, subhead, secondary CTA, and trust strip change when
// the toggle is switched.
export default function Hero() {
  const { content } = useModel();
  const { hero } = content;

  return (
    <header className="hero" id="top">
      <div className="container">
        <span className="eyebrow">{hero.eyebrow}</span>
        <h1>{hero.headline}</h1>
        <p className="subhead">{hero.subhead}</p>
        <div className="hero-actions">
          <BookButton large />
          <a href={hero.secondaryCta.href} className="btn-link">
            {hero.secondaryCta.label} <ArrowRight />
          </a>
        </div>

        <div className="trust-strip">
          {hero.trust.map((point) => (
            <div className="trust-item" key={point}>
              <CheckIcon />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
