import { useModel } from "../context/ModelContext.jsx";
import { CheckIcon } from "./icons.jsx";

// SECTION 3 — The solution. When the active model defines
// `solution.features`, they render as a card grid (used by the
// Fully Managed model); otherwise it's prose + a callout.
export default function Solution() {
  const { content } = useModel();
  const { solution } = content;

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{solution.title}</h2>
        </div>

        <div className="prose">
          {solution.prose.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {solution.features && (
          <div className="feature-grid">
            {solution.features.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <span className="feature-icon">
                  <CheckIcon size={18} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            ))}
          </div>
        )}

        <div className="callout">
          <h4>{solution.callout.title}</h4>
          <p>{solution.callout.body}</p>
        </div>
      </div>
    </section>
  );
}
