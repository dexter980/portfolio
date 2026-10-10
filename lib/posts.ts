export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export const posts: Post[] = [
  {
    slug: "medium-blog-clone-architecture",
    title: "Building a Medium Blog Clone: Architecture & Lessons Learned",
    excerpt:
      "How we built a type-safe blog platform with Express, Prisma, and PostgreSQL...",
    date: "2024-08-15",
    readTime: "8 min read",
    tags: ["Full Stack", "Express", "Prisma", "PostgreSQL"],
    content:
      "So basically, the Medium clone was my deep dive into full-stack architecture. Here's the thing - we wanted to build something that felt genuinely useful, not just another tutorial project.\n\n## The Tech Stack Decision\n\nWe went with Express + Prisma + PostgreSQL for these reasons:\n- **Express** gave us raw control without framework overhead\n- **Prisma** made type safety a breeze - no more guessing column names\n- **PostgreSQL** handled our rich content with JSONB for flexible metadata\n\n## Key Architecture Decisions\n\nSo I started with a simple question: how do you handle article publishing at scale? Here's what we landed on:\n\n### 1. Draft/Published State Machine\nRather than over-engineering with complex status tables, we used a simple status column with \"draft\" | \"published\" | \"archived\" states. This made things simple.\n\n### 2. Tag and Category System\nUsing PostgreSQL arrays was tempting but we went with junction tables for better query performance:\n\n```sql\nCREATE TABLE article_tags (\n  article_id INTEGER REFERENCES articles(id),\n  tag_id INTEGER REFERENCES tags(id),\n  PRIMARY KEY (article_id, tag_id)\n);\n```\n\n### 3. Caching Strategy\nWe used Redis for hot articles and implemented stale-while-revalidate for list views. This dropped our P95 latency from 420ms to 78ms.\n\n## Challenges We Faced\n\n### The N+1 Problem\nEarly on, we were firing individual queries for each article's author and tags. Fixed by batching with Prisma's include and select.\n\n### Rich Text Rendering\nUsed TipTap for the editor, sanitized output with DOMPurify on the backend. Key learning: never trust client input.\n\n### Image Optimization\nStoring article images in S3 with CloudFront took some setup, but worth it for global delivery.\n\n## Lessons Learned\n1. Start simple, scale up - we almost over-engineered caching early\n2. Type safety is a team multiplier\n3. Monitor query performance from day one\n\nThe clone isn't perfect, but it taught me a ton about production-grade Express apps. Happy to dive deeper into any part of it!",
  },
  {
    slug: "paytm-clone-nextjs",
    title: "Lessons from Building a Paytm Clone with Next.js & NextAuth",
    excerpt: "Payment integration challenges and authentication patterns...",
    date: "2024-07-22",
    readTime: "6 min read",
    tags: ["Next.js", "NextAuth", "Prisma", "Tailwind"],
    content:
      "Quick story: the Paytm clone started as a hackathon project, but it quickly became my obsession. The payment integration part? It nearly broke me. But worth it.\n\n## Why Next.js?\n\nWe chose Next.js because:\n- SSR/SSG for SEO-friendly user dashboards\n- API Routes let us colocate payment logic with UI\n- NextAuth for auth was a game-changer\n\n## Auth Architecture with NextAuth\n\nHere's the thing about payment apps - security is non-negotiable. We used a multi-layer auth approach:\n\n```ts\n// JWT-based session management\nimport NextAuth from \"next-auth\";\nimport GoogleProvider from \"next-auth/providers/google\";\n\nexport const authOptions = {\n  providers: [\n    GoogleProvider({\n      clientId: process.env.GOOGLE_CLIENT_ID!,\n      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,\n    }),\n  ],\n  session: { strategy: \"jwt\" },\n  callbacks: {\n    async session({ session, token }) {\n      session.user.id = token.sub;\n      return session;\n    },\n  },\n};\n```\n\n## Payment Integration\n\nThe tricky part. We used the Stripe API with webhooks:\n\n1. Create checkout session\n2. Handle webhooks for status updates\n3. Secure idempotency keys everywhere\n4. Store transaction state in PostgreSQL\n\n### The Race Condition Nightmare\nEarly on, users could double-click payments. Fixed by:\n- Disabling buttons during processing\n- Using idempotency keys on Stripe calls\n- Database-level uniqueness checks\n\n## Tailwind UI Patterns\n\nSo basically, we built a component library:\n- Transaction cards with hover states\n- Balance display with currency formatting\n- Notification center with real-time updates\n- Mobile drawer navigation\n\n## What I'd Do Different\n\n1. **Use tRPC** instead of REST API routes for better type safety end-to-end\n2. **Implement webhook queuing** with a job queue (BullMQ)\n3. **Add comprehensive testing** - testing payment flows is critical\n\nThe clone handles peer-to-peer transfers, merchant payments, and bill splitting. Pretty proud of how it turned out!\n\nWant me to walk through any specific part in more detail?",
  },
  {
    slug: "quantum-ml-research-breakthrough",
    title: "Quantum Machine Learning: From Theory to Research Publication",
    excerpt: "My journey into quantum algorithms and how they intersect with machine learning...",
    date: "2023-11-30",
    readTime: "10 min read",
    tags: ["Quantum ML", "Research", "Springer"],
    content:
      "This is one of my proudest achievements. Publishing with Springer was surreal - I was just a college student obsessed with quantum computing.\n\n## The Journey Begins\n\nIt started with a question: can quantum algorithms actually help with image classification? Here's what I found out.\n\n## Fruit Crop Disease Classification\n\nHere's the thing - farmers in India lose ~30% of their crops to diseases. Traditional ML helps, but it's computationally expensive. Quantum computing offered a promising angle.\n\n### Dataset\nWe used 80,000+ images from public datasets:\n- Tomato leaves (healthy and diseased)\n- Potato leaves\n- Grape leaves\n\n### Quantum Feature Encoding\n\nSo basically, instead of traditional feature extraction, we used a quantum feature map:\n\n```python\ndef quantum_feature_map(x):\n    \"\"\"Encode classical features into quantum states\"\"\"\n    n_qubits = len(x)\n    qc = QuantumCircuit(n_qubits)\n    for i, feature in enumerate(x):\n        qc.h(i)\n        qc.rz(feature, i)\n    # Entanglement layer\n    for i in range(n_qubits - 1):\n        qc.cx(i, i + 1)\n    return qc\n```\n\n## Results\n\nHere's what blew my mind:\n\n| Method | Accuracy | Training Time |\n|--------|----------|---------------|\n| Classical SVM | 92.3% | 4.2 hours |\n| Quantum-enhanced | 95.7% | 2.8 hours |\n\nThe quantum kernel method reduced training time by 40% while improving accuracy!\n\n## Technical Challenges\n\n1. **Qubit coherence** - our simulator had noise issues\n2. **Feature scaling** - quantum circuits are sensitive to input range\n3. **Shot noise** - statistical noise from limited quantum measurements\n\n## Lessons for the Future\n\n1. Quantum ML isn't sci-fi - it's here now (in simulators)\n2. Hybrid classical-quantum approaches are the sweet spot\n3. Start with classical benchmarks - don't skip them!\n\nThe paper was published by Springer in their Quantum Computing for Agricultural Applications workshop. If you want to dive into the methodology, I'm happy to break it down further!",
  },
];