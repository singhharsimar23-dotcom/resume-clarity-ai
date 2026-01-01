import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/landing/LandingHero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { RealityScoreSection } from "@/components/landing/RealityScoreSection";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { WhoIsThisFor } from "@/components/landing/WhoIsThisFor";
import { CredibilitySection } from "@/components/landing/CredibilitySection";
import { FinalCTA } from "@/components/landing/FinalCTA";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <LandingHero />
        <ProblemSection />
        <FeaturesGrid />
        <RealityScoreSection />
        <BeforeAfterSection />
        <WhoIsThisFor />
        <CredibilitySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
