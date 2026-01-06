import { motion } from "framer-motion";
import { Upload, FileSearch, XCircle, BarChart3, Eye, CheckCircle } from "lucide-react";

const pipelineSteps = [
  {
    icon: Upload,
    label: "Upload",
    description: "Resume enters the system",
  },
  {
    icon: FileSearch,
    label: "Parse",
    description: "ATS extracts data fields",
  },
  {
    icon: XCircle,
    label: "Knockouts",
    description: "Binary filters eliminate",
  },
  {
    icon: BarChart3,
    label: "Ranking",
    description: "Candidates scored & ordered",
  },
  {
    icon: Eye,
    label: "Human Skim",
    description: "6-15 second review",
  },
];

const hiremaxBullets = [
  "Detects silent auto-rejects",
  "Measures ATS survivability + recruiter signal",
  "Optimizes for machines and human skim",
];

export function ScreeningPipeline() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Where Resumes Actually Get Filtered Out
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Most resumes fail inside systems — not because of formatting.
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          {/* Desktop Pipeline */}
          <div className="hidden md:flex items-center justify-between relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/50 via-accent to-accent/50 -translate-y-1/2 opacity-30" />
            
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-colors ${
                  index === 2 
                    ? 'bg-destructive/10 border-destructive/30 text-destructive' 
                    : 'bg-card border-border text-muted-foreground hover:border-accent/50 hover:text-accent'
                }`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="mt-3 text-sm font-medium text-foreground">{step.label}</span>
                <span className="mt-1 text-xs text-muted-foreground text-center max-w-[100px]">
                  {step.description}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pipeline */}
          <div className="md:hidden space-y-4">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                  index === 2 
                    ? 'bg-destructive/10 border-destructive/30 text-destructive' 
                    : 'bg-card border-border text-muted-foreground'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">{step.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">{step.description}</span>
                </div>
                {index < pipelineSteps.length - 1 && (
                  <div className="w-px h-8 bg-border absolute left-5 mt-12" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* HireMax AI Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 rounded-xl border border-accent/20 bg-accent/5"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                HireMax AI analyzes resumes inside this pipeline — not after it.
              </p>
              <ul className="space-y-2">
                {hiremaxBullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
