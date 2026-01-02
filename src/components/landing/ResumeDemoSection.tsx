import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, CheckCircle, Lock, Info, Gauge } from "lucide-react";
import { useState } from "react";

const insightCards = [
  {
    type: "warning",
    title: "Failure Cause Identified",
    description: "Multi-column formatting reduces ATS readability.",
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
  },
  {
    type: "info",
    title: "Market Reality Insight",
    description: "Target role typically expects 1–2 years of production experience.",
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
  },
  {
    type: "success",
    title: "Strong Signal Detected",
    description: "Quantified impact and API development experience detected.",
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
  },
];

const scoreMetrics = [
  { label: "ATS Survivability", score: 78, potential: 92 },
  { label: "Content Signal Strength", score: 65, potential: 85 },
  { label: "Role Reality Index", score: 72, potential: 88 },
  { label: "Failure Cause Severity", score: 45, potential: 75 },
  { label: "Market Fit Alignment", score: 68, potential: 82 },
  { label: "Experience Credibility", score: 82, potential: 90 },
  { label: "Skill Gap Exposure", score: 55, potential: 78 },
  { label: "Career Trajectory", score: 70, potential: 85 },
];

const resumeLines = [
  { section: "header", content: "Andrew Parker", type: "name", signal: "neutral" },
  { section: "header", content: "Software Engineer", type: "title", signal: "strong" },
  { section: "header", content: "austin, tx • andrewparker@email.com • (512) 555-0147", type: "contact", signal: "neutral" },
  { section: "education", content: "EDUCATION", type: "heading", signal: "neutral" },
  { section: "education", content: "Bachelor of Science in Computer Science", type: "degree", signal: "strong" },
  { section: "education", content: "University of Texas at Austin • 2020 – 2024", type: "school", signal: "neutral" },
  { section: "experience", content: "EXPERIENCE", type: "heading", signal: "neutral" },
  { section: "experience", content: "Junior Software Engineer Intern", type: "role", signal: "strong" },
  { section: "experience", content: "TechStart Fintech • Austin, TX • May 2023 – Aug 2023", type: "company", signal: "neutral" },
  { section: "experience", content: "• Built REST APIs using Node.js and PostgreSQL", type: "bullet", signal: "strong" },
  { section: "experience", content: "• Reduced API response time by 28% through query optimization", type: "bullet", signal: "strong" },
  { section: "experience", content: "• Collaborated with a 5-person engineering team on sprint deliverables", type: "bullet", signal: "warning" },
  { section: "projects", content: "PROJECTS", type: "heading", signal: "neutral" },
  { section: "projects", content: "Resume Analyzer Tool", type: "project", signal: "strong" },
  { section: "projects", content: "React + Python application for parsing and scoring resumes", type: "detail", signal: "neutral" },
  { section: "projects", content: "Campus Event Management System", type: "project", signal: "neutral" },
  { section: "projects", content: "Full-stack web app for university event coordination", type: "detail", signal: "warning" },
  { section: "skills", content: "SKILLS", type: "heading", signal: "neutral" },
  { section: "skills", content: "JavaScript, Python, SQL, Git, REST APIs, Node.js, PostgreSQL, Basic AWS", type: "skillList", signal: "strong" },
];

export function ResumeDemoSection() {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "strong":
        return "bg-emerald-400";
      case "warning":
        return "bg-amber-400";
      case "weak":
        return "bg-red-400";
      default:
        return "bg-slate-300";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            How Your Resume Is Actually Read
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A visual example of how our system analyzes resumes line by line — the same way recruiters and ATS systems do.
          </p>
        </motion.div>

        {/* 3-Column Layout */}
        <div className="grid lg:grid-cols-[280px_1fr_320px] gap-8 items-start">
          {/* LEFT: Insight Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 lg:sticky lg:top-8"
          >
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">
              Live Insights
            </p>
            {insightCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className={`p-4 rounded-xl border ${card.borderColor} ${card.bgColor} shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-start gap-3">
                  <card.icon className={`h-5 w-5 ${card.color} mt-0.5 flex-shrink-0`} />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-1">{card.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CENTER: Resume Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-50 rounded-2xl p-2"
          >
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 md:p-10 relative">
              {/* Resume Content */}
              <div className="space-y-1 font-sans">
                {resumeLines.map((line, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group relative"
                    onMouseEnter={() => setHoveredLine(index)}
                    onMouseLeave={() => setHoveredLine(null)}
                  >
                    {/* Margin Signal Dot */}
                    <div className="w-4 flex-shrink-0 flex justify-center pt-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${getSignalColor(line.signal)} transition-all duration-200 ${
                          hoveredLine === index ? "scale-150" : "scale-100"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 py-1.5 px-2 rounded transition-all duration-200 ${
                        hoveredLine === index
                          ? "bg-slate-50 shadow-sm -translate-y-px"
                          : hoveredLine !== null
                          ? "opacity-60"
                          : ""
                      }`}
                    >
                      {line.type === "name" && (
                        <h3 className="text-2xl font-bold text-slate-900">{line.content}</h3>
                      )}
                      {line.type === "title" && (
                        <p className="text-lg text-slate-700">{line.content}</p>
                      )}
                      {line.type === "contact" && (
                        <p className="text-sm text-slate-500">{line.content}</p>
                      )}
                      {line.type === "heading" && (
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-4 mb-2 border-b border-slate-200 pb-1">
                          {line.content}
                        </h4>
                      )}
                      {line.type === "degree" && (
                        <p className="text-sm font-semibold text-slate-800">{line.content}</p>
                      )}
                      {line.type === "school" && (
                        <p className="text-sm text-slate-600">{line.content}</p>
                      )}
                      {line.type === "role" && (
                        <p className="text-sm font-semibold text-slate-800">{line.content}</p>
                      )}
                      {line.type === "company" && (
                        <p className="text-sm text-slate-600">{line.content}</p>
                      )}
                      {line.type === "bullet" && (
                        <p className="text-sm text-slate-700">{line.content}</p>
                      )}
                      {line.type === "project" && (
                        <p className="text-sm font-medium text-slate-800">{line.content}</p>
                      )}
                      {line.type === "detail" && (
                        <p className="text-sm text-slate-600">{line.content}</p>
                      )}
                      {line.type === "skillList" && (
                        <p className="text-sm text-slate-700">{line.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Section Strength Brackets */}
              <div className="absolute left-2 top-[180px] h-[60px] w-1 rounded-full bg-emerald-200/60" />
              <div className="absolute left-2 top-[260px] h-[120px] w-1 rounded-full bg-amber-200/60" />
              <div className="absolute left-2 top-[400px] h-[80px] w-1 rounded-full bg-slate-200/60" />
            </div>
          </motion.div>

          {/* RIGHT: Reality Score Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
              {/* Score Circle */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 mb-4">
                  {/* Background circle */}
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-slate-100"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${72 * 2.64} ${100 * 2.64}`}
                      strokeLinecap="round"
                      className="text-emerald-500 transition-all duration-1000"
                    />
                  </svg>
                  {/* Score text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900">72</span>
                    <span className="text-xs text-slate-500">/ 100</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-700">Reality Score</p>
                <p className="text-xs text-slate-500">Demo Analysis</p>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">
                  Intelligence Breakdown
                </p>
                {scoreMetrics.map((metric, index) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600">{metric.label}</span>
                      <span className="text-xs font-medium text-slate-800">{metric.score}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                      {/* Potential improvement (dashed) */}
                      <div
                        className="absolute inset-y-0 left-0 bg-slate-200 rounded-full"
                        style={{ width: `${metric.potential}%` }}
                      />
                      <div
                        className="absolute inset-y-0 left-0 bg-slate-300/50 rounded-full border-r border-dashed border-slate-400"
                        style={{ width: `${metric.potential}%` }}
                      />
                      {/* Current score */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                        className={`absolute inset-y-0 left-0 rounded-full ${getScoreColor(metric.score)}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Lock className="h-4 w-4" />
                  <span>Full analysis unlocked on sign up</span>
                </div>
                <button className="w-full py-3 px-4 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors">
                  Analyze Your Resume
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
