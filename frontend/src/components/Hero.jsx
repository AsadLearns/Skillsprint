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
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-400 mb-6">
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
              className="bg-white text-slate-950 hover:bg-slate-200 px-6 py-3 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
            >
              Start your first sprint
            </button>
            <Link
              to="/how-it-works"
              className="border border-white/[0.12] text-slate-300 hover:bg-white/[0.06] px-6 py-3 rounded-lg font-semibold text-sm transition-colors inline-block"
            >
              See how it works
            </Link>
          </div>
          <p className="font-mono text-[11px] text-slate-500 tracking-[0.15em] uppercase">
            Free forever · No credit card · 8+ skill tracks
          </p>
        </div>

        {/* Right: terminal-style product mockup */}
        <div className="relative">
          <div className="rounded-xl border border-white/[0.08] bg-[#131d33] shadow-2xl shadow-black/60 overflow-hidden animate-slide-up animation-delay-200">
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

          {/* floating quiz chip */}
          <div className="absolute -bottom-5 -left-3 md:-left-7 rounded-lg border border-white/[0.08] bg-[#131d33] px-4 py-3 shadow-xl shadow-black/50 animate-slide-up animation-delay-500">
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Milestone quiz</p>
            <p className="text-sm font-bold text-accent-400">Passed · 80%</p>
          </div>
        </div>
      </div>

      {/* Skills marquee strip */}
    </section>
  )
}

export default Hero