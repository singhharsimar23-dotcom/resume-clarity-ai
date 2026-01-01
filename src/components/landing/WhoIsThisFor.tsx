import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const forYou = [
  "You've applied to 50+ jobs with minimal responses",
  "You're a recent graduate struggling to break in",
  "You're pivoting careers and need to reposition",
  "You want data-driven feedback, not opinions",
  "You're ready to invest time in genuine improvement",
];

const notForYou = [
  "You want magic fixes without any effort",
  "You think resume advice doesn't matter",
  "You're looking for someone to write your resume",
  "You're not willing to iterate and improve",
  "You just want validation, not truth",
];

export function WhoIsThisFor() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Honest Assessment
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Is This <span className="text-muted-foreground">For You?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not for everyone. Here's how to know if this will actually help you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* This is for you */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-success/30 bg-success/5 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-success">
                <Check className="h-5 w-5 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">This is for you if...</h3>
            </div>
            <ul className="space-y-4">
              {forYou.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* This is NOT for you */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-destructive">
                <X className="h-5 w-5 text-destructive-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">This is NOT for you if...</h3>
            </div>
            <ul className="space-y-4">
              {notForYou.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
