"use client";

import { useState } from "react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailto = `mailto:patilaayush145@gmail.com?subject=Portfolio Inquiry from ${name || "Guest"}&body=${encodeURIComponent(body)}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 tech-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)] via-transparent to-[var(--paper)] opacity-80" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light mb-4 tracking-tight">
            <span className="text-[var(--ink)]">Contact</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--line)] to-transparent mx-auto rounded-full" />
        </div>
        
        <div className="relative z-10">
          <div className="p-6 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-sm border border-[var(--line)] shadow-lg">
            <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-12">
              {/* Contact Form */}
              <div className="space-y-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block mb-1.5 text-[var(--ink)]/80 font-medium text-sm">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-6 py-3 rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1.5 text-[var(--ink)]/80 font-medium text-sm">
                      Email
                    </label>
                      <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patilaayush145@gmail.com"
                      className="w-full px-6 py-3 rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-1.5 text-[var(--ink)]/80 font-medium text-sm">
                      Message
                    </label>
                      <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can I help you?"
                      className="w-full px-6 py-3 rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] transition-all duration-300 resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-[var(--ink)] text-white rounded-xl font-medium transition-all duration-300 hover:bg-[var(--ink)]/90 hover:-translate-y-1 shadow-lg">
                    {sent ? "✓ Opening email..." : "Send Message"}
                  </button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-5">
                <h3 className="text-2xl sm:text-3xl font-light text-[var(--ink)] mb-3">Get In Touch</h3>
                <p className="text-[var(--ink)]/70 leading-relaxed text-sm sm:text-base">
                  Whether you have a project idea, collaboration opportunity, or just want to say hello, feel free to reach out. I respond to all messages within 24 hours.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                    <svg className="w-5 h-5 text-[var(--line)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-[var(--ink)]/80 text-sm">+91 87675 41912</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                    <svg className="w-5 h-5 text-[var(--line)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M2 12s3-4 10-4 10 4 10 4v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-3z" />
                    </svg>
                    <span className="text-[var(--ink)]/80 text-sm">patilaayush145@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                    <svg className="w-5 h-5 text-[var(--line)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M21 10.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 10.79z" />
                    </svg>
                    <span className="text-[var(--ink)]/80 text-sm">
                      Pune, Maharashtra
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}