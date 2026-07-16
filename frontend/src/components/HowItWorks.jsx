const steps = [
  { n: "01", title: "Pick a skill & level", desc: "Choose from 8 curated tracks or type any skill. Tell us if you're starting fresh or leveling up." },
  { n: "02", title: "Get your sprint plan", desc: "AI generates a week-by-week roadmap with a study guide and resources for every milestone." },
  { n: "03", title: "Learn, quiz, repeat", desc: "Work through each week, then prove it with an AI-generated milestone quiz before moving on." },
  { n: "04", title: "Earn your certificate", desc: "Finish the timeline with 60%+ quiz accuracy and claim your mastery certificate." },
]

function HowItWorks() {
  return (
    <section id="how" className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-14">
        <div>
          <p className="font-mono text-[11px] text-slate-500 uppercase tracking-[0.25em] mb-4">02 / Process</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight mb-4">
            From zero to certified in <span className="text-emerald-400">four steps.</span>
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            No endless course catalogs. One clear path per skill, one week at a time.
          </p>
        </div>

        <div className="ml-2">
          {steps.map((s, i) => (
            <div key={s.n} className={`relative pl-10 border-l ${i === steps.length - 1 ? "border-transparent" : "border-white/[0.08] pb-10"}`}>
              <span className="absolute -left-[13px] top-0 w-[26px] h-[26px] rounded-full bg-[#0a0a0a] border border-emerald-500/40 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </span>
              <p className="font-mono text-[10px] text-emerald-400/80 tracking-[0.25em] mb-1">STEP {s.n}</p>
              <h3 className="text-lg font-bold text-slate-100 mb-1.5">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
