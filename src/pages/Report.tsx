import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  Wrench,
  CheckSquare,
  Download,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAnalysisStore } from "@/stores/analysis-store";

const navItems = [
  { id: "summary", label: "Summary", icon: FileText },
  { id: "failures", label: "Failure Causes", icon: AlertTriangle },
  { id: "market", label: "Market Reality", icon: TrendingUp },
  { id: "rebuild", label: "Resume Rebuild", icon: Wrench },
  { id: "action", label: "Action Plan", icon: CheckSquare },
];

function getScoreColor(score: number): string {
  if (score < 30) return "text-destructive";
  if (score < 60) return "text-warning";
  return "text-success";
}

export default function ReportPage() {
  const [activeSection, setActiveSection] = useState("summary");
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const analysis = useAnalysisStore((state) => state.analysis);

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      toast({
        title: "Payment successful",
        description: "Your Pro AI Analysis is now unlocked. Explore your rebuild roadmap below.",
      });
    }
  }, [searchParams, toast]);

  // If no analysis, redirect to upload
  if (!analysis) {
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

  const failureCauses = analysis.failure_reasons.map((reason, index) => ({
    title: `Issue ${index + 1}`,
    description: reason,
    severity: index < 2 ? "critical" : "warning",
  }));

  const rebuildSections = analysis.rebuild_roadmap.experience_improvements.length > 0
    ? analysis.rebuild_roadmap.experience_improvements.map((improvement, index) => ({
        section: `Experience Bullet ${index + 1}`,
        before: improvement.original,
        after: improvement.improved,
        explanation: "Transformed from passive assistance language to active ownership with quantified impact.",
      }))
    : [
        {
          section: "Summary",
          before: analysis.rebuild_roadmap.summary_rewrite.issue || "Current summary lacks specificity",
          after: analysis.rebuild_roadmap.summary_rewrite.suggestion || "Improved summary with measurable impact",
          explanation: "The new summary leads with competency, includes specific achievements, and targets specific roles.",
        },
      ];

  const actionItems = analysis.rebuild_roadmap.action_items.length > 0
    ? analysis.rebuild_roadmap.action_items
    : [
        {
          priority: "high" as const,
          title: "Rewrite all experience bullets using CAR format",
          description: "Challenge-Action-Result format ensures every bullet demonstrates impact.",
          timeframe: "This week",
        },
        {
          priority: "high" as const,
          title: "Add proof-of-work projects",
          description: "Create or document personal projects with live links to show initiative.",
          timeframe: "2 weeks",
        },
        {
          priority: "medium" as const,
          title: "Run keyword analysis on target job postings",
          description: "Extract common requirements and weave them naturally into your resume.",
          timeframe: "This week",
        },
      ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          {searchParams.get("payment") === "success" && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 p-4">
              <CheckCircle className="h-5 w-5 text-success" />
              <p className="text-sm text-foreground">
                Payment confirmed. Your full Pro AI Analysis is now available.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2 bg-accent/10 text-accent">
                Pro AI Analysis
              </Badge>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Your Resume Rebuild Report
              </h1>
            </div>
            <Button variant="outline" size="default">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
            {/* Sidebar Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors",
                    activeSection === item.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {activeSection === item.id && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </button>
              ))}
            </nav>

            {/* Content Area */}
            <div className="min-h-[600px] rounded-xl border border-border bg-card p-8">
              {activeSection === "summary" && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground">Executive Summary</h2>
                  <div className="mt-6 space-y-4 text-muted-foreground">
                    <p>
                      This resume scored <strong className={getScoreColor(analysis.overall_score)}>{analysis.overall_score}/100</strong>,
                      {analysis.overall_score < 30 
                        ? " placing it in the bottom 15% of resumes analyzed."
                        : analysis.overall_score < 50
                        ? " indicating significant room for improvement."
                        : analysis.overall_score < 70
                        ? " showing a competitive foundation with optimization opportunities."
                        : " demonstrating strong positioning in the market."}
                    </p>
                    <p>
                      {analysis.headline}. The primary issues
                      are structural rather than experiential — meaning the underlying
                      experience has potential, but presentation {analysis.overall_score < 50 ? "is actively harming" : "could better support"} your candidacy.
                    </p>
                    <p>
                      Estimated effort to reach 70+ score: <strong className="text-foreground">
                        {analysis.overall_score < 30 ? "8-12 hours" : analysis.overall_score < 50 ? "4-6 hours" : "2-3 hours"}
                      </strong> of focused revision following this roadmap.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-border p-4 text-center">
                      <p className={`text-3xl font-bold ${getScoreColor(analysis.overall_score)}`}>
                        {analysis.overall_score}
                      </p>
                      <p className="text-sm text-muted-foreground">Current Score</p>
                    </div>
                    <div className="rounded-lg border border-border p-4 text-center">
                      <p className="text-3xl font-bold text-success">72+</p>
                      <p className="text-sm text-muted-foreground">Target Score</p>
                    </div>
                    <div className="rounded-lg border border-border p-4 text-center">
                      <p className="text-3xl font-bold text-foreground">
                        {analysis.overall_score < 30 ? "8-12h" : analysis.overall_score < 50 ? "4-6h" : "2-3h"}
                      </p>
                      <p className="text-sm text-muted-foreground">Est. Revision Time</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "failures" && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground">Failure Causes</h2>
                  <p className="mt-2 text-muted-foreground">
                    Detailed analysis of why this resume underperforms.
                  </p>

                  <div className="mt-6 space-y-4">
                    {failureCauses.map((cause, index) => (
                      <div
                        key={index}
                        className={cn(
                          "rounded-lg border p-5",
                          cause.severity === "critical"
                            ? "border-destructive/30 bg-destructive/5"
                            : "border-warning/30 bg-warning/5"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className={cn(
                              "h-4 w-4",
                              cause.severity === "critical"
                                ? "text-destructive"
                                : "text-warning"
                            )}
                          />
                          <Badge
                            variant="secondary"
                            className={cn(
                              cause.severity === "critical"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-warning/10 text-warning"
                            )}
                          >
                            {cause.severity}
                          </Badge>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {cause.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Category Feedback */}
                  <div className="mt-8 space-y-4">
                    <h3 className="font-semibold text-foreground">Category Insights</h3>
                    <div className="space-y-3">
                      <div className="rounded-lg border border-border p-4">
                        <p className="font-medium text-foreground">ATS Compatibility ({analysis.categories.ats_compatibility.score}/20)</p>
                        <p className="mt-1 text-sm text-muted-foreground">{analysis.categories.ats_compatibility.feedback}</p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="font-medium text-foreground">Content Strength ({analysis.categories.content_strength.score}/40)</p>
                        <p className="mt-1 text-sm text-muted-foreground">{analysis.categories.content_strength.feedback}</p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="font-medium text-foreground">Writing & Clarity ({analysis.categories.writing_clarity.score}/10)</p>
                        <p className="mt-1 text-sm text-muted-foreground">{analysis.categories.writing_clarity.feedback}</p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="font-medium text-foreground">Job Match ({analysis.categories.job_match.score}/25)</p>
                        <p className="mt-1 text-sm text-muted-foreground">{analysis.categories.job_match.feedback}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "market" && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground">Market Reality</h2>
                  <p className="mt-2 text-muted-foreground">
                    Current hiring patterns and what employers expect.
                  </p>

                  <div className="mt-6 space-y-6 text-muted-foreground">
                    <div>
                      <h3 className="font-semibold text-foreground">ATS Filtering Has Increased</h3>
                      <p className="mt-2">
                        In 2024, 75% of Fortune 500 companies use ATS systems that filter out
                        70-80% of applications before human review. Your current formatting
                        {analysis.categories.ats_compatibility.score < 10 
                          ? " triggers multiple filter flags."
                          : analysis.categories.ats_compatibility.score < 15
                          ? " has some compatibility issues."
                          : " is reasonably compatible."}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">Entry-Level Expectations Have Shifted</h3>
                      <p className="mt-2">
                        Hiring managers now expect proof-of-work (projects, contributions,
                        certifications) even for entry-level roles. A degree alone no longer
                        differentiates candidates.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">Keyword Matching Is Table Stakes</h3>
                      <p className="mt-2">
                        Tailoring resumes to each job posting is no longer optional. Generic
                        resumes are automatically deprioritized by both ATS and recruiters
                        who spend an average of 6-7 seconds on initial review.
                      </p>
                    </div>

                    {analysis.rebuild_roadmap.keyword_gaps.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-foreground">Missing Keywords in Your Resume</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {analysis.rebuild_roadmap.keyword_gaps.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="bg-destructive/10 text-destructive">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === "rebuild" && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground">Resume Rebuild Guide</h2>
                  <p className="mt-2 text-muted-foreground">
                    Before and after examples with explanations.
                  </p>

                  <div className="mt-6 space-y-8">
                    {rebuildSections.map((item, index) => (
                      <div key={index} className="border-b border-border pb-6 last:border-0">
                        <h3 className="font-semibold text-foreground">{item.section}</h3>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                            <p className="mb-2 text-xs font-medium text-destructive">Before</p>
                            <p className="text-sm text-muted-foreground">{item.before}</p>
                          </div>
                          <div className="rounded-lg border border-success/20 bg-success/5 p-4">
                            <p className="mb-2 text-xs font-medium text-success">After</p>
                            <p className="text-sm text-muted-foreground">{item.after}</p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-lg bg-secondary/50 p-4">
                          <p className="text-xs font-medium text-muted-foreground">
                            AI Explanation
                          </p>
                          <p className="mt-1 text-sm text-foreground">{item.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "action" && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground">Action Plan</h2>
                  <p className="mt-2 text-muted-foreground">
                    Prioritized steps to improve your resume.
                  </p>

                  <div className="mt-6 space-y-3">
                    {actionItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-lg border border-border p-4"
                      >
                        <div
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                            item.priority === "high"
                              ? "bg-destructive/10 text-destructive"
                              : item.priority === "medium"
                              ? "bg-warning/10 text-warning"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-foreground">{item.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {item.timeframe}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
