import { steps } from "../data/content.js";

// SECTION 5 — How it works
export default function HowItWorks() {
  return (
    <section className="section section-alt" id="how">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title">
            From "I need someone" to "they're hired" in days, not months.
          </h2>
        </div>

        <div className="steps">
          {steps.map((step, i) => (
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
