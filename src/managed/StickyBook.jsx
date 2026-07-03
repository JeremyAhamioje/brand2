import { useEffect, useState } from "react";
import { BookLink } from "./booking.jsx";
import { ArrowRight } from "../components/icons.jsx";

// A persistent "Book a call" prompt that fades in once you've
// scrolled past the hero, keeping the primary (client) action always
// reachable. It hides itself while the big final CTA (#book) is on
// screen so the two don't stack. On phones it renders as a full-width
// bottom bar.
export default function StickyBook() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 640;
      const finalCta = document.getElementById("book");
      let finalInView = false;
      if (finalCta) {
        const r = finalCta.getBoundingClientRect();
        finalInView = r.top < window.innerHeight * 0.85 && r.bottom > 0;
      }
      setShow(past && !finalInView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={`m-sticky-cta ${show ? "show" : ""}`}>
      <BookLink className="m-btn m-btn-primary m-btn-lg">
        Book a call <ArrowRight />
      </BookLink>
    </div>
  );
}
