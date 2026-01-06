import { motion } from "framer-motion";

const typicalToolsLabels = [
  "Formatting",
  "Templates",
  "Keyword tips",
  "Generic AI suggestions",
];

const hiremaxLabels = [
  "ATS survivability",
  "Knockout detection",
  "Evidence scoring",
  "Recruiter skim modeling",
];

export function ToolsComparison() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Where Resume Tools Operate
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Other tools sit outside the system. HireMax operates inside it.
          </p>
        </motion.div>

        {/* System Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          {/* Main Pipeline */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            {/* Pipeline Header */}
            <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wide mb-6">
              <span>Candidate</span>
              <span className="hidden md:block">→</span>
              <span>ATS</span>
              <span className="hidden md:block">→</span>
              <span>Filters</span>
              <span className="hidden md:block">→</span>
              <span>Ranking</span>
              <span className="hidden md:block">→</span>
              <span>Recruiter</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-6" />

            {/* Two Zones */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Zone A - Typical Tools */}
              <div className="p-5 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                  <span className="text-sm font-medium text-muted-foreground">Typical Resume Tools</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Operates outside the pipeline</p>
                <div className="flex flex-wrap gap-2">
                  {typicalToolsLabels.map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1.5 text-xs rounded-md bg-muted text-muted-foreground border border-border"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Zone B - HireMax AI */}
              <div className="p-5 rounded-lg border border-accent/30 bg-accent/5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium text-foreground">HireMax AI</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Anchored inside ATS → Filters → Ranking</p>
                <div className="flex flex-wrap gap-2">
                  {hiremaxLabels.map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1.5 text-xs rounded-md bg-accent/10 text-accent border border-accent/20"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
