# Aayush Patil — Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://portfolio-flame-phi-65.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com/)

> **Full Stack Developer** from Pune, Maharashtra — Building scalable, user-centric web applications with React, Next.js, Express, and modern tooling.

🔗 **Live Portfolio:** [https://portfolio-flame-phi-65.vercel.app/](https://portfolio-flame-phi-65.vercel.app/)

---

## Features

- **Interactive Hero** — Mouse/follow reveal effect with layered portrait animation
- **About Section** — Tabbed interface (About, Education, Strengths, Achievements)
- **Skills** — Categorized tech stack with 25+ technologies
- **Projects** — 4 featured projects with live GitHub links
- **Process** — Animated 4-step development workflow
- **Experiments** — Filterable research & achievement cards
- **Contact** — Functional mailto form + direct contact info
- **Technical Blog** — MDX-style rendering with custom Markdown parser
- **AI Chatbot** — Gemini 3.5 Flash integration with quota handling & smart fallbacks
- **Resume Download** — One-click PDF download
- **Mobile-First Responsive** — Dedicated mobile assets & layouts
- **Single Light Theme** — Clean, professional aesthetic

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 |
| **Backend** | Next.js API Routes, Server-side rendering |
| **AI** | Google Gemini 3.5 Flash (via Generative Language API) |
| **Database/ORM** | Prisma (project experience), PostgreSQL, MongoDB |
| **Auth** | NextAuth, JWT (project experience) |
| **Deployment** | Vercel |

---

## Featured Projects

| Project | Stack | Description |
|---------|-------|-------------|
| **Medium Blog Clone** | Express, Prisma, PostgreSQL, Zod, JWT, React | Type-safe blogging platform with JWT auth, Zod validation, full CRUD |
| **Paytm Web-App** | Next.js, NextAuth, Prisma, Tailwind, PostgreSQL | Full-stack fintech clone with OAuth, wallet, P2P transfers |
| **Social Media Bot** | Python, Selenium, Automation | Browser automation for social engagement, scheduled posting |
| **Quantum ML Research** | Python, TensorFlow, Quantum Computing | Springer-published paper on fruit crop disease classification |

---

## Quick Start

```bash
# Clone & install
git clone https://github.com/dexter980/portfolio.git
cd portfolio
npm install

# Environment variables
cp .env.example .env.local
# Add: GEMINI_API_KEY=your_key_here

# Development
npm run dev

# Build
npm run build

# Type check
npm run typecheck
```

**Required Environment Variable:**
```env
GEMINI_API_KEY=your_gemini_api_key_from_ai_studio
```

Get a free key at [Google AI Studio](https://aistudio.google.com/apikey).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run typecheck` | TypeScript type checking |
| `node scripts/generate-images.js` | Generate project images from base assets |

---

## Project Structure

```
├── app/
│   ├── api/chat/route.ts      # Gemini AI chat endpoint
│   ├── blog/                  # Blog listing & dynamic posts
│   ├── globals.css            # Global styles & Tailwind
│   ├── layout.tsx             # Root layout + fonts
│   └── page.tsx               # Home page (all sections)
├── components/
│   ├── about-section.tsx      # Tabbed about card
│   ├── chatbox.tsx            # AI chatbot widget
│   ├── contact-section.tsx    # Contact form + info
│   ├── experiments-section.tsx # Filterable achievements
│   ├── glass-hero.tsx         # Interactive hero with reveal
│   ├── process-section.tsx    # Animated process steps
│   ├── projects-section.tsx   # Project cards grid
│   ├── skills-section.tsx     # Categorized skills
│   └── MarkdownRenderer.tsx   # Custom MD parser
├── lib/
│   └── posts.ts               # Blog data & helpers
├── public/
│   ├── images/                # All assets (desktop + mobile)
│   └── resume.pdf             # Downloadable resume
└── scripts/
    └── generate-images.js     # Sharp-based image generator
```

---

## Highlights

- **Zero Dark Mode** — Clean single-theme design
- **AI-Powered Chat** — Context-aware, quota-aware, graceful fallback
- **Responsive Images** — Separate desktop/mobile hero backgrounds
- **Accessible** — Semantic HTML, focus states, reduced motion support
- **SEO Ready** — Metadata, structured content, fast static pages

---

## Contact

- **Email:** [patilaayush145@gmail.com](mailto:patilaayush145@gmail.com)
- **Phone:** +91 87675 41912
- **GitHub:** [github.com/dexter980](https://github.com/dexter980)
- **Location:** Pune, Maharashtra

---

## License

MIT License — Feel free to use as inspiration for your own portfolio!