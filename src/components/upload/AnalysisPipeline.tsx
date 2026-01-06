import { motion } from "framer-motion";
import { FileText, Shuffle, Shield, Activity, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisPipelineProps {
  currentStage: number;
  subLabel?: string;
}

const stages = [
  {
    icon: FileText,
    label: "Extracting structured data",
    details: ["Personal info", "Education", "Experience", "Projects", "Skills"],
  },
  {
    icon: Shuffle,
    label: "Normalizing roles, skills, and dates",
    details: ["Converting to internal format"],
  },
  {
    icon: Shield,
    label: "Preparing for ATS & recruiter analysis",
    details: ["Building analysis context"],
  },
  {
    icon: Activity,
    label: "Running screening diagnostics",
    details: ["ATS survivability", "Requirement coverage", "Signal strength", "Role alignment"],
  },
];

export function AnalysisPipeline({ currentStage, subLabel }: AnalysisPipelineProps) {
  const progress = Math.min(((currentStage + 1) / stages.length) * 100, 100);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-4 p-8 bg-card border border-border rounded-2xl shadow-xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Analyzing Your Resume
          </h2>
          <p className="text-sm text-muted-foreground">
            This typically takes 20–40 seconds. Please don't close this page.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const isActive = index === currentStage;
            const isComplete = index < currentStage;
            const isPending = index > currentStage;

            return (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                  isActive
                    ? 'border-accent bg-accent/5'
                    : isComplete
                    ? 'border-success/30 bg-success/5'
                    : 'border-border bg-muted/20'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : isComplete
                    ? 'bg-success/10 text-success'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isComplete ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <stage.icon className={`h-5 w-5 ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    isPending ? 'text-muted-foreground' : 'text-foreground'
                  }`}>
                    {stage.label}
                  </p>
                  {isActive && subLabel && (
                    <p className="text-xs text-accent mt-1">{subLabel}</p>
                  )}
                  {isActive && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {stage.details.map((detail, i) => (
                        <motion.span
                          key={detail}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent"
                        >
                          {detail}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
