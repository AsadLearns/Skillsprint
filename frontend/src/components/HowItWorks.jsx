const steps = [
  { n: "01", title: "Sign up free", desc: "Create your account in 30 seconds. No credit card needed.", icon: "👤", color: "from-purple-500 to-purple-700" },
  { n: "02", title: "Pick a skill", desc: "Choose from Java, Python, React, Web Dev, AI/ML, and more.", icon: "🎯", color: "from-blue-500 to-blue-700" },
  { n: "03", title: "Get your roadmap", desc: "AI generates a personalised week-by-week plan just for you.", icon: "🤖", color: "from-pink-500 to-rose-600" },
  { n: "04", title: "Track & quiz", desc: "Complete milestones, take quizzes, and earn badges as you grow.", icon: "🏆", color: "from-emerald-500 to-teal-600" },
]

function HowItWorks() {
  return (
    <section id="how" className="bg-[#030008] py-24 px-6 relative overflow-hidden">
      {/* Drifting Neon Blobs for depth */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10">
        <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest">The process</span>
        <h2 className="text-4xl font-extrabold text-slate-100 mt-3">
          How it <span className="gradient-text">works</span>
        </h2>
        <p className="text-slate-400 mt-4 text-lg">From zero to skilled in four simple steps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative z-10">
        <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-900/60 via-pink-900/60 to-emerald-900/60 z-0"></div>

        {steps.map((s, i) => (
          <div key={s.n} className="step-card text-center relative z-10">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} text-white text-4xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
              {s.icon}
            </div>
            <div className={`inline-block text-xs font-bold bg-gradient-to-r ${s.color} text-transparent bg-clip-text mb-2`}>
              STEP {s.n}
            </div>
            <h3 className="font-bold text-slate-100 text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks