import { useModel } from "../context/ModelContext.jsx";

// SECTION 4 — Roles
export default function Roles() {
  const { content } = useModel();
  const { roles } = content;

  return (
    <section className="section" id="roles">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{roles.eyebrow}</span>
          <h2 className="section-title">{roles.title}</h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginTop: 12 }}>
            {roles.sub}
          </p>
        </div>

        <div className="role-grid">
          {roles.items.map((role) => (
            <div className="role-card" key={role.title}>
              <h3>{role.title}</h3>
              <p>{role.desc}</p>
              <div className="best-for">
                <strong>Best for:</strong> {role.bestFor}
              </div>
            </div>
          ))}
        </div>

        <p className="roles-note">{roles.note}</p>
      </div>
    </section>
  );
}
