import { BOOKING_URL } from "../data/content.js";
import { ArrowRight } from "./icons.jsx";

// Every "Book a call" button on the page uses this component, so
// they all behave the same way. If you've set BOOKING_URL in
// content.js, it links there (opening your scheduler). If not, it
// scrolls down to the role-details form at the bottom of the page.
export default function BookButton({ label = "Book a 15-minute call", large = false }) {
  const className = large ? "btn btn-primary btn-lg" : "btn btn-primary";

  if (BOOKING_URL) {
    return (
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={className}>
        {label} <ArrowRight />
      </a>
    );
  }

  return (
    <a href="#book" className={className}>
      {label} <ArrowRight />
    </a>
  );
}
