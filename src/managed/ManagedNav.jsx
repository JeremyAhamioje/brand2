import { useModel } from "../context/ModelContext.jsx";
import { BOOKING_URL } from "../data/content.js";
import { useScrolled } from "./hooks.js";
import { ArrowRight } from "../components/icons.jsx";

// Managed-product navbar. Becomes frosted glass once the page is
// scrolled.
export default function ManagedNav() {
  const { content } = useModel();
  const scrolled = useScrolled(10);
  const bookHref = BOOKING_URL || "#book";

  return (
    <nav className={`m-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="m-container m-nav-inner">
        <a href="#top" className="m-brand">
          <span className="m-brand-dot" />
          {content.name}
        </a>

        <div className="m-nav-links">
          <a href="#platform">Platform</a>
          <a href="#roles">Roles</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="m-nav-right">
          <a
            href={bookHref}
            className="m-btn m-btn-primary"
            {...(BOOKING_URL
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Book a call <ArrowRight />
          </a>
        </div>
      </div>
    </nav>
  );
}
