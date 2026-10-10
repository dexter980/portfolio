"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Chatbox from "@/components/chatbox";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;
const GITHUB = "https://github.com/dexter980";
const LINKS = ["About", "Work", "Process", "Experiments", "Contact"];

export default function GlassHero() {
  const [chatOpen, setChatOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const raw = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const radius = useRef(0);
  const target = useRef(0);
  const touching = useRef(false);
  const frame = useRef(0);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const tick = useCallback(() => {
    const el = heroRef.current;
    if (!el) {
      frame.current = 0;
      return;
    }
    const reduce = reduceRef.current;
    const pf = reduce ? 1 : 0.14;
    const rf = reduce ? 1 : 0.12;
    smooth.current.x += (raw.current.x - smooth.current.x) * pf;
    smooth.current.y += (raw.current.y - smooth.current.y) * pf;
    radius.current += (target.current - radius.current) * rf;

    const settled =
      Math.abs(raw.current.x - smooth.current.x) < 0.1 &&
      Math.abs(raw.current.y - smooth.current.y) < 0.1 &&
      Math.abs(target.current - radius.current) < 0.1;
    if (settled) {
      smooth.current.x = raw.current.x;
      smooth.current.y = raw.current.y;
      radius.current = target.current;
    }

    el.style.setProperty("--reveal-x", `${smooth.current.x}px`);
    el.style.setProperty("--reveal-y", `${smooth.current.y}px`);
    el.style.setProperty("--reveal-radius", `${radius.current}px`);

    frame.current = settled ? 0 : requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, []);

  const setPoint = (e: ReactPointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    raw.current.x = e.clientX - rect.left;
    raw.current.y = e.clientY - rect.top;
    // When the reveal is closed, open it at the pointer instead of sweeping in from off-screen.
    if (radius.current < 1) {
      smooth.current.x = raw.current.x;
      smooth.current.y = raw.current.y;
    }
  };

  const onPointerEnter = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    setPoint(e);
    target.current = DESKTOP_RADIUS;
    start();
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") {
      setPoint(e);
      target.current = DESKTOP_RADIUS;
      start();
    } else if (touching.current) {
      setPoint(e);
      start();
    }
  };

  const onPointerLeave = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    target.current = 0;
    start();
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") return;
    // Let taps on links and buttons behave normally.
    if ((e.target as Element).closest("a")) return;
    touching.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture not supported */
    }
    setPoint(e);
    target.current = MOBILE_RADIUS;
    start();
  };

  const onPointerEnd = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") return;
    touching.current = false;
    target.current = 0;
    start();
  };

  return (
    <main>
      <section
        ref={heroRef}
        className="hero"
        aria-label="Introduction"
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div className="portrait-stack" aria-hidden="true">
          <div className="layer base-layer" />
          <div className="layer reveal-layer" />
        </div>

        <div className="tech-grid" aria-hidden="true">
          <span className="tech-circle" />
        </div>

        <div className="copy">
          <h1 className="title">
            <span>Building</span>
            <span>Beyond</span>
            <span>Possible</span>
          </h1>
          <div className="intro">
<p>
            I build scalable, user-centric web applications as a Full Stack Developer, bridging technical excellence with business growth through clean code and innovation.
          </p>
            <a className="pill" href={GITHUB} target="_blank" rel="noreferrer">
              Explore my work
            </a>
          </div>
          <p className="tagline mono">
            <span>BUILDING THE</span>
            <span>NEXT VERSION</span>
            <span>OF SOFTWARE</span>
          </p>
        </div>

        <header className="site-header">
          <nav className="nav" aria-label="Primary">
            <a className="brand mono" href="#" aria-label="Aayush Patil, home">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M4.5 23 13 5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M16.5 12.5 23.5 23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M8.5 17.5h9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="18.5" cy="6.5" r="1.9" fill="currentColor" />
              </svg>
              <span>AAYUSH PATIL</span>
            </a>
            <div className="nav-right">
              <ul className="nav-links mono">
                {LINKS.map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`}>{l}</a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-0.75rem w-full">
                <button
                  onClick={() => setChatOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--ink)] text-white rounded-full shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm font-medium"
                  aria-label="Open chat"
                >
                  <span className="text-base">💬</span>
                  Let's talk
                </button>
              </div>
            </div>
          </nav>
        </header>
        <Chatbox open={chatOpen} onClose={() => setChatOpen(false)} />
      </section>
    </main>
  );
}
