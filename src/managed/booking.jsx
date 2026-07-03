import { BOOKING_URL } from "../data/content.js";

// Lazily load Calendly's widget the first time someone books, so it
// costs nothing on initial page load (consistent with the rest of
// the site's performance approach).
let calendlyPromise;
function loadCalendly() {
  if (typeof window === "undefined") return Promise.reject();
  if (window.Calendly) return Promise.resolve();
  if (calendlyPromise) return calendlyPromise;
  calendlyPromise = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = reject;
    document.body.appendChild(s);
  });
  return calendlyPromise;
}

// Booking link. If BOOKING_URL (your Calendly link) is set, clicking
// opens the Calendly popup; otherwise it falls back to the in-page
// anchor (`fallback`, usually the contact form) so nothing breaks
// until the URL is configured. With JS disabled it still opens the
// Calendly page in a new tab.
export function BookLink({ className, children, fallback = "#book" }) {
  const href = BOOKING_URL || fallback;
  const onClick = (e) => {
    if (!BOOKING_URL) return; // let the anchor scroll to the form
    e.preventDefault();
    loadCalendly()
      .then(() => window.Calendly.initPopupWidget({ url: BOOKING_URL }))
      .catch(() => window.open(BOOKING_URL, "_blank", "noopener,noreferrer"));
  };
  const extra = BOOKING_URL
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a href={href} className={className} onClick={onClick} {...extra}>
      {children}
    </a>
  );
}
