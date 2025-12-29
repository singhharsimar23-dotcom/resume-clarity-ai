import { Upload, Cpu, Unlock } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload your resume",
    description: "Drop your PDF or Word document. We support all common formats.",
  },
  {
    icon: Cpu,
    title: "AI analyzes hiring signals",
    description: "Our system scans for market patterns, ATS compatibility, and content strength.",
  },
  {
    icon: Unlock,
    title: "Unlock your rebuild roadmap",
    description: "Get specific, actionable guidance to fix what's holding you back.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps to understand why you're getting filtered.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <step.icon className="h-6 w-6" />
              </div>

              <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {index + 1}
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
