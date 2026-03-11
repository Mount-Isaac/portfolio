'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, ExternalLink, Mail, ArrowUpRight, Package, Terminal, Layers, Cpu, Database, Cloud, Code2, Bot, Zap, Shield } from 'lucide-react'
import { FaGithub, FaTwitter, FaDiscord, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import AnimatedBackgroundLines from '@/components/animated-background-lines'
import CodeAnimation from '@/components/code-animation'
import Navbar from '@/components/Navbar'

/* ─────────────────── helpers ─────────────────── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <span className="text-lime-400 text-xs font-bold tracking-widest uppercase mb-3 block">{label}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">{subtitle}</p>}
    </div>
  )
}

/* ─────────────────── data ─────────────────── */
const skillGroups = [
  {
    icon: Bot,
    label: 'AI / LLM Engineering',
    color: 'text-lime-400',
    border: 'border-lime-400/20',
    bg: 'bg-lime-400/5',
    skills: ['LangChain', 'LlamaIndex', 'OpenAI API', 'Anthropic Claude', 'Gemini API', 'GPT-4', 'LLaMA', 'RAG Pipelines', 'AI Agents', 'Multi-Agent Systems', 'Prompt Engineering', 'Fine-Tuning', 'Embeddings', 'Vector Search'],
  },
  {
    icon: Cpu,
    label: 'MLOps & AI Infrastructure',
    color: 'text-purple-400',
    border: 'border-purple-400/20',
    bg: 'bg-purple-400/5',
    skills: ['MLflow', 'Hugging Face', 'Databricks', 'Pinecone', 'ChromaDB', 'Weaviate', 'Model Versioning', 'Inference Optimization', 'Feature Engineering', 'AWS SageMaker', 'GCP Vertex AI'],
  },
  {
    icon: Code2,
    label: 'Backend Development',
    color: 'text-blue-400',
    border: 'border-blue-400/20',
    bg: 'bg-blue-400/5',
    skills: ['Python', 'FastAPI', 'Flask', 'Django', 'Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets', 'gRPC', 'OAuth2', 'JWT', 'Microservices'],
  },
  {
    icon: Cloud,
    label: 'DevOps & Cloud',
    color: 'text-cyan-400',
    border: 'border-cyan-400/20',
    bg: 'bg-cyan-400/5',
    skills: ['AWS (EC2 · S3 · RDS · Lambda)', 'GCP', 'Docker', 'Kubernetes', 'Docker Swarm', 'Jenkins', 'GitHub Actions', 'Terraform', 'Nginx', 'CI/CD', 'Blue-Green Deploy'],
  },
  {
    icon: Database,
    label: 'Databases & Caching',
    color: 'text-orange-400',
    border: 'border-orange-400/20',
    bg: 'bg-orange-400/5',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'InfluxDB', 'Connection Pooling', 'Query Optimization', 'Raw SQL', 'NoSQL', 'Vector Databases'],
  },
  {
    icon: Zap,
    label: 'Async & Messaging',
    color: 'text-yellow-400',
    border: 'border-yellow-400/20',
    bg: 'bg-yellow-400/5',
    skills: ['RabbitMQ', 'Apache Kafka', 'Celery', 'Event-Driven Architecture', 'Pub/Sub', 'Dead-Letter Queues', 'Message Brokers', 'Async Processing'],
  },
]

const architectureProjects = [
  {
    title: 'AI-Powered Sports Analytics Engine',
    description:
      'End-to-end ML platform processing millions of sports data points. Integrated GPT-4 & Claude APIs for natural language querying, built RAG pipelines with LangChain + Pinecone for semantic search over proprietary datasets, and productionized predictive models for sponsorship valuation.',
    metrics: ['1M+ records in vector DB', 'Real-time ML inference', '5+ models in production'],
    stack: ['LangChain', 'Pinecone', 'GPT-4', 'Databricks', 'MLflow', 'FastAPI', 'Python'],
    accentColor: 'lime',
    architecture: [
      { label: 'Sports Data Sources', color: 'bg-slate-700' },
      { label: 'Databricks Pipeline', color: 'bg-purple-800' },
      { label: 'ML Models (MLflow)', color: 'bg-indigo-800' },
      { label: 'LangChain + RAG', color: 'bg-lime-800' },
      { label: 'Pinecone VectorDB', color: 'bg-emerald-800' },
      { label: 'FastAPI REST', color: 'bg-blue-800' },
    ],
  },
  {
    title: 'High-Scale IoT Device Control Platform',
    description:
      'Mission-critical distributed platform managing 100,000+ connected mobile devices across multiple OEM partners. Built 10+ independent microservices with Redis caching cutting DB load by 90%, RabbitMQ for guaranteed message delivery, and Docker Swarm blue-green deployments for zero-downtime releases.',
    metrics: ['100K+ devices', '99.99% uptime SLA', 'sub-100ms response'],
    stack: ['FastAPI', 'Flask', 'Redis', 'RabbitMQ', 'PostgreSQL', 'Docker Swarm', 'Jenkins'],
    accentColor: 'blue',
    architecture: [
      { label: 'Mobile Devices (OEMs)', color: 'bg-slate-700' },
      { label: 'FastAPI Gateway', color: 'bg-blue-800' },
      { label: 'Redis Cache', color: 'bg-red-800' },
      { label: 'RabbitMQ Broker', color: 'bg-orange-800' },
      { label: 'Worker Services', color: 'bg-purple-800' },
      { label: 'PostgreSQL Cluster', color: 'bg-cyan-800' },
    ],
  },
  {
    title: 'Fintech Payment API Infrastructure',
    description:
      'Secure, OWASP-compliant payment processing backend with end-to-end encryption, real-time transaction monitoring, and fraud detection. Handles high-volume concurrent payment flows with event-driven processing and comprehensive audit trails.',
    metrics: ['End-to-end encrypted', 'Real-time monitoring', 'OWASP compliant'],
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'AWS', 'GitHub Actions'],
    accentColor: 'purple',
    architecture: [
      { label: 'Client Applications', color: 'bg-slate-700' },
      { label: 'FastAPI + Encryption', color: 'bg-purple-800' },
      { label: 'Payment Processors', color: 'bg-green-800' },
      { label: 'Celery Workers', color: 'bg-yellow-800' },
      { label: 'Real-time Monitor', color: 'bg-orange-800' },
      { label: 'PostgreSQL Ledger', color: 'bg-blue-800' },
    ],
  },
]

const freelanceProjects = [
  {
    title: 'Karlisu',
    url: 'https://www.karlisu.com/',
    description: 'Full-featured e-commerce platform with product catalog, cart, checkout, and admin dashboard. Built for performance and conversions.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
  },
  {
    title: 'PyroTrack',
    url: 'https://pyrotrack.com/',
    description: 'Real-time tracking and analytics platform with live dashboards, data visualization, and automated alert systems.',
    stack: ['React', 'FastAPI', 'WebSockets', 'Redis', 'PostgreSQL'],
  },
  {
    title: 'GetFoxCard',
    url: 'https://www.getfoxcard.io/',
    description: 'Fintech card management platform with secure user onboarding, virtual card issuance, and transaction history.',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'OAuth2', 'Docker'],
  },
]

const openSourcePackages = [
  {
    name: 'rabbitmq-easy',
    pypi: 'https://pypi.org/project/rabbitmq-easy/',
    github: 'https://github.com/mount-isaac/rabbitmq-easy',
    install: 'pip install rabbitmq-easy',
    description:
      'Simplifies RabbitMQ setup in Python microservices — solving critical connection and deployment conflicts that cost engineers hours. Used by developers globally.',
    tags: ['RabbitMQ', 'Microservices', 'Python', 'Message Queuing'],
  },
  {
    name: 'api-watch',
    pypi: 'https://pypi.org/project/api-watch/',
    github: 'https://github.com/mount-isaac/api-watch',
    install: 'pip install api-watch',
    description:
      'Production API monitoring and health-check CLI tool. Track uptime, response times, and set up automated alerts for your APIs — zero config needed.',
    tags: ['API Monitoring', 'DevOps', 'Python', 'CLI Tool'],
  },
]

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '30+', label: 'Projects Delivered' },
  { value: '100K+', label: 'Devices Managed' },
  { value: '2', label: 'Open Source Packages' },
]

/* ─────────────────── page ─────────────────── */
export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main className="bg-[#0a0d14] text-white min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ══════ HERO ══════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <AnimatedBackgroundLines />

        {/* gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16 w-full">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-lime-400 text-sm font-semibold tracking-widest uppercase mb-4 border border-lime-400/30 bg-lime-400/5 px-3 py-1 rounded-full">
                Available for hire
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  Isaac Kyalo
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-cyan-400 to-blue-400 font-semibold mb-4">
                Senior Software Engineer · AI/ML Architect
              </p>

              <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10">
                5+ years building production-grade distributed systems, microservices, and AI-powered platforms.
                From 100K-device IoT infrastructure to LLM-driven analytics engines — I ship systems that scale.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-lime-500 hover:bg-lime-400 text-[#0a0d14] font-bold px-7 py-3.5 rounded-xl transition-all text-sm flex items-center gap-2 shadow-lg shadow-lime-500/20"
                >
                  View My Work <ArrowUpRight className="w-4 h-4" />
                </button>
                <a
                  href="https://drive.google.com/file/d/1yQldAQoWaIK0B2TtMm0EJiUeFX_pKMIg/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/15 hover:border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm flex items-center gap-2 hover:bg-white/5"
                >
                  <Download className="w-4 h-4" /> Get Resume
                </a>
              </div>

              {/* Social row */}
              <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                {[
                  { href: 'https://github.com/mount-isaac', icon: FaGithub, label: 'GitHub', color: 'hover:text-white' },
                  { href: 'https://x.com/MtIsaac2', icon: FaTwitter, label: 'Twitter', color: 'hover:text-sky-400' },
                  { href: 'https://wa.me/254759856000', icon: FaWhatsapp, label: 'WhatsApp', color: 'hover:text-green-400' },
                  { href: 'https://t.me/thebot_maker', icon: FaTelegram, label: 'Telegram', color: 'hover:text-blue-400' },
                  { href: 'https://discordapp.com/users/1007688891161133177', icon: FaDiscord, label: 'Discord', color: 'hover:text-indigo-400' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className={`text-slate-500 ${s.color} transition-colors`}>
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right – code animation */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 w-full hidden lg:block"
          >
            <CodeAnimation />
          </motion.div>
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <section className="border-y border-white/8 bg-white/2">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-lime-400 mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════ ABOUT ══════ */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <FadeIn>
          <SectionTitle
            label="About me"
            title="Engineer. Builder. AI Systems Architect."
            subtitle="I don't just write code — I design systems that handle real-world scale, reliability, and intelligence."
          />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-slate-300 leading-relaxed">
              <p>
                I am a Senior Software Engineer and AI/ML Architect with 5+ years building production systems
                from the ground up. My work spans IoT device management platforms handling 100K+ concurrent
                devices, fintech payment APIs, and LLM-powered analytics engines used by sports organizations across the US.
              </p>
              <p>
                I specialize in the full AI stack — from training and fine-tuning models to deploying RAG pipelines,
                autonomous AI agents, and LLM-integrated APIs in production. I work with LangChain, LlamaIndex,
                OpenAI, and Anthropic APIs daily, and I understand the infrastructure that makes AI reliable at scale.
              </p>
              <p>
                On the infrastructure side, I have designed microservices architectures with Docker/Kubernetes,
                built fault-tolerant message queuing systems with RabbitMQ and Kafka, and engineered
                CI/CD pipelines that reduced release cycles by 70%. I am a published open-source contributor
                with Python packages used by developers globally.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Bot, label: 'AI Agent Systems', desc: 'LangChain · RAG · LLMs' },
                { icon: Layers, label: 'Microservices', desc: 'Docker · K8s · RabbitMQ' },
                { icon: Shield, label: 'Fintech APIs', desc: 'Secure · Encrypted · PCI' },
                { icon: Zap, label: 'High Performance', desc: 'Sub-100ms · 99.99% SLA' },
              ].map(card => (
                <div key={card.label} className="bg-white/4 border border-white/8 rounded-xl p-4 hover:border-lime-400/30 transition-colors">
                  <card.icon className="w-5 h-5 text-lime-400 mb-2" />
                  <div className="text-white text-sm font-semibold">{card.label}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{card.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-3">
              {[
                { label: 'AI/ML & LLM Integration', pct: 92 },
                { label: 'Backend & API Development', pct: 96 },
                { label: 'DevOps & Cloud Infrastructure', pct: 88 },
                { label: 'Distributed Systems Design', pct: 90 },
                { label: 'Database Architecture', pct: 89 },
              ].map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-300">{bar.label}</span>
                    <span className="text-slate-500">{bar.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-lime-500 to-cyan-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.pct}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}

              {/* Quick facts */}
              <div className="mt-8 bg-white/3 border border-white/8 rounded-xl p-5 space-y-3">
                {[
                  ['Location', 'Nairobi, Kenya (Open to Remote)'],
                  ['Currently', 'Senior Engineer @ SportsBiz (USA)'],
                  ['Education', "B.Sc. Information Technology, Kenyatta University"],
                  ['Contact', 'isadechair019@gmail.com'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 text-sm">
                    <span className="text-slate-500 w-24 shrink-0">{k}</span>
                    <span className="text-slate-300">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════ SKILLS ══════ */}
      <section id="skills" className="bg-white/2 border-y border-white/6 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionTitle
              label="Technical skills"
              title="Full-Stack AI & Systems Engineering"
              subtitle="From LLM agents and RAG pipelines to bare-metal Docker Swarm clusters — I operate across the entire stack."
            />
          </FadeIn>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {skillGroups.map((group, i) => (
              <FadeIn key={group.label} delay={i * 0.07}>
                <div className={`${group.bg} border ${group.border} rounded-2xl p-6 h-full hover:border-opacity-60 transition-all`}>
                  <div className="flex items-center gap-3 mb-4">
                    <group.icon className={`w-5 h-5 ${group.color}`} />
                    <span className={`text-sm font-bold ${group.color}`}>{group.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <span
                        key={skill}
                        className="text-xs bg-white/6 text-slate-300 border border-white/8 px-2.5 py-1 rounded-md hover:border-white/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROJECTS ══════ */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionTitle
              label="What I've built"
              title="Systems Architecture Showcases"
              subtitle="Production systems I've designed and engineered — illustrated with real technical depth, metrics, and architecture flows."
            />
          </FadeIn>

          {/* Architecture projects */}
          <div className="space-y-8 mb-20">
            {architectureProjects.map((proj, i) => (
              <FadeIn key={proj.title} delay={i * 0.1}>
                <div className="bg-white/3 border border-white/8 rounded-2xl p-7 hover:border-white/15 transition-all group">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Info */}
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {proj.metrics.map(m => (
                            <span key={m} className="text-xs text-lime-400 bg-lime-400/10 border border-lime-400/20 px-2 py-0.5 rounded-full">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-5">{proj.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.stack.map(t => (
                          <span key={t} className="text-xs bg-white/6 border border-white/10 text-slate-300 px-2.5 py-1 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architecture flow */}
                    <div className="lg:w-72 flex-shrink-0">
                      <div className="text-xs text-slate-500 mb-3 font-mono">{'// architecture flow'}</div>
                      <div className="space-y-1.5">
                        {proj.architecture.map((node, ni) => (
                          <div key={node.label} className="flex items-center gap-2">
                            <div className={`${node.color} text-white text-xs px-3 py-1.5 rounded-lg font-mono flex-1 text-center`}>
                              {node.label}
                            </div>
                            {ni < proj.architecture.length - 1 && (
                              <div className="text-slate-600 text-xs">↓</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Freelance projects */}
          <FadeIn>
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-white/20"></span>
              Freelance & Client Work
              <span className="flex-1 h-px bg-white/20"></span>
            </h3>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelanceProjects.map((proj, i) => (
              <FadeIn key={proj.title} delay={i * 0.1}>
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-white/20 hover:bg-white/5 transition-all group h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-base font-bold text-white">{proj.title}</h4>
                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-lime-400 transition-colors shrink-0 ml-2" />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map(t => (
                      <span key={t} className="text-xs bg-white/6 border border-white/8 text-slate-400 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ OPEN SOURCE ══════ */}
      <section id="opensource" className="bg-white/2 border-y border-white/6 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <SectionTitle
              label="Open source"
              title="Published Python Packages"
              subtitle="Real tools solving real problems — used by developers globally."
            />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-7">
            {openSourcePackages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 0.15}>
                <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 hover:border-lime-400/30 transition-all h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-base font-bold text-white font-mono">{pkg.name}</h3>
                    <div className="flex gap-2">
                      <a href={pkg.github} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/6 hover:bg-white/12 transition-colors text-slate-400 hover:text-white">
                        <FaGithub className="w-4 h-4" />
                      </a>
                      <a href={pkg.pypi} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/6 hover:bg-white/12 transition-colors text-slate-400 hover:text-lime-400">
                        <Package className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{pkg.description}</p>

                  {/* Install command */}
                  <div className="bg-black/50 border border-white/8 rounded-lg px-4 py-2.5 font-mono text-xs text-lime-400 flex items-center gap-2 mb-4">
                    <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    {pkg.install}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {pkg.tags.map(t => (
                      <span key={t} className="text-xs bg-white/6 border border-white/8 text-slate-400 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CONTACT ══════ */}
      <section id="contact" className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <SectionTitle
              label="Let's connect"
              title="Ready to Build Something Great?"
              subtitle="Whether it's a distributed system, an AI product, or a performance-critical API — I'm ready to jump in. Let's talk."
            />
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-white/3 border border-white/10 rounded-2xl p-8 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="mailto:isadechair019@gmail.com"
                  className="flex items-center gap-3 bg-lime-500 hover:bg-lime-400 text-[#0a0d14] font-bold px-6 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-lime-500/20"
                >
                  <Mail className="w-4 h-4" /> Send an Email
                </a>
                <a
                  href="https://wa.me/254759856000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-white/15 hover:border-green-400/50 text-white hover:text-green-400 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
                >
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href="https://t.me/thebot_maker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-white/15 hover:border-blue-400/50 text-white hover:text-blue-400 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
                >
                  <FaTelegram className="w-4 h-4" /> Telegram
                </a>
              </div>

              <div className="text-sm text-slate-400 mb-2">isadechair019@gmail.com &nbsp;·&nbsp; +254 759 856 000</div>
              <div className="text-sm text-slate-500">Nairobi, Kenya — open to remote worldwide</div>
            </div>

            {/* Social icons row */}
            <div className="flex gap-5 justify-center">
              {[
                { href: 'https://github.com/mount-isaac', icon: FaGithub, color: 'hover:text-white', label: 'GitHub' },
                { href: 'https://x.com/MtIsaac2', icon: FaTwitter, color: 'hover:text-sky-400', label: 'Twitter' },
                { href: 'https://discordapp.com/users/1007688891161133177', icon: FaDiscord, color: 'hover:text-indigo-400', label: 'Discord' },
                { href: 'https://t.me/thebot_maker', icon: FaTelegram, color: 'hover:text-blue-400', label: 'Telegram' },
                { href: 'https://wa.me/254759856000', icon: FaWhatsapp, color: 'hover:text-green-400', label: 'WhatsApp' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className={`text-slate-500 ${s.color} transition-colors`}>
                  <s.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-white/6 py-6 text-center">
        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} Isaac Kyalo · Nairobi, Kenya · Built with Next.js & Tailwind
        </p>
      </footer>
    </main>
  )
}
