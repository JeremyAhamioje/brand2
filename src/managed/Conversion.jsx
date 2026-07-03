import { useMemo, useState } from "react";
import { useModel } from "../context/ModelContext.jsx";
import Reveal from "./Reveal.jsx";
import { BookLink } from "./booking.jsx";
import { CheckIcon, ArrowRight, ShieldIcon, Chevron } from "../components/icons.jsx";

// Same set of inclusions applies to every managed plan.
const INCLUDED = [
  "Payroll & compliance",
  "Dedicated success manager",
  "Replacement guarantee",
  "Weekly reporting",
];

// ============================================================
// PRICING
// ============================================================
export function Pricing() {
  const { content } = useModel();
  const { pricing } = content;

  return (
    <section className="m-section" id="pricing">
      <div className="m-container">
        <div className="m-section-head">
          <Reveal as="span" className="m-eyebrow">
            {pricing.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            {pricing.title}
          </Reveal>
          <Reveal as="p" delay={0.1}>
            {pricing.sub}
          </Reveal>
        </div>

        <div className="m-price-grid">
          {pricing.rows.map((row, i) => (
            <Reveal
              className={`m-price-card ${row.featured ? "featured" : ""}`}
              key={row.role}
              delay={(i % 4) * 0.07}
            >
              {row.featured && <span className="m-price-pop">Most popular</span>}
              <div className="m-price-role">{row.role}</div>
              <div className="m-price-fee">
                {row.fee}
                <span>{pricing.unit}</span>
              </div>
              <div className="m-price-sep" />
              <ul className="m-price-incl">
                {INCLUDED.map((inc) => (
                  <li key={inc}>
                    <CheckIcon size={15} />
                    {inc}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="m-price-foot">
          <Reveal as="span" className="m-savings">
            {pricing.savings}
          </Reveal>
          <Reveal as="p" className="m-price-compare" delay={0.05}>
            {pricing.valueFrame}
          </Reveal>
          <Reveal delay={0.1} style={{ marginTop: 28 }}>
            <BookLink className="m-btn m-btn-primary m-btn-lg">
              {pricing.cta} <ArrowRight />
            </BookLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// GUARANTEE
// ============================================================
function GtSpark() {
  return (
    <svg className="m-gtee-plus" width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 0c.6 6 6 11.4 12 12-6 .6-11.4 6-12 12-.6-6-6-11.4-12-12C6 11.4 11.4 6 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Guarantee() {
  const { content } = useModel();
  const { guarantee } = content;
  return (
    <section className="m-gtee m-light">
      <div className="m-gtee-arc" aria-hidden="true" />
      <div className="m-container">
        <div className="m-gtee-head">
          <Reveal as="span" className="m-eyebrow">
            Our guarantee
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            Protected two ways. <span className="m-serif">Guaranteed.</span>
          </Reveal>
          <Reveal as="p" delay={0.1}>
            If a hire isn't right, we make it right — replacement cover plus a
            refund window, so you're never locked into a hire that isn't working.
          </Reveal>
        </div>

        <div className="m-gtee-cards">
          <Reveal className="m-gtee-card low">
            <GtSpark />
            <h3>Replacement guarantee</h3>
            <p>{guarantee.paras[0]}</p>
          </Reveal>
          <Reveal className="m-gtee-card" delay={0.1}>
            <GtSpark />
            <h3>30-day refund</h3>
            <p>{guarantee.paras[1]}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ (smooth accordion + search)
// ============================================================
export function FAQ() {
  const { content } = useModel();
  const { faq } = content;
  const [open, setOpen] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faq.items;
    return faq.items.filter(
      (it) =>
        it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)
    );
  }, [query, faq.items]);

  return (
    <section className="m-section m-light" id="faq">
      <div className="m-container">
        <div className="m-section-head">
          <Reveal as="span" className="m-eyebrow">
            Answers
          </Reveal>
          <Reveal as="h2" delay={0.05}>
            {faq.title}
          </Reveal>
        </div>

        <div className="m-faq">
          <div className="m-faq-search">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(null);
              }}
              placeholder="Search questions…"
              aria-label="Search FAQ"
            />
          </div>

          {filtered.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className="m-faq-item" key={item.q}>
                <button
                  className="m-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                  <span className="m-chev">
                    <Chevron />
                  </span>
                </button>
                <div className={`m-faq-a-wrap ${isOpen ? "open" : ""}`}>
                  <div className="m-faq-a">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA (+ inline contact form)
// ============================================================
// Posts to our own serverless function, which emails the lead via
// Resend (the API key stays server-side — see /api/lead.js).
const FORM_ENDPOINT = "/api/lead";
const emptyForm = { name: "", email: "", role: "", details: "" };

export function CTA() {
  const { model, content } = useModel();
  const { finalCta, roles } = content;
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const payload = { ...form, model };
    if (!FORM_ENDPOINT) {
      console.log("Managed lead (no endpoint set yet):", payload);
      setStatus("success");
      return;
    }
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="m-cta m-light" id="book">
      <div className="m-container">
        <Reveal className="m-cta-card">
          <div className="m-bg" aria-hidden="true">
            <div className="m-bg-grid" />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="m-eyebrow" style={{ marginBottom: 14 }}>
              For companies hiring
            </span>
            <h2>{finalCta.title}</h2>
            <p>{finalCta.body}</p>
            <div className="m-cta-actions">
              <BookLink className="m-btn m-btn-primary m-btn-lg" fallback="#cta-form">
                Book a 15-minute call <ArrowRight />
              </BookLink>
              <a href="#cta-form" className="m-btn m-btn-ghost m-btn-lg">
                Tell us about your needs
              </a>
            </div>

            <div className="m-form" id="cta-form">
              {status === "success" ? (
                <div className="m-form-success">
                  <h4>Thanks — we've got your details</h4>
                  <p style={{ color: "var(--m-muted)" }}>
                    We'll reach out shortly to scope your team with you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="m-form-grid">
                    <div className="m-field">
                      <label htmlFor="m-name">Your name</label>
                      <input
                        id="m-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        required
                      />
                    </div>
                    <div className="m-field">
                      <label htmlFor="m-email">Work email</label>
                      <input
                        id="m-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        required
                      />
                    </div>
                    <div className="m-field full">
                      <label htmlFor="m-role">Role you want managed</label>
                      <select
                        id="m-role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select a role
                        </option>
                        {roles.items.map((r) => (
                          <option key={r.title}>{r.title}</option>
                        ))}
                        <option>Something else</option>
                      </select>
                    </div>
                    <div className="m-field full">
                      <label htmlFor="m-details">A little about your needs</label>
                      <textarea
                        id="m-details"
                        name="details"
                        value={form.details}
                        onChange={handleChange}
                        placeholder="Team size, hours, key skills or software, and anything else that helps us understand what you need."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="m-btn m-btn-primary"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Request your team"}
                  </button>
                  {status === "error" && (
                    <p className="m-form-note" style={{ color: "#ff9a9a" }}>
                      Something went wrong. Please email us instead.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// NEWSLETTER (footer) — adds the email to a Resend Audience
// ============================================================
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p className="m-news-note">Thanks — you're subscribed. ✦</p>;
  }

  return (
    <form className="m-news" onSubmit={submit}>
      <span className="m-news-label">Get occasional updates</span>
      <div className="m-news-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          required
        />
        <button
          type="submit"
          className="m-btn m-btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="m-news-note err">Couldn't subscribe — please try again.</p>
      )}
    </form>
  );
}

// ============================================================
// FOOTER
// ============================================================
const FOOTER_COLS = [
  { h: "Product", links: ["Platform", "Roles", "Pricing", "How it works"] },
  { h: "Company", links: ["About", "Careers", "Contact", "Blog"] },
  { h: "Resources", links: ["Help center", "Guides", "Status", "Security"] },
  { h: "Legal", links: ["Privacy", "Terms", "DPA", "Cookies"] },
];

export function Footer() {
  const { content } = useModel();
  const year = new Date().getFullYear();
  return (
    <footer className="m-footer">
      <div className="m-container">
        <div className="m-footer-grid">
          <div className="m-footer-col">
            <span className="m-brand">
              <span className="m-brand-dot" />
              {content.name}
            </span>
            <p className="m-footer-blurb">
              Global talent, locally managed. We recruit, onboard, pay, and
              manage dedicated remote professionals — so you get the output
              without the operational burden.
            </p>
            <NewsletterForm />
          </div>
          {FOOTER_COLS.map((col) => (
            <div className="m-footer-col" key={col.h}>
              <h5>{col.h}</h5>
              {col.links.map((l) => (
                <a href="#top" key={l}>
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="m-footer-bottom">
          <span>
            © {year} {content.name}. All rights reserved.
          </span>
          <span>Global talent. One managed team.</span>
        </div>
      </div>
    </footer>
  );
}
