import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-8"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent font-medium">Start Your Analysis Today</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Stop Wondering.
            <span className="block text-muted-foreground">Start Knowing.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Your next application could be different. Get the clarity you need to
            finally break through the noise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-10 py-7 text-lg rounded-xl shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40 hover:scale-105"
            >
              <Link to="/auth">
                Sign Up Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border bg-card text-foreground hover:bg-secondary px-10 py-7 text-lg rounded-xl"
            >
              <Link to="/auth?mode=login">
                Log In
              </Link>
            </Button>
          </div>

          {/* Final trust line */}
          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required • Analysis in under 2 minutes • Full transparency
          </p>
        </motion.div>
      </div>
    </section>
  );
}
