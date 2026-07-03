import { useModel } from "../context/ModelContext.jsx";

// SECTION 2 — The problem
export default function Problem() {
  const { content } = useModel();
  const { problem } = content;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{problem.title}</h2>
        </div>

        {/* The three cost figures from the copy, pulled out for emphasis. */}
        <div className="cost-row">
          {problem.costs.map((cost) => (
            <div className="cost-card" key={cost.label}>
              <div className="amount">{cost.amount}</div>
              <div className="label">{cost.label}</div>
            </div>
          ))}
        </div>

        <div className="prose">
          {problem.prose.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <p className="transition-line">{problem.transition}</p>
        </div>
      </div>
    </section>
  );
}
