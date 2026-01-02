import { motion } from "framer-motion";
import {
  Gauge,
  Signal,
  Target,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Zap,
  LineChart,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "ATS Score",
    description: "Precise compatibility rating with major applicant tracking systems. Know if your resume will even be seen.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Signal,
    title: "Content Signal Strength",
    description: "Measures how effectively your achievements communicate value to both algorithms and humans.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Role Reality Index",
    description: "How well your profile actually matches your target roles based on real market requirements.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: AlertTriangle,
    title: "Failure Cause Breakdown",
    description: "Specific, actionable reasons why your resume is being rejected. No guessing, just facts.",
    gradient: "from-red-500 to-rose-500",
  },
  {
    icon: TrendingUp,
    title: "Market Fit Analysis",
    description: "Your positioning against current hiring trends, salary expectations, and competitive candidates.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: ShieldCheck,
    title: "Experience Credibility",
    description: "Assessment of how believable and impactful your experience appears to hiring managers.",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Skill Gap Intelligence",
    description: "Critical skills missing from your profile that your target roles consistently require.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: LineChart,
    title: "Career Trajectory",
    description: "Projection of your career direction based on experience progression and market dynamics.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export function FeaturesGrid() {
  return (
    <section id="intelligence-layers" className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.05),transparent_70%)]" />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Complete Analysis
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            8 Intelligence Layers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't just check spelling. Our AI performs deep analysis across
            every dimension that matters to your job search success.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative p-6 rounded-2xl border border-border bg-card hover:bg-card/80 hover:border-accent/30 transition-all duration-300"
            >
              {/* Icon with gradient */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
