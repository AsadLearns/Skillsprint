const testimonials = [
  {
    name: "Ayesha R.",
    role: "Self-taught frontend dev",
    avatar: "👩‍💻",
    quote: "The AI roadmap broke React down into weekly chunks I could actually finish. Went from zero to my first freelance gig in 6 weeks.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "Daniyal K.",
    role: "CS student",
    avatar: "🧑‍🎓",
    quote: "Sprinty catching me up mid-roadmap and quizzing me at each milestone is what actually kept me consistent instead of dropping off.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Meera S.",
    role: "Career switcher, Python/AI",
    avatar: "👩‍🔬",
    quote: "Earning the mastery certificate after hitting 100% + passing the quiz felt like a real milestone, not just a progress bar.",
    color: "from-pink-500 to-rose-600",
  },
]

function Testimonials() {
  return (
    <section className="bg-[#080512] border-y border-white/[0.04] py-24 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10">
        <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest">Wall of love</span>
        <h2 className="text-4xl font-extrabold text-slate-100 mt-3">
          Learners are <span className="gradient-text">sprinting ahead</span>
        </h2>
        <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto">
          Real feedback from people who turned a roadmap into a skill.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className={`glass-panel card-hover rounded-2xl p-6 flex flex-col animate-slide-up ${i === 1 ? "animation-delay-200" : i === 2 ? "animation-delay-300" : ""}`}
          >
            <div className="text-amber-400 text-sm mb-4">★★★★★</div>
            <p className="text-slate-300 text-sm leading-relaxed font-medium flex-1">"{t.quote}"</p>
            <div className="flex items-center gap-3 mt-6">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-xl shrink-0`}>
                {t.avatar}
              </div>
              <div>
                <div className="text-slate-100 font-bold text-sm">{t.name}</div>
                <div className="text-slate-500 text-xs font-medium">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
