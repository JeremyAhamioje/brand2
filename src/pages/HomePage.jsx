import { useModel } from "../context/ModelContext.jsx";
import Hero from "../components/Hero.jsx";
import Problem from "../components/Problem.jsx";
import Solution from "../components/Solution.jsx";
import Roles from "../components/Roles.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Pricing from "../components/Pricing.jsx";
import Guarantee from "../components/Guarantee.jsx";
import WhyUs from "../components/WhyUs.jsx";
import FAQ from "../components/FAQ.jsx";
import FinalCTA from "../components/FinalCTA.jsx";

// The homepage. The model toggle now lives in the navbar; everything
// here lives in a `key`-swapped wrapper so switching the model replays
// a smooth entrance animation — all without leaving the page.
export default function HomePage() {
  const { model } = useModel();

  return (
    <main>
      <div className="model-swap" key={model}>
        <Hero />        {/* Section 1 */}
        <Problem />     {/* Section 2 */}
        <Solution />    {/* Section 3 */}
        <Roles />       {/* Section 4 */}
        <HowItWorks />  {/* Section 5 */}
        <Pricing />     {/* Section 6 */}
        <Guarantee />   {/* Section 7 */}
        <WhyUs />       {/* Section 8 */}
        <FAQ />         {/* Section 9 */}
        <FinalCTA />    {/* Section 10 */}
      </div>
    </main>
  );
}
