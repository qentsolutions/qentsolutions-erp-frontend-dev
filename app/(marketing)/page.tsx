import Hero from "./components/hero";
import Problem from "./components/problem";
import FeaturesAccordion from "./components/feature-resume";
import FeatureDesign from "./components/feature-design";
import CTA from "./components/cta";
import Stats from "./components/stats";

const MarketingPage = () => {

  return (
    <div className="mt-14">
      <Hero />
      <Stats />
      <Problem />
      <FeatureDesign />
      <FeaturesAccordion />
      <CTA />
    </div>
  );
};

export default MarketingPage;
