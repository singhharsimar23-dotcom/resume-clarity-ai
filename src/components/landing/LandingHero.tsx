import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Video Background - Light, human-focused */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1920&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/5439528/5439528-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Light overlay with soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm mb-8 shadow-sm"
          >
            <Shield className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-slate-700">Powered by Advanced AI Analysis</span>
          </motion.div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            Your Resume Is Being
            <span className="block bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent">
              Silently Rejected
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
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
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-slate-900/10 transition-all hover:shadow-slate-900/20 hover:scale-105"
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
              className="border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-50 hover:border-slate-400 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
            >
              <Link to="/auth">
                Sign Up Free
              </Link>
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-slate-200/60"
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-slate-900">98%</p>
              <p className="text-sm text-slate-500 mt-1">Fail ATS Silently</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-slate-900">7 sec</p>
              <p className="text-sm text-slate-500 mt-1">Average Review Time</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-slate-900">250+</p>
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
