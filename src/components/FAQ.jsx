import { useState } from "react";
import { faqs } from "../data/content.js";
import { Chevron } from "./icons.jsx";

// SECTION 9 — FAQ. Click a question to expand its answer (accordion).
export default function FAQ() {
  // Tracks which question is open. null means all closed.
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <h2>FAQ</h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => {
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
                        <span className="draft-tag">Draft — confirm before publishing</span>
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
