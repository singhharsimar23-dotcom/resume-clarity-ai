import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background - Soft gray to graphite */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 via-transparent to-slate-200/60" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Glass panel container */}
          <div className="relative rounded-3xl p-8 md:p-12 lg:p-16">
            {/* Glass background */}
            <div className="absolute inset-0 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/20" />
            
            {/* Content inside glass */}
            <div className="relative z-10 text-center">
              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-sm mb-8"
              >
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-slate-600">Powered by Advanced AI Analysis</span>
              </motion.div>

              {/* Main headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight tracking-tight mb-6">
                Your Resume Is Being
                <span className="block text-slate-600">
                  Silently Rejected
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                98% of resumes fail ATS systems before a human ever sees them.
                Our AI reveals exactly why yours is invisible — and how to fix it.
              </p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-slate-400/20 transition-all hover:shadow-slate-400/30 hover:scale-[1.02]"
                >
                  <Link to="/upload">
                    Analyze My Resume
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-300 bg-white/60 text-slate-700 hover:bg-white/80 hover:border-slate-400 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                >
                  <Link to="/auth">
                    Sign Up Free
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Stats row - outside glass panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-12 pt-8"
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-slate-700">98%</p>
              <p className="text-sm text-slate-500 mt-1">Fail ATS Silently</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-slate-700">7 sec</p>
              <p className="text-sm text-slate-500 mt-1">Average Review Time</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-slate-700">250+</p>
              <p className="text-sm text-slate-500 mt-1">Applications Per Role</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-slate-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
