import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/landing/LandingHero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { ResumeDemoSection } from "@/components/landing/ResumeDemoSection";
import { BuildResumeSection } from "@/components/landing/BuildResumeSection";
import { RealityScoreSection } from "@/components/landing/RealityScoreSection";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { WhoIsThisFor } from "@/components/landing/WhoIsThisFor";
import { CredibilitySection } from "@/components/landing/CredibilitySection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // If user is authenticated, don't render landing (navigation will handle redirect)
  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <LandingHero />
        <ProblemSection />
        <FeaturesGrid />
        <ResumeDemoSection />
        <BuildResumeSection />
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
