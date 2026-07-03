import { useModel } from "../context/ModelContext.jsx";
import { ShieldIcon } from "./icons.jsx";

// SECTION 7 — The guarantee (standalone dark trust block)
export default function Guarantee() {
  const { content } = useModel();
  const { guarantee } = content;

  return (
    <section className="guarantee">
      <div className="container">
        <div className="inner">
          <div className="badge">
            <ShieldIcon />
          </div>
          <h2>{guarantee.title}</h2>
          {guarantee.paras.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
