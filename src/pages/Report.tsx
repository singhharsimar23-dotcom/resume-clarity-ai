import { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "summary", label: "Summary", icon: FileText },
  { id: "failures", label: "Failure Causes", icon: AlertTriangle },
  { id: "market", label: "Market Reality", icon: TrendingUp },
  { id: "rebuild", label: "Resume Rebuild", icon: Wrench },
  { id: "action", label: "Action Plan", icon: CheckSquare },
];

const failureCauses = [
  {
    title: "Outdated Hiring Signals",
    description:
      "Your resume uses formatting and language patterns from 2018-2020 that modern ATS systems and recruiters now flag as low-priority. The objective statement format, skills-first layout, and lack of quantified achievements signal inexperience with current hiring expectations.",
    severity: "critical",
  },
  {
    title: "Academic vs. Professional Framing",
    description:
      "Experience is described using academic language ('assisted with', 'participated in', 'learned about') rather than professional impact language ('delivered', 'increased', 'reduced'). This signals you haven't transitioned to workplace communication norms.",
    severity: "critical",
  },
  {
    title: "Missing Proof-of-Work",
    description:
      "No projects, GitHub links, or portfolio entries. In 2024+ hiring, especially for entry-level roles, proof-of-work (side projects, open source, certifications) compensates for limited experience. Your resume provides no evidence of initiative.",
    severity: "warning",
  },
  {
    title: "Keyword Mismatch",
    description:
      "Target role keywords appear only 12% of the time across your resume. ATS systems typically require 40-60% keyword match to surface resumes. You're being filtered before any human sees your application.",
    severity: "critical",
  },
];

const rebuildSections = [
  {
    section: "Summary",
    before:
      "Motivated computer science student seeking an entry-level position where I can apply my skills and learn new technologies.",
    after:
      "Software engineer with hands-on experience building full-stack applications using React, Node.js, and PostgreSQL. Delivered 3 production projects including an e-commerce platform processing 500+ daily transactions. Seeking backend-focused roles in fintech or developer tools.",
    explanation:
      "The new summary leads with competency, includes specific tech stack, provides proof (3 production projects), quantifies impact (500+ transactions), and targets specific industries.",
  },
  {
    section: "Experience Bullet",
    before: "Helped the team with various coding tasks and attended weekly meetings.",
    after:
      "Developed automated testing suite that reduced QA cycle time by 40%, enabling faster feature releases across 3 product teams.",
    explanation:
      "Transformed from passive assistance language to active ownership. Added quantified impact (40% reduction), scope (3 teams), and business outcome (faster releases).",
  },
  {
    section: "Skills Section",
    before: "Programming languages: Python, Java, JavaScript. Familiar with databases and web development.",
    after:
      "Technical: Python (3 yrs), TypeScript/React (2 yrs), PostgreSQL, AWS Lambda, Docker. Tools: Git, Jira, Figma. Methodologies: Agile/Scrum, CI/CD, Test-Driven Development.",
    explanation:
      "Added proficiency levels, specific technologies instead of categories, and methodologies that signal professional readiness.",
  },
];

const actionItems = [
  {
    priority: "high",
    title: "Rewrite all experience bullets using CAR format",
    description:
      "Challenge-Action-Result format ensures every bullet demonstrates impact. Spend 2-3 hours converting existing bullets.",
    timeframe: "This week",
  },
  {
    priority: "high",
    title: "Add 2-3 proof-of-work projects",
    description:
      "Create or document personal projects with live links. Even simple CRUD apps with clean code show initiative.",
    timeframe: "2 weeks",
  },
  {
    priority: "medium",
    title: "Run keyword analysis on 5 target job postings",
    description:
      "Extract common requirements and weave them naturally into your resume. Aim for 45%+ keyword match.",
    timeframe: "This week",
  },
  {
    priority: "medium",
    title: "Update formatting to 2024 standards",
    description:
      "Single column, ATS-friendly fonts (Arial/Calibri), clear section headers, no tables or graphics.",
    timeframe: "Today",
  },
  {
    priority: "low",
    title: "Get 2 peer reviews from industry professionals",
    description:
      "Ask developers or hiring managers to review. Fresh eyes catch blind spots you'll miss.",
    timeframe: "Ongoing",
  },
];

export default function ReportPage() {
  const [activeSection, setActiveSection] = useState("summary");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
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
                      This resume scored <strong className="text-destructive">29/100</strong>,
                      placing it in the bottom 15% of resumes analyzed. The primary issues
                      are structural rather than experiential — meaning the underlying
                      experience has potential, but presentation is actively harming your
                      candidacy.
                    </p>
                    <p>
                      Key finding: Your resume is being filtered by ATS systems before
                      reaching human review in approximately 85% of applications. This
                      explains the silence despite volume of applications.
                    </p>
                    <p>
                      Estimated effort to reach 70+ score: <strong className="text-foreground">8-12 hours</strong> of focused
                      revision following this roadmap. Most improvements are one-time
                      investments that compound across all future applications.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-border p-4 text-center">
                      <p className="text-3xl font-bold text-destructive">29</p>
                      <p className="text-sm text-muted-foreground">Current Score</p>
                    </div>
                    <div className="rounded-lg border border-border p-4 text-center">
                      <p className="text-3xl font-bold text-success">72+</p>
                      <p className="text-sm text-muted-foreground">Target Score</p>
                    </div>
                    <div className="rounded-lg border border-border p-4 text-center">
                      <p className="text-3xl font-bold text-foreground">8-12h</p>
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
                          <h3 className="font-semibold text-foreground">{cause.title}</h3>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "ml-auto",
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
                        triggers multiple filter flags.
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
