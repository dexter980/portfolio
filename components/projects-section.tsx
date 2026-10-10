"use client";

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Medium Blog Clone",
      description: "A Medium-like blogging platform with secure user authentication using JWT for login, signup, and session management. Features CRUD operations for blog posts, Zod schema validation for data integrity, and Prisma ORM for efficient PostgreSQL database management.",
      tags: ["Express.js", "Zod", "Prisma", "PostgreSQL", "TypeScript", "JWT", "React"],
      image: "/images/medium.jpg",
      imageClass: "aspect-[4/3]",
      github: "https://github.com/dexter980/medium-blog-clone",
      live: null,
      featured: true
    },
    {
      id: 2,
      title: "Paytm Web-App",
      description: "A full-stack Paytm-inspired app built with Next.js for SSR, API routes, and responsive UI with Tailwind CSS. Features secure authentication with NextAuth (Google, GitHub OAuth), wallet balance display, peer-to-peer payments, and transaction history.",
      tags: ["Next.js", "Next-Auth", "Prisma", "PostgreSQL", "Tailwind CSS"],
      image: "/images/paytm.jpg",
      imageClass: "aspect-[4/3]",
      github: "https://github.com/dexter980/paytm-web-app",
      live: null,
      featured: true
    },
    {
      id: 3,
      title: "Social Media Engagement Bot",
      description: "An automated bot that engages with social media content through intelligent interactions, comments, and reactions. Built with Python and Selenium for browser automation, featuring scheduled posting and analytics tracking.",
      tags: ["Python", "Selenium", "Automation", "Social Media", "Data Analysis"],
      image: "/images/sm.jpg",
      imageClass: "aspect-[4/3]",
      github: "https://github.com/dexter980/Social-Media-Engagement-Bot",
      live: null,
      featured: false
    },
    {
      id: 4,
      title: "Fruit Crop Disease Classification",
      description: "Research paper on classifying fruit crop diseases using Quantum Machine Learning techniques. Published in Springer format. Combines quantum computing concepts with ML for agricultural disease detection.",
      tags: ["Quantum ML", "Python", "TensorFlow", "Research", "Springer"],
      image: "/images/quantum.jpg",
      imageClass: "aspect-[4/3]",
      github: null,
      live: null,
      featured: false
    }
  ];

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 tech-grid opacity-15" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            <span className="text-[var(--ink)]">Work</span>
            <span className="text-[var(--line)]"> & Projects</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--line)] to-transparent mx-auto rounded-full" />
        </div>
        
<div className="space-y-16">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`relative group grid grid-cols-1 gap-8 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-[var(--line)] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                  project.featured
                    ? "border-2 border-[var(--line)]/50"
                    : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${project.imageClass} rounded-2xl overflow-hidden bg-[var(--paper)]`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper)]/80 to-transparent pointer-events-none" />
                </div>
                
                {/* Content */}
                <div className="space-y-5">
                  <h3 className="text-xl sm:text-2xl font-light text-[var(--ink)]">
                    {project.title}
                  </h3>
                  <p className="text-[var(--ink)]/70 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--line)]/20 text-[var(--ink)]/80 border border-[var(--line)]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="pill flex-1 text-center py-3"
                      >
                        GitHub Source
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="pill flex-1 text-center py-3 border border-[var(--ink)]/30 hover:bg-[var(--ink)]/5"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}