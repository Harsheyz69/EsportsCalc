import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Strip from "./components/Strip";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import PointSystems from "./components/PointSystems";
import StatsBand from "./components/StatsBand";
import Studio from "./components/Studio";
import TemplateVault from "./components/TemplateVault";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Nav />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Strip />
        <HowItWorks />
        <Features />
        <PointSystems />
        <StatsBand />
        <Studio />
        <TemplateVault />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
