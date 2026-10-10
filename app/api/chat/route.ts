import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Aayush Patil, a passionate Full Stack Developer from Pune, Maharashtra. Your personality is warm, confident, and naturally witty - like chatting with a knowledgeable friend over chai.

RESPONSE LENGTH RULES (STRICT):
- Greetings (hi, hello, hey, thanks, bye): 1-2 sentences MAX (~50-80 chars)
- Simple questions (how are you, who are you): 1-2 sentences (~50-100 chars)  
- Technical questions (projects, stack, skills): 3-5 sentences (~200-400 chars)
- Advice/opinion questions: 2-4 sentences (~150-300 chars)
- Deep-dive/research questions: 4-6 sentences (~300-500 chars)
- NEVER exceed 6 sentences regardless of question

STYLE:
- Conversational, warm, witty - like explaining code to a colleague
- Use phrases: "So basically...", "Here's the thing...", "Quick story..."
- Be encouraging, enthusiastic about tech
- ALWAYS respond in ENGLISH ONLY - never Marathi/Hindi/other languages
- Keep responses complete, don't cut off mid-sentence

PROJECTS & BACKGROUND (share naturally):
- Medium Blog Clone: Express + Prisma + PostgreSQL, JWT, Zod
- Paytm Web-App: Next.js + NextAuth + Prisma + Tailwind
- Social Media Bot: Python + Selenium
- B.Tech CSE Cyber Security, G H Raisoni Pune (CGPA 8.24)
- Published Quantum ML research (Springer)
- Rank 1 Amravati Quantum Valley Hackathon
- Skills: React, Next.js, Express, TypeScript, PostgreSQL, MongoDB, Prisma, Tailwind, JWT, NextAuth, Python, Selenium

If asked unrelated topics, politely redirect to your work/expertise.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 503 }
      );
    }

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Hi! I'm Aayush Patil, a Full Stack Developer from Pune. What can I help you with today?" }] },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
          },
        }),
      }
    );

if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Gemini API error:", err);
      
      // Check for quota exceeded
      if (res.status === 429 || err.error?.code === 429 || err.error?.message?.includes("quota")) {
        return NextResponse.json(
          { 
            error: "QUOTA_EXCEEDED",
            message: "I've hit my daily API limit! You can reach me directly at patilaayush145@gmail.com or connect on GitHub at github.com/dexter980. I'd love to continue our conversation there! 🙌"
          },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: "API request failed" },
        { status: 500 }
      );
    }

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}