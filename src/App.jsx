import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Problem from "./components/Problem.jsx";
import Solution from "./components/Solution.jsx";
import Roles from "./components/Roles.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Pricing from "./components/Pricing.jsx";
import Guarantee from "./components/Guarantee.jsx";
import WhyUs from "./components/WhyUs.jsx";
import FAQ from "./components/FAQ.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";

// The whole page, assembled in the same order as your document's
// ten sections. Each component maps to one section of the copy.
export default function App() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}
