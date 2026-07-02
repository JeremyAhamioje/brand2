import { BRAND } from "../data/content.js";

// SECTION 3 — The solution
export default function Solution() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">
            We find your person. You keep everything after that.
          </h2>
        </div>

        <div className="prose">
          <p>
            {BRAND} sources candidates from a private network we've built and
            tested across our own companies. We run the skills tests, the
            interviews, and the English and communication screening. We hand you
            a shortlist of people who've already cleared the bar.
          </p>
          <p>
            You pick who fits. From that point on, they're yours: you hire them
            directly, you pay them directly, you manage them like any other
            member of your team. We charge one flat placement fee for the work of
            finding and vetting them — and that's the last you'll hear from our
            billing.
          </p>
          <p>
            No monthly subscription. No cut of their wage. No agency sitting
            between you and your own employee.
          </p>
        </div>

        <div className="callout">
          <h4>What makes this different</h4>
          <p>
            Most staffing agencies mark up your worker's wage 3–5x, forever. We
            don't touch their wage at all. You pay them what they earn, and you
            pay us once for finding them. That's it.
          </p>
        </div>
      </div>
    </section>
  );
}
