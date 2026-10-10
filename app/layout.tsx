import type { Metadata, Viewport } from "next";
import { Albert_Sans, Fragment_Mono } from "next/font/google";
import "./globals.css";

const albert = Albert_Sans({ subsets: ["latin"], variable: "--font-albert", display: "swap" });
const fragment = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--font-fragment", display: "swap" });

export const metadata: Metadata = {
  title: "Aayush Patil — Full Stack Developer",
  description: "Full Stack Developer skilled in React, Next.js, Express.js, and SQL. Building scalable web applications with expertise in TypeScript, PostgreSQL, MongoDB, Prisma ORM, and modern frontend frameworks.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${albert.variable} ${fragment.variable}`}>
      <body>{children}</body>
    </html>
  );
}