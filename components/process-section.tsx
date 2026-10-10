"use client";

import { useEffect, useState } from "react";

const processSteps = [
  { step: "01", title: "Discovery", desc: "Deep dive into requirements, user pain points, and technical constraints through collaborative research." },
  { step: "02", title: "Architecture", desc: "Design robust system architecture with scalability, performance, and maintainability as core principles." },
  { step: "03", title: "Development", desc: "Iterative development with clean code practices, continuous integration, and automated testing." },
  { step: "04", title: "Deployment", desc: "Zero-downtime deployments with comprehensive monitoring, logging, and performance optimization." },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="process" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--paper)]/80 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-[var(--line)]/20 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] border border-[var(--line)]/30 rounded-full" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            <span className="text-[var(--ink)]">Process</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--line)] to-transparent mx-auto rounded-full" />
        </div>
        
        <div className="grid lg:grid-cols-4 gap-4">
          {processSteps.map((item, index) => (
            <div
              key={item.step}
              className={`relative p-6 rounded-2xl transition-all duration-700 group ${
                activeStep === index
                  ? "bg-white/90 backdrop-blur-sm border border-[var(--line)] shadow-lg scale-105"
                  : "bg-white/40 backdrop-blur-sm border border-[var(--line)]/40 hover:bg-white/70"
              }`}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Step number */}
              <div className="absolute top-0 right-4 text-6xl font-mono text-[var(--line)]/30 group-hover:text-[var(--line)]/50 transition-colors">
                {item.step}
              </div>
              
              {/* Step content */}
              <h3 className="text-xl font-medium text-[var(--ink)] mb-3 mt-4">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--ink)]/70 leading-relaxed">
                {item.desc}
              </p>
              
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--line)]/20 rounded-b-2xl overflow-hidden">
                <div
                  className="h-full bg-[var(--ink)] transition-all duration-500"
                  style={{ width: activeStep === index ? "100%" : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
