import { useEffect, useRef, useState } from "react";
import "./managed.css";
import ManagedNav from "./ManagedNav.jsx";
import ManagedHero from "./ManagedHero.jsx";
import { Logos, Stats, Features, Platform, Roles, HowItWorks } from "./Sections.jsx";
import { Pricing, Guarantee, FAQ, CTA, Footer } from "./Conversion.jsx";
import OnboardingPage from "./OnboardingPage.jsx";
import InfrastructurePage from "./InfrastructurePage.jsx";
import SceneBackground from "./SceneBackground.jsx";
import StickyBook from "./StickyBook.jsx";

// A tiny hash "route": #onboarding and #infrastructure each show a
// dedicated page; any other hash (or none) shows the managed home.
// This lets in-content CTAs route to standalone pages without a
// router dependency, while normal in-page anchors (#pricing, #faq,
// …) keep working.
const ROUTES = ["onboarding", "infrastructure"];
function readView() {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.slice(1).toLowerCase();
  return ROUTES.includes(hash) ? hash : "home";
}

export default function ManagedPage() {
  const [view, setView] = useState(readView());
  const viewRef = useRef(view);

  useEffect(() => {
    const onHash = () => {
      const next = readView();
      // Only reset scroll when switching between the two page views;
      // in-page anchors within the same view scroll normally.
      if (next !== viewRef.current) {
        viewRef.current = next;
        setView(next);
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (view === "onboarding") {
    return <OnboardingPage />;
  }
  if (view === "infrastructure") {
    return <InfrastructurePage />;
  }

  return (
    <div className="managed">
      <SceneBackground />
      <ManagedNav />
      <ManagedHero />
      <Features />
      <Platform />
      <Roles />
      <HowItWorks />
      <Pricing />
      <Guarantee />
      <FAQ />
      <CTA />
      <Logos />
      <Stats />
      <Footer />
      <StickyBook />
    </div>
  );
}
