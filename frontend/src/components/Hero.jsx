import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const weeks = [
  { n: 1, topic: "Components & JSX", state: "done" },
  { n: 2, topic: "Hooks & State", state: "active", pct: 45 },
  { n: 3, topic: "Routing & Data Fetching", state: "locked" },
  { n: 4, topic: "Testing & Deployment", state: "locked" },
]

const skills = ["React", "Python", "Java", "Web Dev", "Node.js", "AI/ML", "MongoDB", "DevOps"]

function Hero() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const handleStart = () => navigate(user ? "/dashboard" : "/signup")

  return (
    <section className="bg-[#0a0a0a] grid-bg relative overflow-hidden">
      {/* single static glow — no drifting blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-emerald-500/[0.05] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center relative z-10">
        {/* Left: copy */}
        <div className="animate-slide-up">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400 mb-6">
            {"// AI-powered learning sprints"}
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="text-slate-500">Stop collecting tutorials.</span>{" "}
            <span className="text-slate-100">Start finishing skills.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-9">
            Pick a skill. Get an AI-built weekly roadmap with study guides,
            milestone quizzes, and a certificate when you finish.
          </p>
          <div className="flex items-center gap-3 flex-wrap mb-9">
            <button
              onClick={handleStart}
              className="bg-white text-zinc-950 hover:bg-zinc-200 px-6 py-3 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
            >
              Start your first sprint
            </button>
            <a
              href="#how"
              className="border border-white/[0.12] text-slate-300 hover:bg-white/[0.06] px-6 py-3 rounded-lg font-semibold text-sm transition-colors inline-block"
            >
              See how it works
            </a>
          </div>
          <p className="font-mono text-[11px] text-slate-500 tracking-[0.15em] uppercase">
            Free forever · No credit card · 8+ skill tracks
          </p>
        </div>

        {/* Right: terminal-style product mockup */}
        <div className="relative">
          <div className="rounded-xl border border-white/[0.08] bg-[#0f0f10] shadow-2xl shadow-black/60 overflow-hidden animate-slide-up animation-delay-200">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
              <span className="ml-3 font-mono text-[10px] text-slate-500">sprinty — react-sprint</span>
            </div>
            <div className="p-5 font-mono text-[12px] md:text-[13px]">
              <p className="text-slate-500 mb-1.5">
                $ <span className="text-slate-100">sprint new</span>{" "}
                <span className="text-sky-400">--skill</span> react{" "}
                <span className="text-sky-400">--level</span> intermediate
              </p>
              <p className="text-emerald-400 mb-4">✓ 4-week roadmap generated</p>

              <div className="divide-y divide-white/[0.04] border-t border-white/[0.04]">
                {weeks.map((w, i) => (
                  <div
                    key={w.n}
                    className="flex items-center gap-3 py-2.5 animate-slide-up"
                    style={{ animationDelay: `${300 + i * 120}ms` }}
                  >
                    <span className="text-slate-600 w-7 shrink-0">W{w.n}</span>
                    <span className={w.state === "active" ? "text-slate-100" : "text-slate-400"}>
                      {w.topic}
                    </span>
                    {w.state === "done" && (
                      <span className="ml-auto text-emerald-400 shrink-0">done ✓</span>
                    )}
                    {w.state === "active" && (
                      <span className="ml-auto flex items-center gap-2 shrink-0">
                        <span className="w-16 h-1 bg-white/[0.07] rounded-full overflow-hidden">
                          <span className="block w-[45%] h-full bg-emerald-500 rounded-full"></span>
                        </span>
                        <span className="text-emerald-400">{w.pct}%</span>
                      </span>
                    )}
                    {w.state === "locked" && (
                      <span className="ml-auto text-slate-600 shrink-0">locked</span>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-slate-500 mt-4">
                ${" "}
                <span aria-hidden="true" className="inline-block w-2 h-4 bg-slate-300 align-middle animate-blink"></span>
              </p>
            </div>
          </div>

          {/* floating quiz chip */}
          <div className="absolute -bottom-5 -left-3 md:-left-7 rounded-lg border border-white/[0.08] bg-[#0f0f10] px-4 py-3 shadow-xl shadow-black/50 animate-slide-up animation-delay-500">
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Milestone quiz</p>
            <p className="text-sm font-bold text-emerald-400">Passed · 80%</p>
          </div>
        </div>
      </div>

      {/* Skills marquee strip */}
      <div id="skills" className="border-t border-white/[0.06] py-4 overflow-hidden whitespace-nowrap relative z-10 select-none">
        <div className="animate-marquee font-mono text-[11px] tracking-[0.3em] text-slate-600 uppercase">
          <span>{skills.join(" · ")} · </span>
          <span>{skills.join(" · ")} · </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
