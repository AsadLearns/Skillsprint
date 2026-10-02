const shipped = [
  "AI roadmap generation for any skill and level",
  "AI Prompt-to-Execution Builder for full-stack & secure MLOps/DevOps",
  "Auto-generated milestone quizzes with answer review",
  "Sprinty, the in-app assistant that can build a roadmap from chat",
  "Mastery certificates once the timeline and final quiz are done",
]

const next = [
  "Spaced-repetition review for topics you got wrong",
  "Shareable public profiles for finished sprints",
  "Resuming a sprint from where you actually left off, on any device",
]

function ProjectStatus() {
  return (
    <section className="reveal bg-slate-50/70 border-y border-slate-200 py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6 mb-12">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-indigo-600 font-bold block mb-2">// TRANSPARENCY</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Roadmap &amp; Project <span className="gradient-text">Telemetry</span>
            </h2>
          </div>
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-[0.25em] shrink-0 hidden sm:block font-bold">03 / Status</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5">
          <div className="surface-card rounded-2xl border border-slate-200 bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-bold uppercase tracking-wider mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> Live Release
              </div>
              <p className="text-base text-slate-700 leading-relaxed font-normal">
                Engineered for developers and students who want fast, zero-fluff structured skill acquisition. Built and maintained independently by Asad. Transparent about what is currently active and what is shipping next.
              </p>
            </div>
            <div className="font-mono text-[11px] text-slate-500 uppercase tracking-[0.2em] mt-8 pt-5 border-t border-slate-100 flex items-center justify-between font-semibold">
              <span>Asad · Creator</span>
              <span className="text-indigo-600 font-bold">v2.0 Active</span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="surface-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[10px] text-indigo-600 font-bold tracking-[0.25em]">DEPLOYED &amp; OPERATIONAL</p>
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              </div>
              <ul className="space-y-2.5">
                {shipped.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-700 leading-relaxed items-start">
                    <span aria-hidden="true" className="text-indigo-600 font-bold font-mono shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[10px] text-cyan-700 font-bold tracking-[0.25em]">IN ACTIVE DEVELOPMENT</p>
                <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
              </div>
              <ul className="space-y-2.5">
                {next.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-600 leading-relaxed items-start">
                    <span aria-hidden="true" className="text-cyan-600 font-bold font-mono shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectStatus
