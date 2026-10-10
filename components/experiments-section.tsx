"use client";

import { useState } from "react";

const experiments = [
  {
    id: 1,
    title: "Quantum ML Research",
    description: "Published research paper titled 'Fruit Crop Disease Classification using Quantum Machine Learning' in Springer format. Explores quantum computing techniques for agricultural disease detection.",
    tags: ["Quantum ML", "Python", "TensorFlow", "Research", "Springer"],
    status: "Published"
  },
  {
    id: 2,
    title: "Hackathon Achievement",
    description: "Secured Rank 1 in college-level internal presentation and got our team selected for the finals of Amravati Quantum Valley Hackathon, competing among 15 teams.",
    tags: ["Quantum Computing", "Competition", "Team Collaboration", "Leadership"],
    status: "Awarded"
  },
  {
    id: 3,
    title: "Internal Presentation",
    description: "Ranked 1 in college-level internal presentation competition for Quantum Machine Learning research project, demonstrating technical communication and research findings.",
    tags: ["Research", "Presentation", "Quantum ML", "Technical Communication"],
    status: "Completed"
  }
];

const statusConfig = {
  Published: { color: "green" },
  Awarded: { color: "yellow" },
  Completed: { color: "blue" }
};

export default function ExperimentsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", "active", "experimental", "awarded"];

  const filteredExperiments = activeFilter === "all"
    ? experiments
    : experiments.filter((exp) => {
        if (activeFilter === "awarded") return exp.status === "Awarded";
        return exp.status !== "Published";
      });

  const statusColor = (status: string) => {
    const c = statusConfig[status as keyof typeof statusConfig];
    if (c?.color === "green") return "bg-green-100 text-green-700 border-green-200";
    if (c?.color === "yellow") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (c?.color === "blue") return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-purple-100 text-purple-700 border-purple-200";
  };

  const statusIcon = (status: string) => {
    const common = 'w-5 h-5 text-current';
    if (status === "Published") {
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6" />
          <path d="M9 17h6" />
        </svg>
      );
    }
    if (status === "Awarded") {
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      );
    }
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
      </svg>
    );
  };

  return (
    <section id="experiments" className="relative py-32 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--paper)] via-transparent to-[var(--paper)] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            <span className="text-[var(--ink)]">Experiments</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--line)] to-transparent mx-auto rounded-full" />
        </div>
        
        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-[var(--ink)] text-white shadow-lg scale-105"
                  : "bg-white/80 backdrop-blur-sm border border-[var(--line)] text-[var(--ink)]/70 hover:bg-white hover:shadow-md"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Experiments grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiments.map((exp) => (
            <div
              key={exp.id}
              className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-[var(--line)] shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-[var(--line)]/60"
            >
{/* Status badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor(exp.status)}`}>
                  {exp.status}
                </span>
              </div>
              
              {/* Icon */}
              <div className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-110">
                {statusIcon(exp.status)}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-light text-[var(--ink)] mb-3">
                {exp.title}
              </h3>
              <p className="text-[var(--ink)]/70 text-sm leading-relaxed mb-6">
                {exp.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md text-xs font-medium bg-[var(--paper)] text-[var(--ink)]/70 border border-[var(--line)]/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}