import { useModel } from "../context/ModelContext.jsx";

// SECTION 5 — How it works (onboarding flow)
export default function HowItWorks() {
  const { content } = useModel();
  const { how } = content;

  return (
    <section className="section section-alt" id="how">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{how.eyebrow}</span>
          <h2 className="section-title">{how.title}</h2>
        </div>

        <div className="steps">
          {how.steps.map((step, i) => (
            <div className="step" key={step.title}>
              <div className="step-num">{i + 1}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
