import { useModel } from "../context/ModelContext.jsx";
import BookButton from "./BookButton.jsx";

// SECTION 6 — Pricing. Renders a one-time fee table (Hire
// Yourself) or a flat-monthly table (Fully Managed), with an
// optional highlighted "most popular" row and savings callout.
export default function Pricing() {
  const { content } = useModel();
  const { pricing } = content;

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{pricing.eyebrow}</span>
          <h2 className="section-title">{pricing.title}</h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginTop: 12 }}>
            {pricing.sub}
          </p>
        </div>

        <div className="price-table">
          {pricing.rows.map((row) => (
            <div
              className={`price-row${row.featured ? " featured" : ""}`}
              key={row.role}
            >
              <span className="role-name">
                {row.role}
                {row.featured && <span className="popular-tag">Most popular</span>}
              </span>
              <span className="fee">
                {row.fee}
                {pricing.unit && <span className="fee-unit">{pricing.unit}</span>}
              </span>
            </div>
          ))}
        </div>
        <p className="price-note">{pricing.note}</p>

        {pricing.savings && (
          <div className="savings-callout">{pricing.savings}</div>
        )}

        <p className="value-frame">{pricing.valueFrame}</p>

        <div className="pricing-cta">
          <BookButton label={pricing.cta} />
        </div>
      </div>
    </section>
  );
}
