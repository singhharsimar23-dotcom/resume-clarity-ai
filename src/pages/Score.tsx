import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lock, Info, X, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  {
    name: "ATS Compatibility",
    score: 2,
    maxScore: 20,
    status: "critical" as const,
    description: "Your resume lacks standard formatting that ATS systems require to parse correctly.",
  },
  {
    name: "Content Strength",
    score: 14,
    maxScore: 40,
    status: "warning" as const,
    description: "Impact statements are weak. Numbers and achievements are missing.",
  },
  {
    name: "Writing & Clarity",
    score: 3,
    maxScore: 10,
    status: "critical" as const,
    description: "Passive voice and vague language reduce your professional impact.",
  },
  {
    name: "Job Match Alignment",
    score: 10,
    maxScore: 25,
    status: "warning" as const,
    description: "Keywords don't align with current market demands for your target roles.",
  },
];

const failureReasons = [
  "Outdated hiring signals from pre-2022 resume advice",
  "Academic framing instead of professional impact",
  "Weak proof-of-work evidence in experience section",
  "Low keyword-to-role match for target positions",
  "Generic summary that doesn't differentiate you",
];

const lockedFeatures = [
  "AI-guided resume rebuild strategy",
  "Keyword & role mapping analysis",
  "High-impact rewrite suggestions",
  "Market-aligned activity recommendations",
  "Section-by-section improvement plan",
];

export default function ScorePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const totalScore = categories.reduce((acc, cat) => acc + cat.score, 0);
  const maxScore = categories.reduce((acc, cat) => acc + cat.maxScore, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment");

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          {/* Score Header */}
          <div className="animate-fade-in rounded-xl border border-border bg-card p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div>
                <p className="text-sm font-medium text-destructive">Resume Health: Critical</p>
                <h1 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
                  Core Sections Require Rebuild
                </h1>
                <p className="mt-2 text-muted-foreground">
                  AI analysis shows this resume is filtered before recruiter review.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative">
                  <svg className="h-28 w-28 -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * percentage) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">{totalScore}</span>
                    <span className="text-xs text-muted-foreground">/ {maxScore}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="animate-fade-in stagger-1 mt-8 opacity-0">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Category Breakdown</h2>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{category.name}</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{category.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${
                          category.status === "critical" ? "bg-destructive" : "bg-warning"
                        }`}
                        style={{
                          width: `${(category.score / category.maxScore) * 100}%`,
                        }}
                      />
                    </div>
                    <span
                      className={`min-w-[60px] text-right font-semibold ${
                        category.status === "critical" ? "text-destructive" : "text-warning"
                      }`}
                    >
                      {category.score} / {category.maxScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Failure Summary */}
          <div className="animate-fade-in stagger-2 mt-8 opacity-0">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Why This Resume Is Being Filtered
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3">
                {failureReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span className="text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Locked Section */}
          <div className="animate-fade-in stagger-3 mt-8 opacity-0">
            <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-card">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
              <div className="relative p-6">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Your AI Rebuild Roadmap (Pro)
                  </h2>
                </div>

                <div className="mt-6 space-y-3 blur-[6px]">
                  {lockedFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-secondary/50 p-4"
                    >
                      <p className="font-medium text-foreground">{feature}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Detailed analysis and actionable steps to implement this improvement...
                      </p>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 -mx-6 -mb-6 mt-8 border-t border-border bg-card p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-muted-foreground">
                      Unlock full AI analysis, rebuild strategy, and market-aligned fixes
                    </p>
                    <Button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      variant="premium"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Opening checkout...
                        </>
                      ) : (
                        <>
                          Unlock Pro Analysis
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Secure one-time payment via Stripe. No subscriptions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
