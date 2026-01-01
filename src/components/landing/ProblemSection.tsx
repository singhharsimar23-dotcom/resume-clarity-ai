import { motion } from "framer-motion";
import { XCircle, Eye, Clock, UserX } from "lucide-react";

const problems = [
  {
    icon: XCircle,
    title: "Automated Rejection",
    description: "ATS algorithms eliminate 75% of applications before any human review. Your formatting, keywords, and structure are being parsed by machines that don't understand context.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
  },
  {
    icon: Eye,
    title: "Invisible to Recruiters",
    description: "Even when your resume passes ATS, recruiters spend just 7 seconds scanning it. Without the right signals in the right places, you're skipped.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  },
  {
    icon: Clock,
    title: "Market Timing Blindness",
    description: "You're applying without knowing how the market actually sees your profile. Role trends, skill demand, and competitive positioning are invisible to you.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    icon: UserX,
    title: "Silent Disqualification",
    description: "You never know why you didn't get a callback. Hidden issues in your resume's credibility, gaps, and positioning are silently working against you.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
  },
];

export function ProblemSection() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent dark:from-black/50" />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            The Hidden Reality
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Why Your Applications <span className="text-muted-foreground">Disappear</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The hiring process is designed against you. Here's what's really happening
            to your applications while you wait for a response that never comes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={problem.image}
                  alt={problem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                  <problem.icon className="h-6 w-6 text-destructive" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
