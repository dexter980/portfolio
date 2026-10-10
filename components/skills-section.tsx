"use client";

export default function SkillsSection() {
  const skills = [
    { name: "C++", color: "#00599C", icon: "C++" },
    { name: "JavaScript", color: "#F7DF1E", icon: "JS" },
    { name: "TypeScript", color: "#3178C6", icon: "TS" },
    { name: "React", color: "#61DAFB", icon: "React" },
    { name: "Next.js", color: "#000000", icon: "N" },
    { name: "Express.js", color: "#000000", icon: "EX" },
    { name: "PostgreSQL", color: "#336791", icon: "DB" },
    { name: "MongoDB", color: "#47A248", icon: "MO" },
    { name: "Prisma ORM", color: "#2D3748", icon: "PR" },
    { name: "JWT", color: "#000000", icon: "JW" },
    { name: "NextAuth", color: "#000000", icon: "NA" },
    { name: "Tailwind CSS", color: "#06B6D4", icon: "TW" },
    { name: "Zod", color: "#4B32A3", icon: "ZO" },
    { name: "Cloudflare Workers", color: "#F38020", icon: "CF" },
    { name: "Git", color: "#F05032", icon: "Git" },
    { name: "VS Code", color: "#007ACC", icon: "VS" },
    { name: "Canva", color: "#F16529", icon: "CA" },
    { name: "Kali Linux", color: "#53729C", icon: "KL" },
    { name: "DSA", color: "#FF6F61", icon: "DS" },
    { name: "OOP", color: "#3776AB", icon: "OP" },
  ];

  const categories = [
    {
      name: "Languages",
      items: ["C++", "JavaScript", "TypeScript", "SQL", "MongoDB", "PostgreSQL"]
    },
    {
      name: "Frameworks",
      items: ["React", "Next.js", "Express.js", "NextAuth", "Tailwind CSS"]
    },
    {
      name: "Tools",
      items: ["Git", "VS Code", "Prisma ORM", "Zod", "Cloudflare Workers", "Canva"]
    },
    {
      name: "Concepts",
      items: ["DSA", "OOP", "OS", "CN", "DBMS", "Kali Linux"]
    }
  ];

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            <span className="text-[var(--ink)]">Skills</span>
            <span className="text-[var(--line)]"> & Tools</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--line)] to-transparent mx-auto rounded-full" />
        </div>
        
        <div className="space-y-16">
          {categories.map((category, catIdx) => (
            <div key={category.name}>
              <h3 className="text-3xl font-light text-[var(--ink)] mb-8">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item}
                    className="group relative p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[var(--line)] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-[var(--line)]/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--paper)] flex items-center justify-center">
                        <span className="text-xs font-mono text-[var(--ink)] font-bold">{item.slice(0, 3).toUpperCase()}</span>
                      </div>
                      <span className="text-sm font-medium text-[var(--ink)]">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}