import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  ReactIcon,
  PythonIcon,
  TypeScriptIcon,
  RustIcon,
  GoIcon,
  PostgresIcon,
  KubernetesIcon,
  AiModelIcon,
} from "./TechIcons"

const skillCategories = [
  { id: "all", name: "All Disciplines" },
  { id: "frontend", name: "Frontend Architecture" },
  { id: "backend", name: "Distributed Backend" },
  { id: "ai", name: "AI & Vector Systems" },
  { id: "cloud", name: "Infrastructure & Cloud" },
  { id: "systems", name: "Low-Level & Systems" },
]

const skillsData = [
  {
    name: "React 19 & Concurrent Architecture",
    category: "frontend",
    IconComponent: ReactIcon,
    spec: "SPEC: REACT-19.0",
    badge: "CORE TRACK",
    badgeColor: "text-cyan-700 border-cyan-200 bg-cyan-50",
    weeks: "6 WEEKS",
    milestones: 8,
    level: "Intermediate - Senior",
    stack: ["Server Components", "Suspense SSR", "Actions", "TanStack"],
    desc: "Master React Server Components, hydration boundaries, streaming SSR pipelines, and optimistic state updates.",
    glow: "hover:border-cyan-300 hover:shadow-xl",
  },
  {
    name: "Go High-Concurrency Microservices",
    category: "backend",
    IconComponent: GoIcon,
    spec: "SPEC: GO-1.23-CSP",
    badge: "HIGH THROUGHPUT",
    badgeColor: "text-sky-700 border-sky-200 bg-sky-50",
    weeks: "8 WEEKS",
    milestones: 10,
    level: "Intermediate - Staff",
    stack: ["Goroutines", "Channels", "gRPC", "Memory Allocator"],
    desc: "Engineer network services with Go CSP concurrency primitives, lock-free sync, multiplexed gRPC streams, and memory profiling.",
    glow: "hover:border-sky-300 hover:shadow-xl",
  },
  {
    name: "Rust Systems & Memory Safety",
    category: "systems",
    IconComponent: RustIcon,
    spec: "SPEC: RUST-1.81",
    badge: "SYSTEMS KERNEL",
    badgeColor: "text-orange-700 border-orange-200 bg-orange-50",
    weeks: "10 WEEKS",
    milestones: 12,
    level: "Advanced",
    stack: ["Borrow Checker", "Lifetimes", "Tokio Async", "WASM"],
    desc: "Rigorous ownership semantics, zero-cost abstractions, multi-threaded Tokio async runtimes, and WebAssembly compilation targets.",
    glow: "hover:border-orange-300 hover:shadow-xl",
  },
  {
    name: "Generative AI & Autonomous RAG Systems",
    category: "ai",
    IconComponent: AiModelIcon,
    spec: "SPEC: LLM-RAG-2025",
    badge: "APPLIED AI",
    badgeColor: "text-purple-700 border-purple-200 bg-purple-50",
    weeks: "6 WEEKS",
    milestones: 8,
    level: "Advanced",
    stack: ["Gemini 2.5", "pgvector", "Hybrid Search", "Function Calling"],
    desc: "Architect enterprise RAG pipelines, dense embeddings, multi-hop reasoning agents, and latency-optimized streaming APIs.",
    glow: "hover:border-purple-300 hover:shadow-xl",
  },
  {
    name: "Python Full-Stack & Asynchronous APIs",
    category: "backend",
    IconComponent: PythonIcon,
    spec: "SPEC: PY-3.12-ASYNC",
    badge: "PRODUCTION API",
    badgeColor: "text-amber-700 border-amber-200 bg-amber-50",
    weeks: "8 WEEKS",
    milestones: 10,
    level: "All Levels",
    stack: ["FastAPI", "AsyncIO", "SQLAlchemy 2.0", "Celery Task Queue"],
    desc: "Modern asynchronous Python backends, Pydantic type validation, database connection pooling, and background task workers.",
    glow: "hover:border-amber-300 hover:shadow-xl",
  },
  {
    name: "Kubernetes & Cloud Infrastructure",
    category: "cloud",
    IconComponent: KubernetesIcon,
    spec: "SPEC: K8S-CLOUD-1.30",
    badge: "INFRA ARCHITECT",
    badgeColor: "text-blue-700 border-blue-200 bg-blue-50",
    weeks: "8 WEEKS",
    milestones: 8,
    level: "Advanced",
    stack: ["Containerd", "Helm Charts", "Ingress NGINX", "Prometheus"],
    desc: "Cluster orchestration, zero-downtime rolling rollouts, declarative GitOps pipelines, and production container security.",
    glow: "hover:border-blue-300 hover:shadow-xl",
  },
  {
    name: "TypeScript Compiler & Type-Level Design",
    category: "frontend",
    IconComponent: TypeScriptIcon,
    spec: "SPEC: TS-5.5-TYPE",
    badge: "TYPE SYSTEM",
    badgeColor: "text-indigo-700 border-indigo-200 bg-indigo-50",
    weeks: "4 WEEKS",
    milestones: 6,
    level: "Intermediate - Senior",
    stack: ["Conditional Types", "Template Literals", "Zod", "tRPC"],
    desc: "Turing-complete TypeScript type systems, distributive conditionals, schema inference, and end-to-end type-safe client APIs.",
    glow: "hover:border-indigo-300 hover:shadow-xl",
  },
  {
    name: "PostgreSQL Internals & Query Optimization",
    category: "backend",
    IconComponent: PostgresIcon,
    spec: "SPEC: PG-16-ENGINE",
    badge: "DATA ARCHITECTURE",
    badgeColor: "text-teal-700 border-teal-200 bg-teal-50",
    weeks: "6 WEEKS",
    milestones: 8,
    level: "Intermediate - Staff",
    stack: ["EXPLAIN ANALYZE", "B-Tree & GIN", "MVCC & WAL", "Partitioning"],
    desc: "Database engine internals, query execution planner, B-Tree and GIN indexing strategies, and table partitioning at scale.",
    glow: "hover:border-teal-300 hover:shadow-xl",
  },
]

const marqueeSkills = [
  "GO 1.23",
  "RUST 1.81",
  "REACT 19",
  "KUBERNETES",
  "POSTGRESQL 16",
  "TYPESCRIPT 5.5",
  "DOCKER CONTAINERD",
  "GEMINI 2.5 FLASH",
  "FASTAPI ASYNC",
  "TOKIO RUNTIME",
  "GRPC PROTOBUF",
  "TERRAFORM",
  "REDIS CLUSTER",
  "NEXT.JS APP ROUTER",
  "WEBASSEMBLY",
  "APACHE KAFKA",
]

function ScrollSkillsShowcase() {
  const [selectedCat, setSelectedCat] = useState("all")
  const { user } = useAuth()
  const navigate = useNavigate()

  const filteredSkills = selectedCat === "all"
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCat)

  const handleStartSprint = (skillName) => {
    if (user) {
      navigate("/roadmap", { state: { autoSkill: skillName } })
    } else {
      navigate("/signup")
    }
  }

  return (
    <section id="skills-showcase" className="reveal py-24 px-6 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Scroll indicator prompt */}
      <div className="flex flex-col items-center justify-center -mt-32 mb-16 relative z-20">
        <a
          href="#skills-showcase"
          className="group flex flex-col items-center gap-2 text-slate-500 hover:text-slate-900 transition-all duration-300 cursor-pointer"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-indigo-700 font-bold bg-white px-4 py-1.5 rounded-full border border-indigo-200 shadow-sm group-hover:border-indigo-400 transition-colors">
            SCROLL TO EXPLORE ARCHITECTURE TRACKS ↓
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 group-hover:border-indigo-500 p-1 flex justify-center transition-colors">
            <div className="w-1.5 h-2.5 bg-indigo-600 rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 mb-12">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-indigo-600 font-bold block mb-2">
              // PRODUCTION CURRICULUMS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight font-heading">
              Engineered for <span className="gradient-text">Real Production</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-md font-medium">
            Autonomous milestone graphs modeled after real enterprise engineering stacks. Backed by concept quizzes and verifiable code evaluations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCat === cat.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {filteredSkills.map((s) => {
            const Icon = s.IconComponent
            return (
              <div
                key={s.name}
                className={`surface-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${s.glow} group`}
              >
                <div>
                  {/* Top Bar: Official Tech SVG + Spec Pill */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider border ${s.badgeColor}`}>
                      {s.badge}
                    </span>
                  </div>

                  {/* Spec telemetry code */}
                  <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">
                    {s.spec}
                  </p>

                  <h3 className="text-base font-extrabold text-slate-950 group-hover:text-indigo-600 transition-colors mb-2 leading-snug font-heading">
                    {s.name}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4 font-normal">
                    {s.desc}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {s.stack.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-100 pt-4 mb-4">
                    <span className="font-semibold text-slate-700">{s.weeks}</span>
                    <span className="text-indigo-600 font-bold">{s.milestones} MILESTONES</span>
                  </div>

                  <button
                    onClick={() => handleStartSprint(s.name)}
                    className="w-full bg-slate-100 hover:bg-indigo-600 hover:text-white border border-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group-hover:shadow-md"
                  >
                    <span>Launch Curriculum</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* High-Tech Infinite Horizontal Marquee */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 overflow-hidden relative shadow-xs">
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-3 whitespace-nowrap animate-marquee">
            {marqueeSkills.concat(marqueeSkills).map((item, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-mono font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default shadow-xs"
              >
                <span className="text-slate-400 mr-1.5">//</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollSkillsShowcase
