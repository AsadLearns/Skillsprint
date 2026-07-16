const testimonials = [
  {
    name: "Ayesha R.",
    initials: "AR",
    role: "Self-taught frontend dev",
    quote: "The AI roadmap broke React down into weekly chunks I could actually finish. Went from zero to my first freelance gig in 6 weeks.",
  },
  {
    name: "Daniyal K.",
    initials: "DK",
    role: "CS student",
    quote: "Sprinty catching me up mid-roadmap and quizzing me at each milestone is what actually kept me consistent instead of dropping off.",
  },
  {
    name: "Meera S.",
    initials: "MS",
    role: "Career switcher, Python/AI",
    quote: "Earning the mastery certificate after hitting 100% + passing the quiz felt like a real milestone, not just a progress bar.",
  },
]

function Testimonials() {
  return (
    <section className="bg-[#0d0d0e] border-y border-white/[0.04] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 border-b border-white/[0.06] pb-5 mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            What learners <span className="text-emerald-400">say</span>
          </h2>
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-[0.25em] shrink-0 hidden sm:block">03 / Testimonials</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-xl border border-white/[0.07] bg-[#0a0a0a] p-6 flex flex-col hover:border-white/[0.16] transition-colors duration-300">
              <blockquote className="text-[15px] text-slate-300 leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-white/[0.12] bg-white/[0.04] flex items-center justify-center font-mono text-xs text-slate-300 shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-100">{t.name}</p>
                  <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
