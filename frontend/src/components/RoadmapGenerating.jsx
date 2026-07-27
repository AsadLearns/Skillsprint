import { useEffect, useState } from "react"

// Generation takes several seconds, so show the plan assembling rather than a
// bare spinner — the week rows are the actual shape of what is coming back.
const stages = [
  "Reading the skill and level",
  "Blocking out weekly milestones",
  "Picking resources for each week",
  "Writing the study guides",
  "Building the milestone quizzes",
]

function RoadmapGenerating({ duration = 4, skill }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // Walk forward and hold on the last one — never loop back to the start,
    // which would read as "it restarted" on a slow generation.
    const id = setInterval(() => {
      setStage((s) => (s < stages.length - 1 ? s + 1 : s))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  const weeks = Array.from({ length: duration }, (_, i) => i + 1)

  return (
    <div
      className="mt-5 rounded-xl border border-white/[0.08] bg-[#0f1729]/70 overflow-hidden"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse"></span>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-300">
          Generating{skill ? ` · ${skill}` : ""}
        </p>
      </div>

      <div className="p-5">
        {/* Screen readers get the plain status; the skeleton is decorative. */}
        <p className="font-mono text-[12px] text-slate-300 mb-5">
          {stages[stage]}
          <span aria-hidden="true" className="text-accent-400">…</span>
        </p>

        <div aria-hidden="true" className="space-y-2.5">
          {weeks.map((w, i) => (
            <div
              key={w}
              className="flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <span className="font-mono text-[11px] text-slate-600 w-7 shrink-0">W{w}</span>
              <span
                className="h-2.5 rounded-full flex-1 bg-gradient-to-r from-white/[0.10] via-white/[0.05] to-white/[0.10] bg-[length:200%_100%] animate-shimmer-bar"
                style={{ animationDelay: `${i * 180}ms` }}
              ></span>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-slate-500 mt-5 uppercase tracking-wider">
          Usually about 10 seconds
        </p>
      </div>
    </div>
  )
}

export default RoadmapGenerating
