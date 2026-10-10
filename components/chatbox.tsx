"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; text: string };

const SYSTEM_PROMPT = `You are Aayush Patil, a passionate Full Stack Developer from Pune, Maharashtra. Your personality is warm, confident, and naturally witty - like chatting with a knowledgeable friend over chai. 

ANSWER STYLE:
- Keep replies conversational but informative - like explaining code to a colleague
- Inject Pune/local flavour when natural (mention the city, local references)
- Use phrases like "So basically...", "Here's the thing...", "Quick story..."
- Be encouraging and enthusiastic about technology

PROJECT-RELATED QUESTIONS (Medium Blog Clone, Paytm Web App):
- Dive deep into the technical challenges and solutions
- Speak with genuine passion and pride about your work
- Explain architecture decisions, trade-offs, and lessons learned
- Match this tone: "Absolutely! The Medium project was a blast to build. We went with Express + Prisma because...", "The Paytm clone pushed my limits - the payment integration was tricky..."
- Use active voice and specific technical terms

GENERIC QUESTIONS:
- Keep it light and friendly
- Mention your background naturally (B.Tech CSE Cyber Security, G H Raisoni College)
- Guide conversations back to your work when relevant

BACKGROUND (share naturally when relevant):
- B.Tech in CSE Cyber Security from G H Raisoni College, Pune (CGPA 8.24)
- Published Quantum ML research with Springer
- Rank 1 in Amravati Quantum Valley Hackathon
- Build scalable, user-centric web apps
- Skills: React, Next.js, Express, TypeScript, PostgreSQL, MongoDB, Prisma, Tailwind, JWT, NextAuth`;

const LOCAL_RESPONSES: Record<string, string> = {
  default: "Hey! I'm Aayush from Pune. I'm currently building cool stuff with React and Next.js. What's on your mind?",
  projects: "I've got a few projects I'm really proud of. The Medium Blog Clone was my deep dive into Express, Prisma, and PostgreSQL - we built it with Zod for validation and went all-in on type safety. The Paytm Web-App is where I really flexed my Next.js muscles with NextAuth for auth, Prisma for DB, and Tailwind for that clean UI. And there's the Social Media Engagement Bot - a Python/Selenium automation tool. Happy to walk you through any of them! Which interests you more?",
  skills: "I live and breathe React/Next.js, but I've got other tricks up my sleeve too. Express for APIs, PostgreSQL/MongoDB with Prisma as ORM, TailwindCSS for modern UIs, and I've got JWT/NextAuth for authentication. Oh, and I'm into Cloudflare Workers for edge functions and Python for automation. What specifically do you want to dive into?",
  research: "Quantum Machine Learning isn't my day job, but it's one of my passions! I published a paper on Fruit Crop Disease Classification using QML with Springer. It's wild seeing how quantum algorithms can actually help with image classification. The intersection of tech and agriculture is fascinating! Want to hear about the methodology?",
  hackathon: "The Amravati Quantum Valley Hackathon was intense - Rank 1 among 15 teams competing. It was the perfect blend of coding and experimentation. The finals had some mind-bending challenges, but our team nailed it with our quantum-inspired approach. High energy, 36-hour marathons, and incredible results!",
  education: "I just wrapped up B.Tech CSE Cyber Security at G H Raisoni College in Pune with a CGPA of 8.24. Before that, I was in HSC with 78.17% - not too shabby! Cyber security really sparked my curiosity, and now I'm building full-stack web apps that just work seamlessly. The blend of security and development is my sweet spot.",
  contact: "You've got me! Reach out anytime: +91 87675 41912 or patilaayush145@gmail.com. I'm based in Pune and always up for a good tech chat or collaboration opportunity. Let's connect!",
  github: "You can find me at github.com/dexter980. I've got my Medium Blog Clone, Paytm Web-App, and Social Media Engagement Bot repos there. Feel free to check them out or drop a star if you like what you see!",
  resume: "I've got my resume right there on the site - click the 'Download Resume' button in the About section. It covers my B.Tech at G H Raisoni College, my quantum ML research, hackathon wins, and all the projects I've built. Let me know if you want to chat about any of it!",
};

function findLocalResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("project")) return LOCAL_RESPONSES.projects;
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) return LOCAL_RESPONSES.skills;
  if (lower.includes("research") || lower.includes("quantum") || lower.includes("ml") || lower.includes("machine learning")) return LOCAL_RESPONSES.research;
  if (lower.includes("hackathon") || lower.includes("competition") || lower.includes("award")) return LOCAL_RESPONSES.hackathon;
  if (lower.includes("education") || lower.includes("college") || lower.includes("b.tech") || lower.includes("degree")) return LOCAL_RESPONSES.education;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("phone")) return LOCAL_RESPONSES.contact;
  if (lower.includes("github") || lower.includes("repo") || lower.includes("source")) return LOCAL_RESPONSES.github;
  if (lower.includes("resume") || lower.includes("cv")) return LOCAL_RESPONSES.resume;
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return "Hey there! What's on your mind?";
  if (lower.includes("who are you") || lower.includes("about you") || lower.includes("your background")) return "I'm Aayush Patil, a Full Stack Developer from Pune. I love building things with React, Next.js, and modern web tech. Ask me anything!";
  return LOCAL_RESPONSES.default;
}

export default function Chatbox({ open, onClose }: { open: boolean; onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hey! I'm Aayush. Ask me about my projects, skills, or anything else!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    if (!open) return;
    const handleScroll = () => {
      if (window.scrollY > 0 && window.innerWidth >= 768) {
        onClose?.();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const callAPI = async (userMessage: string): Promise<string> => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          ...messages.map((m) => ({ role: m.role, content: m.text })),
          { role: "user", content: userMessage },
        ],
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (res.status === 429 || data.error === "QUOTA_EXCEEDED") {
        return data.message || "I've hit my daily limit! Reach me at patilaayush145@gmail.com or github.com/dexter980 🙌";
      }
      throw new Error(data.error || "API_ERROR");
    }
    const data = await res.json();
    return data.reply?.trim() || findLocalResponse(userMessage);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);
    try {
      const reply = await callAPI(text);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: findLocalResponse(text) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:right-6 sm:left-auto sm:w-[400px] z-50 max-h-[calc(100vh-var(--top,0px)-2rem)] sm:max-h-[640px] flex flex-col rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--line)] shadow-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--line)] bg-white/80">
        <div className="w-9 h-9 rounded-full bg-[var(--ink)] flex items-center justify-center text-white font-semibold text-sm">AP</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--ink)]">Aayush Patil</div>
          <div className="text-xs text-green-600">Online</div>
        </div>
        <button onClick={() => onClose?.()} className="text-[var(--ink)]/60 hover:text-[var(--ink)] text-xs font-medium px-2 py-1 rounded-lg hover:bg-[var(--paper)] transition-colors">Close</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[320px] max-h-[calc(100vh-12rem-var(--top,0px))]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${m.role === "user" ? "bg-[var(--ink)] text-white rounded-br-sm" : "bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] rounded-bl-sm"}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-[var(--ink)]/50 animate-pulse">Aayush is typing...</div>}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2 p-3 border-t border-[var(--line)] bg-white/80">
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask me anything..." className="flex-1 px-3 py-2.5 rounded-xl bg-[var(--paper)] border border-[var(--line)] text-sm focus:outline-none focus:border-[var(--ink)] transition-colors" />
        <button onClick={handleSend} className="px-4 py-2.5 bg-[var(--ink)] text-white rounded-xl text-sm font-medium hover:bg-[var(--ink)]/90 transition-colors">Send</button>
      </div>
    </div>
  );
}
