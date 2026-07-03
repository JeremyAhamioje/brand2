import { useMemo, useState } from "react";
import { useModel } from "../context/ModelContext.jsx";
import { Chevron } from "./icons.jsx";

// SECTION 9 — FAQ. Click a question to expand its answer (accordion).
// A search input filters questions live.
export default function FAQ() {
  const { content } = useModel();
  const { faq } = content;

  const [openIndex, setOpenIndex] = useState(null);
  const [query, setQuery] = useState("");

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faq.items;
    return faq.items.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [query, faq.items]);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <h2>{faq.title}</h2>
        </div>

        <div className="faq-list">
          <div className="faq-search">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenIndex(null);
              }}
              placeholder="Search questions…"
              aria-label="Search FAQ"
            />
          </div>

          {filtered.length === 0 && (
            <p className="faq-empty">No questions match “{query}”.</p>
          )}

          {filtered.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className="faq-item" key={item.q}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                >
                  {item.q}
                  <Chevron />
                </button>
                {isOpen && (
                  <div className="faq-a">
                    {item.a}
                    {/* These answers were drafted from the document's notes
                        and should be confirmed before going live. */}
                    {item.draft && (
                      <div>
                        <span className="draft-tag">
                          Draft — confirm before publishing
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
