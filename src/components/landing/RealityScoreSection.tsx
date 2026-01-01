import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";

export function RealityScoreSection() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Score visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 blur-3xl" />
              
              {/* Main score circle */}
              <div className="relative bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* Locked overlay */}
                <div className="absolute inset-0 rounded-3xl bg-background/60 backdrop-blur-md flex flex-col items-center justify-center z-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="p-4 rounded-full bg-accent/10 border border-accent/30 mb-4"
                  >
                    <Lock className="h-8 w-8 text-accent" />
                  </motion.div>
                  <p className="text-lg font-medium text-foreground mb-2">Reality Score Locked</p>
                  <p className="text-sm text-muted-foreground text-center px-4">
                    Sign up to unlock your personalized score
                  </p>
                </div>

                {/* Score display (blurred behind lock) */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        whileInView={{ strokeDashoffset: 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-foreground blur-sm">??</span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 w-full text-center opacity-50 blur-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">ATS</p>
                      <p className="text-lg font-semibold">--</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Content</p>
                      <p className="text-lg font-semibold">--</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Market</p>
                      <p className="text-lg font-semibold">--</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Flagship Feature
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Reality Score
              <span className="block text-muted-foreground">Changes Everything</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              This isn't another generic resume score. Your Reality Score combines
              ATS compatibility, content signal strength, market positioning, and
              credibility analysis into one clear number that tells you exactly
              where you stand.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Weighted across 8 analysis dimensions",
                "Updated in real-time as you improve",
                "Benchmarked against successful applications",
                "Actionable breakdown of every factor",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg rounded-xl"
            >
              <Link to="/auth">
                Unlock My Score
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
