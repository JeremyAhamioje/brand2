import { useEffect, useRef } from "react";

// A fixed, full-viewport background that transitions between the dark
// page color and cream as you scroll. It reads whichever section is
// crossing the viewport line and matches that section's theme (sections
// tagged `.m-light` are cream). Sections are transparent, so this single
// layer produces one clean, full-width color shift per scroll — no
// per-section gradients.
export default function SceneBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = el.parentElement; // the .managed wrapper
    let raf = 0;

    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.42;
      const sections = root.querySelectorAll(
        ":scope > section, :scope > header, :scope > footer"
      );
      let theme = "dark";
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= line && r.bottom >= line) {
          theme = s.classList.contains("m-light") ? "light" : "dark";
          break;
        }
      }
      if (el.dataset.bg !== theme) el.dataset.bg = theme;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="m-scene-bg" ref={ref} data-bg="dark" aria-hidden="true" />;
}
