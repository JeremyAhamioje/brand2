import { roles } from "../data/content.js";

// SECTION 4 — Roles we place
export default function Roles() {
  return (
    <section className="section" id="roles">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Roles we place</span>
          <h2 className="section-title">
            Where we already have deep bench strength
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginTop: 12 }}>
            These are the roles we staff every day inside our own operations — so
            we know exactly what "great" looks like.
          </p>
        </div>

        <div className="role-grid">
          {roles.map((role) => (
            <div className="role-card" key={role.title}>
              <h3>{role.title}</h3>
              <p>{role.desc}</p>
              <div className="best-for">
                <strong>Best for:</strong> {role.bestFor}
              </div>
            </div>
          ))}
        </div>

        <p className="roles-note">
          Don't see your role? If it can be done remotely, we can likely place
          it. Ask on your call.
        </p>
      </div>
    </section>
  );
}
