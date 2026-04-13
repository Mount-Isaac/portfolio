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
  title: "Isaac Kyalo — Full-Stack Engineer · AI Integration & Microservices",
  description:
    "Isaac Kyalo — Full-stack engineer with 5+ years building decoupled applications, distributed systems, and AI-integrated architectures. Next.js, FastAPI, RabbitMQ, Kafka, LangChain, MCP, Docker. Based in Nairobi, open to remote.",
  keywords: [
    "Isaac Kyalo", "Software Engineer", "Backend Engineer", "AI Engineer",
    "LangChain", "MCP", "RAG", "FastAPI", "Python", "Microservices",
    "RabbitMQ", "Kafka", "Docker", "Grafana", "Prometheus", "Nairobi Kenya",
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
