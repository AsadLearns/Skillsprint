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
      className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 shadow-xs overflow-hidden"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-200 bg-white">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-700 font-bold">
          Generating{skill ? ` · ${skill}` : ""}
        </p>
      </div>

      <div className="p-5">
        {/* Screen readers get the plain status; the skeleton is decorative. */}
        <p className="font-mono text-[12px] text-slate-700 font-bold mb-5">
          {stages[stage]}
          <span aria-hidden="true" className="text-indigo-600 font-bold">…</span>
        </p>

        <div aria-hidden="true" className="space-y-2.5">
          {weeks.map((w, i) => (
            <div
              key={w}
              className="flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <span className="font-mono text-[11px] text-slate-500 font-bold w-7 shrink-0">W{w}</span>
              <span
                className="h-2.5 rounded-full flex-1 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-shimmer-bar"
                style={{ animationDelay: `${i * 180}ms` }}
              ></span>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-slate-500 mt-5 uppercase tracking-wider font-medium">
          Usually about 10 seconds
        </p>
      </div>
    </div>
  )
}

export default RoadmapGenerating
