'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, ExternalLink, Mail, ArrowUpRight, Package, Terminal, Layers, Cpu, Database, Cloud, Code2, BrainCircuit, Zap, BarChart2 } from 'lucide-react'
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
    icon: BrainCircuit,
    label: 'AI / LLM Engineering',
    color: 'text-lime-400',
    border: 'border-lime-400/20',
    bg: 'bg-lime-400/5',
    skills: ['LangChain', 'OpenAI API', 'Anthropic Claude', 'MCP (Model Context Protocol)', 'RAG Pipelines', 'AI Agents', 'RLHF / Model Deployment', 'Prompt Engineering', 'Embeddings', 'Vector Search'],
  },
  {
    icon: Cpu,
    label: 'MLOps & AI Infrastructure',
    color: 'text-purple-400',
    border: 'border-purple-400/20',
    bg: 'bg-purple-400/5',
    skills: ['MLflow', 'Hugging Face', 'Pinecone', 'ChromaDB', 'Model Versioning', 'Inference Optimization', 'Feature Engineering', 'AWS SageMaker'],
  },
  {
    icon: Code2,
    label: 'Backend Development',
    color: 'text-blue-400',
    border: 'border-blue-400/20',
    bg: 'bg-blue-400/5',
    skills: ['Python', 'TypeScript', 'FastAPI', 'Django', 'Flask', 'Node.js', 'Express', 'REST APIs', 'WebSockets', 'OAuth2', 'JWT', 'Microservices'],
  },
  {
    icon: Cloud,
    label: 'DevOps & Cloud',
    color: 'text-cyan-400',
    border: 'border-cyan-400/20',
    bg: 'bg-cyan-400/5',
    skills: ['AWS (EC2 · S3 · RDS · Lambda)', 'GCP', 'Docker', 'Kubernetes', 'Docker Swarm', 'Jenkins', 'GitHub Actions', 'Nginx', 'CI/CD', 'Blue-Green Deploy'],
  },
  {
    icon: Database,
    label: 'Databases & Caching',
    color: 'text-orange-400',
    border: 'border-orange-400/20',
    bg: 'bg-orange-400/5',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'InfluxDB', 'Connection Pooling', 'Query Optimization', 'Raw SQL', 'Vector Databases'],
  },
  {
    icon: Zap,
    label: 'Async & Messaging',
    color: 'text-yellow-400',
    border: 'border-yellow-400/20',
    bg: 'bg-yellow-400/5',
    skills: ['RabbitMQ', 'Apache Kafka', 'Celery', 'Event-Driven Architecture', 'Pub/Sub', 'Dead-Letter Queues', 'Message Brokers', 'Async Processing'],
  },
  {
    icon: BarChart2,
    label: 'Data & Observability',
    color: 'text-rose-400',
    border: 'border-rose-400/20',
    bg: 'bg-rose-400/5',
    skills: ['Grafana', 'Prometheus', 'Apache Superset', 'InfluxDB', 'Metrics & Alerting', 'Log Aggregation', 'Dashboards', 'Data Visualization'],
  },
]

const architectureProjects = [
  {
    title: 'AI-Powered Data Analytics Engine',
    description:
      'Integrated LLM APIs (OpenAI + Anthropic) into an analytics platform to enable natural language querying over proprietary datasets. Built RAG pipelines with LangChain and Pinecone for semantic search, wired AI outputs into existing REST APIs, and set up the inference infrastructure to keep it reliable in production.',
    metrics: ['LLM-integrated queries', 'RAG over proprietary data', 'Semantic search API'],
    stack: ['LangChain', 'Pinecone', 'OpenAI API', 'Anthropic API', 'FastAPI', 'Python', 'MLflow'],
    accentColor: 'lime',
    architecture: [
      { label: 'Client / Dashboard', color: 'bg-slate-700' },
      { label: 'FastAPI REST Layer', color: 'bg-blue-800' },
      { label: 'LangChain + RAG', color: 'bg-lime-800' },
      { label: 'Pinecone VectorDB', color: 'bg-emerald-800' },
      { label: 'OpenAI / Anthropic API', color: 'bg-indigo-800' },
      { label: 'Response to Client', color: 'bg-slate-700' },
    ],
  },
  {
    title: 'IoT Device Control Platform',
    description:
      'Distributed platform managing a large fleet of connected mobile devices across multiple partner networks. Built decoupled microservices with Redis caching to reduce DB load, RabbitMQ for guaranteed message delivery, and Docker Swarm blue-green deployments for zero-downtime releases. Monitored with Grafana and Prometheus dashboards.',
    metrics: ['Multi-partner device fleet', 'Zero-downtime deploys', 'Sub-100ms response'],
    stack: ['FastAPI', 'Flask', 'Redis', 'RabbitMQ', 'PostgreSQL', 'Docker Swarm', 'Grafana', 'Prometheus', 'Jenkins'],
    accentColor: 'blue',
    architecture: [
      { label: 'Connected Devices', color: 'bg-slate-700' },
      { label: 'FastAPI Gateway', color: 'bg-blue-800' },
      { label: 'Redis Cache', color: 'bg-red-800' },
      { label: 'RabbitMQ Broker', color: 'bg-orange-800' },
      { label: 'Worker Microservices', color: 'bg-purple-800' },
      { label: 'PostgreSQL Cluster', color: 'bg-cyan-800' },
      { label: 'Grafana + Prometheus', color: 'bg-rose-900' },
    ],
  },
  {
    title: 'Fintech Payment API Infrastructure',
    description:
      'Secure, OWASP-compliant payment processing backend with end-to-end encryption, real-time transaction monitoring, and event-driven fraud detection. Decoupled into independent services communicating via async queues with comprehensive audit trails and zero shared state between services.',
    metrics: ['End-to-end encrypted', 'Event-driven processing', 'OWASP compliant'],
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
  {
    title: 'MCP-Powered AI Customer Support Assistant',
    description:
      'Conversational support assistant where user messages route through an MCP server that discovers and selects the right agent for the task. The selected agent calls account/card info APIs via MCP tool calls, passes through an auth guard (JWT), and the LLM synthesizes a contextual response. Built as a decoupled Next.js frontend with a FastAPI backend — no hardcoded tool logic, fully agent-driven.',
    metrics: ['MCP dynamic tool routing', 'Auth-guarded API calls', 'Multi-turn context'],
    stack: ['LangChain', 'MCP', 'FastAPI', 'OpenAI API', 'JWT / OAuth2', 'Redis', 'Next.js', 'PostgreSQL'],
    accentColor: 'cyan',
    architecture: [
      { label: 'Chat UI (Next.js)', color: 'bg-slate-700' },
      { label: 'FastAPI Backend', color: 'bg-blue-800' },
      { label: 'MCP Server (Agent Router)', color: 'bg-cyan-800' },
      { label: 'Available Agents Discovery', color: 'bg-teal-800' },
      { label: 'Card / Account Info API', color: 'bg-green-800' },
      { label: 'Auth Guard (JWT)', color: 'bg-red-800' },
      { label: 'LLM Response (OpenAI)', color: 'bg-indigo-800' },
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />

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

              <p className="text-lg sm:text-xl md:text-2xl text-lime-400 font-semibold mb-4 tracking-tight">
                Full-Stack Engineer · AI Integration & Microservices
              </p>

              <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10">
                5+ years building full-stack applications and distributed systems — decoupled frontends,
                microservices backends, event-driven pipelines, and AI integration layers.
                Open to remote opportunities.
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
      <section className="border-y border-slate-800 bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-8">
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
            title="Full-Stack Engineer · AI Integration Specialist"
            subtitle="I build complete products — decoupled frontends, microservices backends, and AI integration layers wired into real production systems."
          />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-slate-300 leading-relaxed">
              <p>
                Full-stack engineer with 5+ years building production applications end-to-end — React and Next.js
                frontends, FastAPI, Django, Flask, Express, and Node.js backends in Python and TypeScript, and
                distributed systems that keep services decoupled and independently scalable. I have shipped many
                projects across fintech, IoT, analytics, and e-commerce.
              </p>
              <p>
                On the AI side, my focus is integration and architecture — not training models but wiring LLMs,
                agents, and tools into real systems using LangChain, MCP (Model Context Protocol), RAG pipelines,
                and OpenAI / Anthropic APIs. I build the infrastructure that makes AI features reliable in production.
              </p>
              <p>
                For async systems I use RabbitMQ and Kafka. For observability: Grafana, Prometheus, and Superset.
                Infrastructure lives in Docker, Kubernetes, and AWS. I have published two open-source Python
                packages on PyPI that solve real problems in microservice deployments.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Code2, label: 'Full-Stack Apps', desc: 'React · Next.js · Django · Express' },
                { icon: BrainCircuit, label: 'AI Integration', desc: 'LangChain · MCP · RAG' },
                { icon: Layers, label: 'Microservices', desc: 'Docker · RabbitMQ · Kafka' },
                { icon: Zap, label: 'Observability', desc: 'Grafana · Prometheus · Superset' },
              ].map(card => (
                <div key={card.label} className="bg-[#0d1117] border border-slate-800 rounded-xl p-4 hover:border-lime-400/40 transition-colors">
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
                { label: 'Full-Stack Application Development', note: 'Next.js, FastAPI, Node.js' },
                { label: 'Distributed Systems & Microservices', note: 'RabbitMQ, Kafka, decoupled arch' },
                { label: 'AI Integration & Agent Architecture', note: 'LangChain, MCP, RAG — not model training' },
                { label: 'DevOps & Observability', note: 'Docker, Grafana, Prometheus' },
                { label: 'Database Design', note: 'PostgreSQL, Redis, Vector DBs' },
                { label: 'Model Deployment / RLHF', note: 'Active learning area' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/6">
                  <span className="text-slate-300 text-sm">{item.label}</span>
                  <span className="text-xs text-slate-400 bg-[#0d1117] border border-slate-700 px-2.5 py-1 rounded-full">{item.note}</span>
                </div>
              ))}

              {/* Quick facts */}
              <div className="mt-8 bg-[#0d1117] border border-slate-800 rounded-xl p-5 space-y-3">
                {[
                  ['Location', 'Nairobi, Kenya (Open to Remote)'],
                  ['Currently', 'Full-Stack / AI Integration Engineer'],
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
      <section id="skills" className="bg-[#0d1117] border-y border-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionTitle
              label="Technical skills"
              title="Full-Stack AI & Systems Engineering"
              subtitle="The tools and technologies I use on real projects — backend, AI/LLM, infrastructure, messaging, and observability."
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
                        className="text-xs bg-[#161b22] text-slate-300 border border-slate-700/70 px-2.5 py-1 rounded-md hover:border-slate-500 transition-colors"
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
                <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-7 hover:border-slate-600 transition-all group relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${i === 0 ? 'bg-lime-500' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-purple-500' : 'bg-cyan-500'}`} />
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
                          <span key={t} className="text-xs bg-[#161b22] border border-slate-700/70 text-slate-300 px-2.5 py-1 rounded-md">
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
                              <div className="text-slate-500 text-xs">↓</div>
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
                  className="block bg-[#0d1117] border border-slate-800 rounded-2xl p-6 hover:border-slate-600 hover:bg-[#111827] transition-all group h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-base font-bold text-white">{proj.title}</h4>
                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-lime-400 transition-colors shrink-0 ml-2" />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map(t => (
                      <span key={t} className="text-xs bg-[#161b22] border border-slate-700/70 text-slate-400 px-2 py-0.5 rounded">
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
      <section id="opensource" className="bg-[#0d1117] border-y border-slate-800 py-24">
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
                <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-6 hover:border-lime-400/40 transition-all h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-base font-bold text-white font-mono">{pkg.name}</h3>
                    <div className="flex gap-2">
                      <a href={pkg.github} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#161b22] border border-slate-700/60 hover:border-slate-500 transition-colors text-slate-400 hover:text-white">
                        <FaGithub className="w-4 h-4" />
                      </a>
                      <a href={pkg.pypi} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#161b22] border border-slate-700/60 hover:border-slate-500 transition-colors text-slate-400 hover:text-lime-400">
                        <Package className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{pkg.description}</p>

                  {/* Install command */}
                  <div className="bg-[#070a10] border border-slate-700/50 rounded-lg px-4 py-2.5 font-mono text-xs text-lime-400 flex items-center gap-2 mb-4">
                    <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    {pkg.install}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {pkg.tags.map(t => (
                      <span key={t} className="text-xs bg-[#161b22] border border-slate-700/70 text-slate-400 px-2 py-0.5 rounded">
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
            <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-8 mb-8">
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
      <footer className="border-t border-slate-800 py-6 text-center">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Isaac Kyalo · Nairobi, Kenya · Built with Next.js & Tailwind
        </p>
      </footer>
    </main>
  )
}
