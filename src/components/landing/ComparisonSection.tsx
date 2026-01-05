import { motion } from "framer-motion";

const comparisons = [
  {
    aspect: "Focus",
    typical: "Formatting, templates, keyword tips",
    hiremax: "Screening systems, elimination logic, recruiter behavior"
  },
  {
    aspect: "Evaluation Method",
    typical: "Generic AI suggestions",
    hiremax: "Rule-based + evidence-driven diagnostics"
  },
  {
    aspect: "Scoring Logic",
    typical: "One-size-fits-all score",
    hiremax: "Job-specific, stage-aware evaluation"
  },
  {
    aspect: "Failure Detection",
    typical: "Surface-level advice",
    hiremax: "Silent auto-reject and knockout detection"
  },
  {
    aspect: "Evidence Standard",
    typical: "Writing quality",
    hiremax: "Action → Scope → Outcome proof"
  },
  {
    aspect: "Underlying Model",
    typical: "Content generation",
    hiremax: "Hiring pipeline simulation"
  }
];

export function ComparisonSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Most Resume Tools Guess. Hiring Systems Don't.
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            HireMax AI simulates how resumes are parsed, filtered, ranked, and rejected inside real hiring pipelines.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-border rounded-lg overflow-hidden"
        >
          {/* Header Row */}
          <div className="grid grid-cols-3 bg-muted/50">
            <div className="p-4 border-r border-border">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Aspect</span>
            </div>
            <div className="p-4 border-r border-border">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Typical Resume Tools</span>
            </div>
            <div className="p-4">
              <span className="text-sm font-medium text-foreground uppercase tracking-wide">HireMax AI</span>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisons.map((row, index) => (
            <div
              key={row.aspect}
              className={`grid grid-cols-3 ${index !== comparisons.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="p-4 border-r border-border bg-muted/30">
                <span className="text-sm font-medium text-foreground">{row.aspect}</span>
              </div>
              <div className="p-4 border-r border-border">
                <span className="text-sm text-muted-foreground">{row.typical}</span>
              </div>
              <div className="p-4 bg-primary/5">
                <span className="text-sm text-foreground">{row.hiremax}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Built around how ATS systems and recruiters actually evaluate resumes — not how resumes look.
        </motion.p>
      </div>
    </section>
  );
}
