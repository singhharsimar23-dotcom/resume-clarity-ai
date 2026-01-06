import { motion } from "framer-motion";
import { XCircle, Eye, Clock, UserX } from "lucide-react";

const problems = [
  {
    icon: XCircle,
    title: "Automated Rejection",
    stat: "75%",
    description: "ATS algorithms eliminate applications before human review",
  },
  {
    icon: Eye,
    title: "Invisible to Recruiters",
    stat: "7s",
    description: "Average time recruiters spend scanning each resume",
  },
  {
    icon: Clock,
    title: "Market Blindness",
    stat: "0%",
    description: "Visibility into how the market sees your profile",
  },
  {
    icon: UserX,
    title: "Silent Disqualification",
    stat: "?",
    description: "Hidden issues working against you without feedback",
  },
];

export function ProblemSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Why Your Applications <span className="text-muted-foreground">Disappear</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            The hiring process is designed against you. Here's what's happening.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-5 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <problem.icon className="h-4 w-4 text-destructive" />
                </div>
                <span className="text-2xl font-bold text-foreground">{problem.stat}</span>
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                {problem.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
