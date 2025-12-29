import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAnalysisStore } from "@/stores/analysis-store";

const lockedFeatures = [
  "AI-guided resume rebuild strategy",
  "Keyword & role mapping analysis",
  "High-impact rewrite suggestions",
  "Market-aligned activity recommendations",
  "Section-by-section improvement plan",
];

// Fallback data for demo purposes
const fallbackAnalysis = {
  overall_score: 29,
  status: "critical" as const,
  headline: "Core Sections Require Rebuild",
  categories: {
    ats_compatibility: { score: 2, feedback: "Your resume lacks standard formatting that ATS systems require to parse correctly." },
    content_strength: { score: 14, feedback: "Impact statements are weak. Numbers and achievements are missing." },
    writing_clarity: { score: 3, feedback: "Passive voice and vague language reduce your professional impact." },
    job_match: { score: 10, feedback: "Keywords don't align with current market demands for your target roles." },
  },
  failure_reasons: [
    "Outdated hiring signals from pre-2022 resume advice",
    "Academic framing instead of professional impact",
    "Weak proof-of-work evidence in experience section",
    "Low keyword-to-role match for target positions",
    "Generic summary that doesn't differentiate you",
  ],
  rebuild_roadmap: {
    summary_rewrite: { issue: "", suggestion: "" },
    experience_improvements: [],
    keyword_gaps: [],
    action_items: [],
  },
};

function getScoreColor(score: number, max: number): string {
  const percentage = (score / max) * 100;
  if (percentage < 30) return "text-destructive";
  if (percentage < 60) return "text-warning";
  return "text-success";
}

function getScoreBarColor(score: number, max: number): string {
  const percentage = (score / max) * 100;
  if (percentage < 30) return "bg-destructive";
  if (percentage < 60) return "bg-warning";
  return "bg-success";
}

function getStatusColor(status: string): string {
  switch (status) {
    case "critical": return "text-destructive";
    case "weak": return "text-warning";
    case "moderate": return "text-warning";
    case "strong": return "text-success";
    default: return "text-muted-foreground";
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "critical": return "Critical";
    case "weak": return "Weak";
    case "moderate": return "Moderate";
    case "strong": return "Strong";
    default: return status;
  }
}

export default function ScorePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const storedAnalysis = useAnalysisStore((state) => state.analysis);
  
  // Use stored analysis or fallback
  const analysis = storedAnalysis || fallbackAnalysis;

  const categories = [
    {
      name: "ATS Compatibility",
      score: analysis.categories.ats_compatibility.score,
      maxScore: 20,
      feedback: analysis.categories.ats_compatibility.feedback,
    },
    {
      name: "Content Strength",
      score: analysis.categories.content_strength.score,
      maxScore: 40,
      feedback: analysis.categories.content_strength.feedback,
    },
    {
      name: "Writing & Clarity",
      score: analysis.categories.writing_clarity.score,
      maxScore: 10,
      feedback: analysis.categories.writing_clarity.feedback,
    },
    {
      name: "Job Match Alignment",
      score: analysis.categories.job_match.score,
      maxScore: 25,
      feedback: analysis.categories.job_match.feedback,
    },
  ];

  const totalScore = analysis.overall_score;
  const maxScore = 100;
  const percentage = totalScore;

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

  // If no analysis, redirect to upload
  if (!storedAnalysis) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">No Analysis Found</h1>
            <p className="mt-2 text-muted-foreground">
              Please upload your resume to get an AI analysis.
            </p>
            <Button
              onClick={() => navigate("/upload")}
              variant="hero"
              size="lg"
              className="mt-6"
            >
              Upload Resume
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          {/* Score Header */}
          <div className="animate-fade-in rounded-xl border border-border bg-card p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div>
                <p className={`text-sm font-medium ${getStatusColor(analysis.status)}`}>
                  Resume Health: {getStatusLabel(analysis.status)}
                </p>
                <h1 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
                  {analysis.headline}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {analysis.status === "critical" 
                    ? "AI analysis shows this resume is filtered before recruiter review."
                    : analysis.status === "weak"
                    ? "This resume needs significant improvements to compete effectively."
                    : analysis.status === "moderate"
                    ? "Good foundation, but optimization will improve your response rate."
                    : "Strong resume with minor opportunities for enhancement."}
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
                      stroke={
                        percentage < 30 
                          ? "hsl(var(--destructive))" 
                          : percentage < 60 
                          ? "hsl(var(--warning))" 
                          : "hsl(var(--success))"
                      }
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
                        <p>{category.feedback}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${getScoreBarColor(category.score, category.maxScore)}`}
                        style={{
                          width: `${(category.score / category.maxScore) * 100}%`,
                        }}
                      />
                    </div>
                    <span
                      className={`min-w-[60px] text-right font-semibold ${getScoreColor(category.score, category.maxScore)}`}
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
                {analysis.failure_reasons.map((reason, index) => (
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
