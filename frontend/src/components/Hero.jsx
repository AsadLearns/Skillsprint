import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const weeks = [
  { n: 1, topic: "Components & JSX", state: "done" },
  { n: 2, topic: "Hooks & State", state: "active", pct: 45 },
  { n: 3, topic: "Routing & Data Fetching", state: "locked" },
  { n: 4, topic: "Testing & Deployment", state: "locked" }
]

const skills = ["React", "Python", "Java", "Web Dev", "Node.js", "AI/ML", "MongoDB", "DevOps"]

function Hero() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const handleStart = () => navigate(user ? "/dashboard" : "/signup")

  return (
    <section className="grid-bg relative overflow-hidden">
      {/* The cloud layer is mounted once in App and fixed behind the whole
          site, so this section stays transparent to let it through. Copy sits
          over the left, which is the busiest part of the effect — keep a
          gradient here so the headline never fights a bright cloud. */}
      {/* The desktop scrim fades left-to-right because the copy sits on the
          left. On mobile the copy spans the full width, so a horizontal fade
          leaves the right-hand side of every line sitting on bright cloud —
          measurably unreadable. Small screens get a vertical fade instead. */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0b1220]/40 via-[#0b1220]/85 to-[#0b1220]/70 md:bg-gradient-to-r md:from-[#0b1220] md:via-[#0b1220]/55 md:to-transparent"></div>

      {/* single static glow — no drifting blobs */}
      <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-accent-500/[0.03] rounded-full blur-[80px] pointer-events-none sm:w-[400px] sm:h-[250px] sm:blur-[100px] lg:w-[600px] lg:h-[400px] lg:blur-[140px]"></div>

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-14 lg:gap-16 items-center relative z-10">
        {/* Left: copy */}
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] bg-accent-500/10 border border-accent-500/30 text-accent-300 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AI-Accelerated Learning Engine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6">
            <span className="text-slate-400">Stop collecting tutorials.</span>{" "}
            <br className="hidden sm:inline" />
            <span className="gradient-text">Start conquering skills.</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-sm mb-9">
            Pick a high-demand tech stack. Receive an intelligent milestone-driven roadmap, prove proficiency through interactive quizzes, and earn verifiable mastery certificates.
          </p>
          <div className="flex items-center gap-3.5 flex-wrap mb-9">
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-accent-500 via-indigo-500 to-cyber-500 hover:from-accent-400 hover:to-cyber-400 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              Start your first sprint →
            </button>
            <Link
              to="/how-it-works"
              className="border border-white/[0.12] bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] hover:border-white/[0.25] px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 inline-block backdrop-blur-md"
            >
              See how it works
            </Link>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Free Forever</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5"><span className="text-accent-400">✓</span> No Card Required</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5"><span className="text-cyber-400">✓</span> 8+ Pro Tracks</span>
          </div>
        </div>

        {/* Right: terminal-style product mockup */}
        <div className="relative">
          {/* Entrance animation lives on the wrapper, not on the card. A
              `both`-fill animation retains its end transform, and that
              overrides the card's own transform — putting them on the same
              element silently kills the pointer tilt. */}
          <div className="animate-slide-up animation-delay-200">
          <div className="surface-card rounded-xl border border-white/[0.08] bg-[#131d33] overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
              <span className="ml-3 font-mono text-[10px] text-slate-500">sprinty — react-sprint</span>
            </div>
            <div className="p-5 font-mono text-[12px] md:text-[13px]">
              <p className="text-slate-500 mb-1.5">
                $ <span className="text-sky-400">sprint new</span>{" "}
                <span className="text-sky-400">--skill</span> react{" "}
                <span className="text-sky-400">--level</span> intermediate
              </p>
              <p className="text-accent-400 mb-4">✓ 4-week roadmap generated</p>

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
                      <span className="ml-auto text-accent-400 shrink-0">done ✓</span>
                    )}
                    {w.state === "active" && (
                      <span className="ml-auto flex items-center gap-2 shrink-0">
                        <span className="w-16 h-1 bg-white/[0.07] rounded-full overflow-hidden">
                          <span className="block w-[45%] h-full bg-accent-500 rounded-full"></span>
                        </span>
                        <span className="text-accent-400">{w.pct}%</span>
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
          </div>

          {/* floating quiz chip */}
          <div className="absolute -bottom-5 -left-3 md:-left-7 rounded-lg border border-white/[0.08] bg-[#131d33] px-4 py-3 shadow-xl shadow-black/50 animate-slide-up animation-delay-500">
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Milestone quiz</p>
            <p className="text-sm font-bold text-accent-400">Passed · 80%</p>
          </div>
        </div>
      </div>

      {/* Specialized Skills Ribbon */}
      <div className="border-t border-white/[0.06] bg-[#070b16]/70 backdrop-blur-md py-4 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 shrink-0 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-ping"></span>
            Specialized Tracks:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:border-accent-500/40 hover:text-accent-300 hover:bg-accent-500/10 transition-all duration-300 cursor-default"
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