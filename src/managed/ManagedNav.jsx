import { useModel } from "../context/ModelContext.jsx";
import { useScrolled } from "./hooks.js";
import { BookLink } from "./booking.jsx";
import { ArrowRight } from "../components/icons.jsx";

// Managed-product navbar. Becomes frosted glass once the page is
// scrolled.
export default function ManagedNav() {
  const { content } = useModel();
  const scrolled = useScrolled(10);

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
          <BookLink className="m-btn m-btn-primary">
            Book a call <ArrowRight />
          </BookLink>
        </div>
      </div>
    </nav>
  );
}
