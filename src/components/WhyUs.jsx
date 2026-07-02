import { BRAND, pillars } from "../data/content.js";

// SECTION 8 — Why us (three pillars)
export default function WhyUs() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why {BRAND}</span>
          <h2 className="section-title">
            We're not a job board. We're operators who hire this way ourselves.
          </h2>
        </div>

        <div className="pillars">
          {pillars.map((pillar) => (
            <div className="pillar" key={pillar.title}>
              <div className="marker" />
              <h3>{pillar.title}</h3>
              <p>
                {/* One pillar starts with the brand name, so we prepend it. */}
                {pillar.leadWithBrand ? `${BRAND} ${pillar.body}` : pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
