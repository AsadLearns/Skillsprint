import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import ThreeWelcomeCanvas from "./ThreeWelcomeCanvas"

const weeks = [
  { n: 1, topic: "Architecture, AST & Virtual DOM", state: "done" },
  { n: 2, topic: "Concurrent Mode & State Lifecycles", state: "active", pct: 65 },
  { n: 3, topic: "Streaming SSR & Hydration Boundary", state: "locked" },
  { n: 4, topic: "Memory Profiling & Bundle Optimization", state: "locked" }
]

const skills = [
  "Go Systems",
  "Rust Core",
  "React 19",
  "Kubernetes",
  "PostgreSQL",
  "TypeScript",
  "FastAPI",
  "LLM / RAG"
]

function Hero() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [heroMode, setHeroMode] = useState("3d") // "3d" or "terminal"
  const handleStart = () => navigate(user ? "/dashboard" : "/signup")

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white text-slate-900">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>

      {/* Ambient background soft glow */}
      <div className="absolute top-0 right-0 w-[450px] h-[350px] bg-indigo-500/[0.08] rounded-full blur-[100px] pointer-events-none lg:w-[750px] lg:h-[450px] lg:blur-[140px]"></div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left: copy */}
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] bg-indigo-50 border border-indigo-200/80 text-indigo-700 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>ENGINEERING CURRICULUM // AUTONOMOUS ROADMAPS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6 text-slate-950 font-heading">
            Stop collecting tutorials. <br className="hidden sm:inline" />
            <span className="gradient-text">Master production engineering.</span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-lg mb-8 font-medium">
            Select an engineering track. Receive an autonomous milestone graph, prove conceptual mastery through verified technical evaluations, and generate cryptographic proof of proficiency.
          </p>

          <div className="flex items-center gap-3.5 flex-wrap mb-8">
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-md hover:shadow-indigo-500/25 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              Start your first sprint →
            </button>
            <a
              href="#prompt-builder"
              className="border border-slate-300 bg-white hover:bg-slate-50 hover:border-indigo-300 text-slate-800 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 inline-flex items-center gap-2.5 shadow-sm"
            >
              <svg className="w-4 h-4 fill-indigo-600" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>AI Prompt Builder</span>
            </a>
            <Link
              to="/how-it-works"
              className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 inline-block shadow-sm"
            >
              Architecture
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 font-medium">
            <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Free Forever</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-indigo-600 font-bold">✓</span> No Card Required</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-cyan-600 font-bold">✓</span> Production Stacks</span>
          </div>
        </div>

        {/* Right: Interactive 3D Hologram or Terminal Mockup */}
        <div className="relative">
          <div className="animate-slide-up animation-delay-200">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">Interactive Stage</span>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-slate-200 shadow-sm">
                <button
                  onClick={() => setHeroMode("3d")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    heroMode === "3d" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  3D Topology
                </button>
                <button
                  onClick={() => setHeroMode("terminal")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    heroMode === "terminal" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Live CLI
                </button>
              </div>
            </div>

            {heroMode === "3d" ? (
              <div className="surface-card rounded-3xl border border-slate-200 bg-white p-4 overflow-hidden shadow-xl relative group">
                <ThreeWelcomeCanvas />
              </div>
            ) : (
              <div className="surface-card rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-800 bg-slate-900/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
                  <span className="ml-3 font-mono text-[10px] text-slate-400 font-semibold">skillsprint-cli — v2.4.0</span>
                </div>
                <div className="p-5 font-mono text-[12px] md:text-[13px] text-slate-200">
                  <p className="text-slate-400 mb-1.5">
                    $ <span className="text-cyan-400 font-bold">sprint compile</span>{" "}
                    <span className="text-cyan-400">--track</span> react-systems{" "}
                    <span className="text-cyan-400">--tier</span> senior
                  </p>
                  <p className="text-indigo-400 mb-4 font-bold">✓ 4-week dependency graph resolved</p>

                  <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                    {weeks.map((w, i) => (
                      <div
                        key={w.n}
                        className="flex items-center gap-3 py-2.5 animate-slide-up"
                        style={{ animationDelay: `${300 + i * 120}ms` }}
                      >
                        <span className="text-slate-500 font-mono w-7 shrink-0">W{w.n}</span>
                        <span className={w.state === "active" ? "text-white font-bold" : "text-slate-400"}>
                          {w.topic}
                        </span>
                        {w.state === "done" && (
                          <span className="ml-auto text-emerald-400 shrink-0 font-bold">done ✓</span>
                        )}
                        {w.state === "active" && (
                          <span className="ml-auto flex items-center gap-2 shrink-0">
                            <span className="w-16 h-1.5 bg-white/[0.1] rounded-full overflow-hidden">
                              <span className="block w-[65%] h-full bg-indigo-500 rounded-full shadow-glow-sm"></span>
                            </span>
                            <span className="text-indigo-400 font-bold">{w.pct}%</span>
                          </span>
                        )}
                        {w.state === "locked" && (
                          <span className="ml-auto text-slate-600 shrink-0 font-mono">queued</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-500 mt-4 font-mono">
                    ${" "}
                    <span aria-hidden="true" className="inline-block w-2 h-4 bg-cyan-400 align-middle animate-blink"></span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* floating quiz chip */}
          <div className="absolute -bottom-5 -left-3 md:-left-7 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl backdrop-blur-xl animate-slide-up animation-delay-500">
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Runtime Evaluation</p>
            <p className="text-sm font-black text-emerald-600">PASSED · 92% VERIFIED</p>
          </div>
        </div>
      </div>

      {/* Specialized Skills Ribbon */}
      <div className="border-t border-slate-200 bg-white/90 backdrop-blur-md py-4 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 shrink-0 flex items-center gap-2 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
            Specialized Tracks:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 cursor-default"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero