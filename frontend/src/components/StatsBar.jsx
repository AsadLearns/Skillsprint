import AnimatedCounter from "./AnimatedCounter"

const stats = [
  { value: 2400, suffix: "+", label: "Active learners", delay: "animation-delay-100" },
  { value: 8600, suffix: "+", label: "Roadmaps generated", delay: "animation-delay-200" },
  { value: 15200, suffix: "+", label: "Quizzes completed", delay: "animation-delay-300" },
  { value: 98, suffix: "%", label: "Would recommend", delay: "animation-delay-500" },
]

function StatsBar() {
  return (
    <section className="bg-[#030008] border-b border-white/[0.04] py-14 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative z-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`text-center animate-slide-up ${s.delay}`}
          >
            <div className="text-3xl md:text-4xl font-black gradient-text">
              <AnimatedCounter value={s.value} suffix={s.suffix} duration={1500} />
            </div>
            <p className="text-slate-400 text-sm font-medium mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsBar
