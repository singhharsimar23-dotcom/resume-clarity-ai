import { Brain, Shield, Target, Users } from "lucide-react";

const indicators = [
  {
    icon: Brain,
    text: "AI-powered resume diagnostics",
  },
  {
    icon: Shield,
    text: "ATS & market signal aware",
  },
  {
    icon: Target,
    text: "No guarantees. Just clarity.",
  },
  {
    icon: Users,
    text: "Used during real hiring cycles",
  },
];

export function TrustIndicators() {
  return (
    <section className="border-y border-border bg-secondary/30 py-8">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex items-center gap-2 text-muted-foreground">
              <indicator.icon className="h-4 w-4" />
              <span className="text-sm">{indicator.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
