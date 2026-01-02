import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, ArrowRight } from "lucide-react";

const roles = [
  { id: "software", label: "Software Engineer" },
  { id: "data", label: "Data Analyst" },
  { id: "product", label: "Product Manager" },
  { id: "general", label: "General" },
];

const resumeContent: Record<string, {
  name: string;
  title: string;
  summary: string;
  experience: { title: string; company: string; bullets: string[] }[];
  skills: string[];
}> = {
  software: {
    name: "Alex Chen",
    title: "Software Engineer",
    summary: "Full-stack developer with 3+ years building scalable web applications. Experienced in React, Node.js, and cloud infrastructure.",
    experience: [
      {
        title: "Software Engineer",
        company: "TechCorp Inc.",
        bullets: [
          "Developed REST APIs serving 2M+ daily requests",
          "Reduced page load time by 40% through optimization",
          "Led migration from monolith to microservices",
        ],
      },
    ],
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
  },
  data: {
    name: "Jordan Rivera",
    title: "Data Analyst",
    summary: "Data analyst with expertise in transforming complex datasets into actionable business insights using SQL, Python, and visualization tools.",
    experience: [
      {
        title: "Data Analyst",
        company: "Analytics Co.",
        bullets: [
          "Built dashboards tracking $50M revenue pipeline",
          "Automated reporting saving 15 hours weekly",
          "Identified trends increasing retention by 25%",
        ],
      },
    ],
    skills: ["SQL", "Python", "Tableau", "Excel", "Statistical Analysis", "ETL"],
  },
  product: {
    name: "Morgan Blake",
    title: "Product Manager",
    summary: "Product manager with track record of launching B2B SaaS features from ideation to market. User-focused with strong technical background.",
    experience: [
      {
        title: "Product Manager",
        company: "SaaS Startup",
        bullets: [
          "Launched 3 features driving 30% ARR growth",
          "Managed roadmap for 50K+ user product",
          "Reduced churn by 20% through UX research",
        ],
      },
    ],
    skills: ["Roadmapping", "User Research", "Agile", "SQL", "Figma", "Analytics"],
  },
  general: {
    name: "Taylor Morgan",
    title: "Professional",
    summary: "Results-driven professional with experience in project coordination, stakeholder communication, and process improvement.",
    experience: [
      {
        title: "Project Coordinator",
        company: "Corporate Solutions",
        bullets: [
          "Coordinated cross-functional team of 12 members",
          "Delivered 8 projects on time and under budget",
          "Improved team efficiency by 30%",
        ],
      },
    ],
    skills: ["Project Management", "Communication", "Microsoft Office", "Coordination", "Problem Solving"],
  },
};

const features = [
  "Role-first structure based on recruiter scanning behavior",
  "ATS-safe formatting by default (no parsing issues)",
  "Guided bullet prompts enforcing impact and clarity",
  "Language aligned with real job descriptions",
  "Live compatibility checks while building",
];

export function BuildResumeSection() {
  const [activeRole, setActiveRole] = useState("software");
  const content = resumeContent[activeRole];

  return (
    <section id="build-resume" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Build a Resume That's Already ATS-Ready
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-500"
          >
            Start from scratch or rebuild an existing resume using role-specific templates
            designed to match real hiring expectations and pass ATS systems.
          </motion.p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Role Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeRole === role.id
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>

            {/* Resume Preview Card */}
            <div className="bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100" style={{ backgroundColor: '#fafaf9' }}>
                {/* Resume Header */}
                <div className="border-b border-slate-200 pb-4 mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{content.name}</h3>
                  <p className="text-slate-600">{content.title}</p>
                </div>

                {/* Summary */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Summary</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{content.summary}</p>
                </div>

                {/* Experience */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Experience</h4>
                  {content.experience.map((exp, idx) => (
                    <div key={idx}>
                      <p className="text-sm font-semibold text-slate-700">{exp.title}</p>
                      <p className="text-xs text-slate-500 mb-2">{exp.company}</p>
                      <ul className="space-y-1">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-slate-400 mt-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {content.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ATS Badge */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-emerald-600 font-medium">ATS-Optimized Format</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:pl-8"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-6">
              How We Help You Build
            </h3>

            <ul className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl"
              >
                <Link to="/builder/new">
                  Build My Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                <a href="#how-it-works">
                  See How It Works
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
