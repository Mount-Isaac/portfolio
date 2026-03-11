import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isaac Kyalo — Senior Software Engineer & AI/ML Architect",
  description:
    "Isaac Kyalo — Senior Software Engineer with 5+ years building distributed systems, microservices, and production AI/ML platforms. LangChain, RAG, LLM integration, Docker, Kubernetes, FastAPI, Python.",
  keywords: [
    "Isaac Kyalo", "Software Engineer", "AI Engineer", "ML Engineer",
    "LangChain", "RAG", "LLM", "FastAPI", "Python", "Microservices",
    "Docker", "Kubernetes", "Backend Developer", "Nairobi Kenya",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
