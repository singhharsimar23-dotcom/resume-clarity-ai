import { motion } from "framer-motion";
import { Brain, Database, Target, Shield } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Our models are trained on patterns from successful applications, ATS systems, and recruiter feedback loops.",
  },
  {
    icon: Database,
    title: "Data-Driven Insights",
    description: "Every recommendation is backed by real hiring data, not opinions or outdated advice from career blogs.",
  },
  {
    icon: Target,
    title: "Market Intelligence",
    description: "We analyze current job market trends, role requirements, and competitive positioning in real-time.",
  },
  {
    icon: Shield,
    title: "No False Promises",
    description: "We tell you the truth about your resume. No fake testimonials, no guaranteed results, just clarity.",
  },
];

export function CredibilitySection() {
  return (
    <section className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Why Trust Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Built on <span className="text-muted-foreground">Logic, Not Hype</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't claim miracle results. We provide systematic analysis that
            helps you understand and fix the real issues in your job search.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl border border-border bg-card"
            >
              <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-4">
                <pillar.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-border bg-card">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/50 border-2 border-card"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by students and professionals worldwide
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
