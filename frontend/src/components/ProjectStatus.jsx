const shipped = [
  "AI roadmap generation for any skill and level",
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
    <section className="reveal bg-[#0f1729]/55 border-y border-white/[0.04] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 border-b border-white/[0.06] pb-5 mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            No testimonials <span className="text-accent-400">yet</span>
          </h2>
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-[0.25em] shrink-0 hidden sm:block">03 / Status</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4">
          <div className="rounded-xl border border-white/[0.07] bg-[#0b1220] p-6 md:p-8">
            <p className="text-[15px] text-slate-300 leading-relaxed">
              This is a side project built by one person, and it launched recently — so
              there are no real user quotes to put here. Rather than invent some, here is
              what actually works today and what is still missing.
            </p>
            <p className="text-[15px] text-slate-400 leading-relaxed mt-4">
              If you use it and something breaks or feels wrong, that feedback is genuinely
              useful. The list below moves based on it.
            </p>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-8 pt-5 border-t border-white/[0.06]">
              Asad · solo maintainer
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-xl border border-white/[0.07] bg-[#0b1220] p-6">
              <p className="font-mono text-[10px] text-accent-400/80 tracking-[0.25em] mb-4">SHIPPED</p>
              <ul className="space-y-2.5">
                {shipped.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                    <span aria-hidden="true" className="text-accent-400 font-mono shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-[#0b1220] p-6">
              <p className="font-mono text-[10px] text-slate-500 tracking-[0.25em] mb-4">NEXT UP</p>
              <ul className="space-y-2.5">
                {next.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <span aria-hidden="true" className="text-slate-600 font-mono shrink-0">○</span>
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
