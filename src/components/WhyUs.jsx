import { useModel } from "../context/ModelContext.jsx";

// SECTION 8 — Why us (three pillars)
export default function WhyUs() {
  const { content } = useModel();
  const { why } = content;

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{why.eyebrow}</span>
          <h2 className="section-title">{why.title}</h2>
        </div>

        <div className="pillars">
          {why.pillars.map((pillar) => (
            <div className="pillar" key={pillar.title}>
              <div className="marker" />
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
