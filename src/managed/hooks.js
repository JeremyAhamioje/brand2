import { useEffect, useRef, useState } from "react";

// True when the user prefers reduced motion. We use this to disable
// non-essential animation (globe rotation, particles, parallax).
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

// Reveal-on-scroll. Returns [ref, inView]; inView flips true once the
// element enters the viewport and stays true (one-shot).
export function useInView(options = { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}

// Count a number up from 0 → `end` once `active` becomes true.
export function useCountUp(end, active, duration = 1600) {
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(end);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo for a premium settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration, reduced]);

  return value;
}

// Decides whether to load the heavy interactive 3D (Three.js) or
// fall back to a static poster image. We only enable it on devices
// likely to handle it well: a large screen, motion allowed, WebGL
// present, a fast connection, and not data-saver. Phones, low-end,
// and save-data users get the poster and never download Three.js —
// nor even the poster on capable devices. Computed synchronously on
// first render (this is a client-rendered SPA, so no hydration
// mismatch) so the right path renders immediately.
function computeEnable3D() {
  if (typeof window === "undefined") return false;
  const mq = (q) => window.matchMedia && window.matchMedia(q).matches;

  const reduced = mq("(prefers-reduced-motion: reduce)");
  const small = mq("(max-width: 900px)");
  const conn = navigator.connection || {};
  const saveData = !!conn.saveData;
  const slow = /(^|-)2g|3g$/.test(conn.effectiveType || "");
  const mem = navigator.deviceMemory;
  const lowMem = typeof mem === "number" && mem <= 2;

  let webgl = false;
  try {
    const c = document.createElement("canvas");
    webgl = !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    webgl = false;
  }

  return webgl && !reduced && !small && !saveData && !slow && !lowMem;
}

export function useEnable3D() {
  return useState(computeEnable3D)[0];
}

// Tracks whether the window has scrolled past `y` (for the frosted navbar).
export function useScrolled(y = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > y);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [y]);
  return scrolled;
}
