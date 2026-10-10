"use client";

import { useState } from "react";

const strengthIcons = {
  problem: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3 5 7l4 4" />
      <path d="M5 7h6" />
      <path d="M19 21l-4-4-4 4" />
      <path d="M15 17h4" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  ),
  tech: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  team: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  adapt: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
      <path d="M21 12a9 9 0 1 1-3 6.7L21 16" />
      <path d="M21 21v-5h-5" />
    </svg>
  )
};

const achievementIcons = {
  paper: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
      <path d="M9 9h6" />
    </svg>
  ),
  hackathon: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  ),
  presentation: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <path d="M4 21a8 8 0 0 1 16 0" />
      <path d="M18 14l2 2-2 2" />
      <path d="M6 14l-2 2 2 2" />
    </svg>
  ),
};

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("about");
  
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)] via-[var(--paper)] to-transparent" />
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            <span className="text-[var(--ink)]">About</span>
            <span className="text-[var(--line)]"> Me</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--line)] to-transparent mx-auto rounded-full" />
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Profile Section */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Main profile card with glass effect */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-[var(--line)] shadow-lg hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-[var(--line)] rounded-full blur-2xl opacity-30" />
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-[var(--line)] rounded-full blur-xl opacity-40" />
                
                <div className="relative z-10">
                  {/* Avatar image with glass effect */}
                  <div className="w-32 h-32 rounded-2xl overflow-hidden mb-8 shadow-inner ring-1 ring-[var(--line)]">
                    <img
                      src="/images/dex.jpg"
                      alt="Aayush Patil"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-3xl font-light mb-4 text-[var(--ink)]">Aayush Patil</h3>
                  <p className="text-[var(--ink)]/80 font-light leading-relaxed mb-6">
                    I am a Full Stack Developer skilled in React, Next.js, Express.js, and SQL, with strong problem-solving expertise in C++ and DSA. I build scalable, user-centric web applications and integrate marketing strategies to deliver impactful solutions. Passionate about clean code, innovation, and creating technology that bridges technical excellence with business growth.
                  </p>
                  
                   {/* Contact pills */}
                   <div className="flex flex-wrap gap-3">
                     <a href="#contact" className="pill">Available for work</a>
                     <a href="mailto:patilaayush145@gmail.com" className="pill">Email me</a>
                     <a href="/resume.pdf" target="_blank" rel="noreferrer" className="pill">Download Resume</a>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs and Content */}
          <div className="lg:col-span-7">
            {/* Tab navigation */}
            <div className="flex gap-1 mb-8 p-1 rounded-2xl bg-[var(--paper)] w-fit border border-[var(--line)]">
              {[
                { id: "about", label: "About" },
                { id: "education", label: "Education" },
                { id: "strengths", label: "Strengths" },
                { id: "achievements", label: "Achievements" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? 'bg-white text-[var(--ink)] shadow-sm' : 'text-[var(--ink)]/60 hover:text-[var(--ink)] hover:bg-white/50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-[var(--line)] shadow-lg min-h-[300px] transition-all duration-300">
              {activeTab === "about" && (
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[var(--line)] mt-2" />
                    <div>
                      <h4 className="text-xl font-medium mb-2">Full Stack Developer</h4>
                      <p className="text-[var(--ink)]/70 text-sm mb-1">Seeking opportunities | Open to relocation</p>
                      <p className="text-[var(--ink)]/60 text-sm leading-relaxed">
                        I build scalable, user-centric web applications as a Full Stack Developer, bridging technical excellence with business growth through clean code and innovation. Skilled in React, Next.js, Express.js, and SQL, with strong problem-solving expertise in C++ and Data Structures & Algorithms.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[var(--line)] mt-2" />
                    <div>
                      <h4 className="text-xl font-medium mb-2">Tech Stack Focus</h4>
                      <p className="text-[var(--ink)]/70 text-sm mb-1">Frontend & Backend Development</p>
                      <p className="text-[var(--ink)]/60 text-sm leading-relaxed">
                        React, Next.js, Express.js, TypeScript, PostgreSQL, MongoDB, Prisma ORM, JWT Authentication, NextAuth, Cloudflare Workers, Tailwind CSS, Git
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "education" && (
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[var(--line)] mt-2" />
                    <div>
                      <h4 className="text-xl font-medium mb-2">Bachelor of Technology in Computer Science (Cyber Security)</h4>
                      <p className="text-[var(--ink)]/70 text-sm mb-1">G H Raisoni College Of Engineering and Management, Pune | Nov 2022 – June 2026</p>
                      <p className="text-[var(--ink)]/60 text-sm leading-relaxed">
                        CGPA: 8.24 | Specialized in Cyber Security, Full Stack Development, and Quantum Machine Learning research.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[var(--line)] mt-2" />
                    <div>
                      <h4 className="text-xl font-medium mb-2">Senior Secondary Education (HSC)</h4>
                      <p className="text-[var(--ink)]/70 text-sm mb-1">S.M.S Annasaheb P. K. Patil Junior College, Nandurbar | April 2021 – March 2022</p>
                      <p className="text-[var(--ink)]/60 text-sm leading-relaxed">
                        Score: 78.17% | Science stream with Mathematics
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "strengths" && (
                <div className="space-y-4">
                  <p className="text-[var(--ink)]/70 leading-relaxed">
                    Core strengths that drive my approach to software development and problem-solving:
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
<div className="p-4 rounded-2xl bg-[var(--paper)] border border-[var(--line)]/40">
                       <div className="text-xl mb-1 text-[var(--ink)]">{strengthIcons.problem}</div>
                       <div className="text-sm font-medium text-[var(--ink)] mb-1">Problem Solving</div>
                       <div className="text-xs text-[var(--ink)]/60">Analyze complex problems and develop innovative, practical solutions using DSA expertise</div>
                     </div>
                     <div className="p-4 rounded-2xl bg-[var(--paper)] border border-[var(--line)]/40">
                       <div className="text-xl mb-1 text-[var(--ink)]">{strengthIcons.tech}</div>
                       <div className="text-sm font-medium text-[var(--ink)] mb-1">Technical Proficiency</div>
                       <div className="text-xs text-[var(--ink)]/60">Strong expertise in full-stack development, modern frameworks, databases, and APIs</div>
                     </div>
                     <div className="p-4 rounded-2xl bg-[var(--paper)] border border-[var(--line)]/40">
                       <div className="text-xl mb-1 text-[var(--ink)]">{strengthIcons.team}</div>
                       <div className="text-sm font-medium text-[var(--ink)] mb-1">Team Collaboration</div>
                       <div className="text-xs text-[var(--ink)]/60">Effective communicator and team player, experienced in collaborative group projects</div>
                     </div>
                     <div className="p-4 rounded-2xl bg-[var(--paper)] border border-[var(--line)]/40">
                       <div className="text-xl mb-1 text-[var(--ink)]">{strengthIcons.adapt}</div>
                       <div className="text-sm font-medium text-[var(--ink)] mb-1">Adaptability</div>
                       <div className="text-xs text-[var(--ink)]/60">Quick learner with ability to adapt to new technologies and environments efficiently</div>
                     </div>
                  </div>
                </div>
              )}
              
              {activeTab === "achievements" && (
                <div className="space-y-4">
                  <p className="text-[var(--ink)]/70 leading-relaxed">
                    Academic and technical achievements demonstrating research and competitive excellence:
                  </p>
                  <div className="space-y-4 mt-6">
<div className="flex gap-4 p-4 rounded-2xl bg-[var(--paper)] border border-[var(--line)]/40">
                       <div className="text-3xl text-[var(--ink)]">{achievementIcons.paper}</div>
                       <div>
                         <h5 className="text-base font-medium text-[var(--ink)]">Published Research Paper</h5>
                         <p className="text-sm text-[var(--ink)]/70 mt-1">
                           "Fruit Crop Disease Classification using Quantum Machine Learning" — Published in Springer format
                         </p>
                       </div>
                     </div>
                     <div className="flex gap-4 p-4 rounded-2xl bg-[var(--paper)] border border-[var(--line)]/40">
                       <div className="text-3xl text-[var(--ink)]">{achievementIcons.hackathon}</div>
                       <div>
                         <h5 className="text-base font-medium text-[var(--ink)]">Amravati Quantum Valley Hackathon</h5>
                         <p className="text-sm text-[var(--ink)]/70 mt-1">
                           Secured Rank 1 in college-level internal presentation; team selected for finals among 15 competing teams
                         </p>
                       </div>
                     </div>
                     <div className="flex gap-4 p-4 rounded-2xl bg-[var(--paper)] border border-[var(--line)]/40">
                       <div className="text-3xl text-[var(--ink)]">{achievementIcons.presentation}</div>
                       <div>
                         <h5 className="text-base font-medium text-[var(--ink)]">College-Level Presentation</h5>
                         <p className="text-sm text-[var(--ink)]/70 mt-1">
                           Rank 1 in internal presentation competition for Quantum ML research project
                         </p>
                       </div>
                     </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}