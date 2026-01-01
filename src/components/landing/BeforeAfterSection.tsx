import { motion } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";

export function BeforeAfterSection() {
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
            Transformation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            It's Not About <span className="text-muted-foreground">Formatting</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The difference between getting callbacks and getting ignored isn't fonts or colors.
            It's positioning, signal clarity, and strategic communication.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-4 left-4 px-4 py-1 bg-destructive text-destructive-foreground text-sm font-medium rounded-full">
              Before
            </div>
            <div className="rounded-2xl border-2 border-destructive/30 bg-card overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80"
                alt="Before transformation"
                className="w-full h-48 object-cover opacity-60"
              />
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    "Generic job descriptions",
                    "Missing quantified achievements",
                    "Poor keyword optimization",
                    "Weak positioning signals",
                    "No market awareness",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Interview Rate</span>
                    <span className="text-lg font-bold text-destructive">2%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-4 left-4 px-4 py-1 bg-success text-success-foreground text-sm font-medium rounded-full">
              After
            </div>
            <div className="rounded-2xl border-2 border-success/30 bg-card overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80"
                alt="After transformation"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    "Impact-focused bullet points",
                    "Quantified results and metrics",
                    "ATS-optimized keywords",
                    "Clear value proposition",
                    "Market-aligned positioning",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Interview Rate</span>
                    <span className="text-lg font-bold text-success">34%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Arrow in the middle for large screens */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-accent text-white shadow-xl shadow-accent/30"
        >
          <ArrowRight className="h-6 w-6" />
        </motion.div>
      </div>
    </section>
  );
}
