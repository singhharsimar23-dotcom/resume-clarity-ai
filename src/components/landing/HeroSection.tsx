import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileSearch, TrendingDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Applied everywhere.
            <br />
            <span className="text-muted-foreground">Got silence. Here's why.</span>
          </h1>

          <p className="animate-fade-in stagger-1 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground opacity-0 md:text-xl">
            Our AI scores your resume against today's hiring market and explains exactly why it
            fails — and how to rebuild it.
          </p>

          <div className="animate-fade-in stagger-2 mt-10 flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/upload">
                Check My Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-secondary" size="lg">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="animate-fade-in stagger-3 mx-auto mt-16 max-w-2xl opacity-0">
          <div className="relative rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <FileSearch className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">resume_final_v3.pdf</p>
                  <p className="text-xs text-muted-foreground">AI Analysis Complete</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">Critical</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <div className="relative">
                <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 100 100">
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
                    strokeDashoffset="178"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">29</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-xs text-muted-foreground">ATS Score</p>
                <p className="text-sm font-semibold text-destructive">2/20</p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-xs text-muted-foreground">Content</p>
                <p className="text-sm font-semibold text-warning">14/40</p>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Market Signal Scan Active
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>
    </section>
  );
}
