import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const skillCategories = [
  { id: "all", name: "All Domains" },
  { id: "frontend", name: "🎨 Frontend & UI" },
  { id: "backend", name: "⚙️ Backend & APIs" },
  { id: "ai", name: "🤖 AI & Machine Learning" },
  { id: "devops", name: "☁️ Cloud & DevOps" },
  { id: "systems", name: "⚡ Systems & Mobile" },
]

const skillsData = [
  {
    name: "React 19 & Next.js",
    category: "frontend",
    icon: "⚛️",
    badge: "POPULAR",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    weeks: "4 - 8 WEEKS",
    milestones: 8,
    level: "Intermediate",
    desc: "Master Server Components, Suspense, client state, and full-stack React architectures.",
    glow: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
  },
  {
    name: "Python Full-Stack",
    category: "backend",
    icon: "🐍",
    badge: "RECOMMENDED",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    weeks: "6 - 12 WEEKS",
    milestones: 12,
    level: "All Levels",
    desc: "From Python fundamentals to FastAPI, asynchronous programming, and PostgreSQL integration.",
    glow: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
  },
  {
    name: "Generative AI & LLMs",
    category: "ai",
    icon: "🤖",
    badge: "HIGH DEMAND",
    badgeColor: "text-accent-400 border-accent-500/30 bg-accent-500/10",
    weeks: "4 - 8 WEEKS",
    milestones: 8,
    level: "Advanced",
    desc: "Harness Gemini API, RAG vector pipelines, embeddings, prompt engineering, and autonomous agents.",
    glow: "hover:border-accent-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]",
  },
  {
    name: "Node.js & Express",
    category: "backend",
    icon: "🟢",
    badge: "ESSENTIAL",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    weeks: "4 - 6 WEEKS",
    milestones: 6,
    level: "Intermediate",
    desc: "Build secure REST APIs, JWT authentication, rate limiting, and MongoDB schema design.",
    glow: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  },
  {
    name: "Docker & Kubernetes",
    category: "devops",
    icon: "🐳",
    badge: "DEVOPS PRO",
    badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    weeks: "6 - 8 WEEKS",
    milestones: 8,
    level: "Advanced",
    desc: "Containerize multi-tier apps, write Helm charts, manage cluster deployments and CI/CD pipelines.",
    glow: "hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
  },
  {
    name: "Rust & High-Perf Systems",
    category: "systems",
    icon: "🦀",
    badge: "CUTTING EDGE",
    badgeColor: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    weeks: "8 - 12 WEEKS",
    milestones: 12,
    level: "Advanced",
    desc: "Ownership model, memory safety without GC, multi-threading, and WebAssembly compilation.",
    glow: "hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]",
  },
  {
    name: "Modern TypeScript & Vue",
    category: "frontend",
    icon: "⚡",
    badge: "TRENDING",
    badgeColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    weeks: "4 - 6 WEEKS",
    milestones: 6,
    level: "Beginner - Intermediate",
    desc: "Composition API, Pinia state, strict TypeScript type guards, and Vite build optimizations.",
    glow: "hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]",
  },
  {
    name: "Flutter & Cross-Platform",
    category: "systems",
    icon: "📱",
    badge: "MOBILE TRACK",
    badgeColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    weeks: "6 - 10 WEEKS",
    milestones: 10,
    level: "Intermediate",
    desc: "Dart language mechanics, responsive UI widgets, offline caching, and cross-platform native compilation.",
    glow: "hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]",
  },
]

const marqueeSkills = [
  "React 19", "Python 3.12", "TypeScript", "Node.js", "Docker", "Kubernetes",
  "PostgreSQL", "MongoDB", "Rust", "Go (Golang)", "FastAPI", "Tailwind CSS",
  "Next.js", "Gemini 2.5", "PyTorch", "GraphQL", "Redis", "AWS Cloud",
  "Vite", "Flutter", "Linux DevOps", "Git & CI/CD", "WebAssembly", "Supabase"
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
    <section id="skills-showcase" className="reveal py-24 px-6 bg-[#080d19]/80 border-t border-white/[0.05] relative overflow-hidden">
      {/* Scroll indicator prompt at the top of this section */}
      <div className="flex flex-col items-center justify-center -mt-32 mb-16 relative z-20">
        <a
          href="#skills-showcase"
          className="group flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-300 font-bold bg-[#0c1324]/80 px-4 py-1.5 rounded-full border border-accent-500/30 shadow-glow-sm group-hover:border-accent-500/60 transition-colors">
            Scroll down to explore skills ↓
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/[0.2] group-hover:border-accent-400 p-1 flex justify-center transition-colors">
            <div className="w-1.5 h-2.5 bg-accent-400 rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.06] mb-12">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyber-400 font-bold block mb-2">
              // TECHNICAL CURRICULUMS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight">
              Conquer Any <span className="gradient-text">Tech Stack</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-md font-medium">
            AI-architected milestones tailored for junior to staff-level engineers. Complete with verified quizzes and weekly study materials.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                selectedCat === cat.id
                  ? "bg-gradient-to-r from-accent-500 to-indigo-600 text-white shadow-glow-sm"
                  : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3D Perspective Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {filteredSkills.map((s, idx) => (
            <div
              key={s.name}
              className={`surface-card rounded-2xl border border-white/[0.08] bg-[#0c1324]/80 p-6 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${s.glow} group`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span className="text-3xl p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">{s.icon}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-100 group-hover:text-white transition-colors mb-2">
                  {s.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
                  {s.desc}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/[0.06] pt-4 mb-4">
                  <span className="flex items-center gap-1">⏱️ {s.weeks}</span>
                  <span className="text-accent-400 font-semibold">{s.milestones} MILESTONES</span>
                </div>

                <button
                  onClick={() => handleStartSprint(s.name)}
                  className="w-full bg-white/[0.04] hover:bg-gradient-to-r hover:from-accent-500 hover:to-indigo-600 hover:text-white hover:border-transparent border border-white/[0.1] text-slate-200 text-xs font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group-hover:shadow-glow-sm"
                >
                  <span>Launch Sprint</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Infinite Horizontal Marquee */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#070b14]/90 p-5 overflow-hidden relative">
          <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#070b14] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#070b14] to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-3 whitespace-nowrap animate-marquee">
            {marqueeSkills.concat(marqueeSkills).map((item, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-mono font-semibold hover:border-accent-500/40 hover:text-accent-300 transition-colors cursor-default"
              >
                ⚡ {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollSkillsShowcase
