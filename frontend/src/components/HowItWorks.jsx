const steps = [
  { n: "01", title: "Pick a skill & level", desc: "Choose from 8 curated tracks or type any skill. Tell us if you're starting fresh or leveling up." },
  { n: "02", title: "Get your sprint plan", desc: "AI generates a week-by-week roadmap with a study guide and resources for every milestone." },
  { n: "03", title: "Learn, quiz, repeat", desc: "Work through each week, then prove it with an AI-generated milestone quiz before moving on." },
  { n: "04", title: "Earn your certificate", desc: "Finish the timeline with 60%+ quiz accuracy and claim your mastery certificate." },
]

function HowItWorks() {
  return (
    <section id="how" className="reveal bg-transparent py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-14">
        <div>
          <p className="font-mono text-[11px] text-slate-400 uppercase tracking-[0.25em] mb-4">02 / Process</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4 font-heading">
            From zero to certified in <span className="gradient-text">four steps.</span>
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-sm font-medium">
            No endless course catalogs. One clear path per skill, one week at a time.
          </p>
        </div>

        <div className="ml-2">
          {steps.map((s, i) => (
            <div key={s.n} className={`relative pl-10 border-l ${i === steps.length - 1 ? "border-transparent" : "border-slate-200 pb-10"}`}>
              <span className="absolute -left-[13px] top-0 w-[26px] h-[26px] rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center shadow-xs">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              </span>
              <p className="font-mono text-[10px] text-indigo-600 font-bold tracking-[0.25em] mb-1">STEP {s.n}</p>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 font-heading">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
