// SECTION 2 — The problem
export default function Problem() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">
            Hiring locally is slow and expensive. Hiring remote is a minefield.
          </h2>
        </div>

        {/* The three cost figures from the copy, pulled out for emphasis. */}
        <div className="cost-row">
          <div className="cost-card">            
            <div className="amount">$55,000+</div>
            <div className="label">A US bookkeeper's cost</div>            
          </div>
          <div className="cost-card">            
            <div className="amount">$40,000+</div>
            <div className="label">A customer-service rep, before benefits</div>            
          </div>
          <div className="cost-card">            
            <div className="amount">Six figures</div>
            <div className="label">for a developer</div>            
          </div>
        </div>

        <div className="prose">
          <p>
            So you either overpay for roles that don't need to be local — or you
            leave the work undone and stay stuck.
          </p>
          <p>
            Going remote <em>should</em> fix that. But then you hit a new wall:
            Where do you find people? How do you know they can actually do the
            job? What if their English isn't what the profile promised? Sorting
            through freelance platforms, running interviews, and gambling on a
            stranger is a project in itself — one you don't have time for.
          </p>
          <p>
            And most agencies that "solve" this quietly bill you three to five
            times what the worker actually earns, hidden inside a monthly fee you
            can't see into.
          </p>
          <p className="transition-line">
            We do it differently — and we do it once.
          </p>
        </div>
      </div>
    </section>
  );
}
