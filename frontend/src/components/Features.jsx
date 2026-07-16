const card = "rounded-xl border border-white/[0.07] bg-[#0a0a0a] p-6 hover:border-white/[0.16] transition-colors duration-300"
const num = "font-mono text-[10px] text-emerald-400/80 tracking-[0.25em] mb-3"
const title = "text-lg font-bold text-slate-100 mb-1.5"
const desc = "text-sm text-slate-400 leading-relaxed"

function Features() {
  return (
    <section id="features" className="bg-[#0d0d0e] border-y border-white/[0.04] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 border-b border-white/[0.06] pb-5 mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Built to get you to <span className="text-emerald-400">done</span>
          </h2>
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-[0.25em] shrink-0 hidden sm:block">01 / Features</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* AI Roadmaps — wide card */}
          <div className={`${card} md:col-span-2`}>
            <p className={num}>01</p>
            <h3 className={title}>Type any skill, get a week-by-week plan</h3>
            <p className={desc}>No more guessing what to learn next. Every week has a topic, an AI study guide, and clear resources.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
              {["Setup & JSX", "Hooks & State", "Routing & APIs", "Ship it"].map((t, i) => (
                <div key={t} className={`rounded-lg border p-3 ${i === 0 ? "border-emerald-500/40 bg-emerald-500/[0.07]" : "border-white/[0.06]"}`}>
                  <p className="font-mono text-[9px] text-slate-500 mb-1">WEEK {i + 1}</p>
                  <p className={`text-[11px] font-semibold ${i === 0 ? "text-emerald-300" : "text-slate-400"}`}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quizzes */}
          <div className={card}>
            <p className={num}>02</p>
            <h3 className={title}>Prove it before you move on</h3>
            <p className={desc}>Auto-generated milestone quizzes with instant scoring and answer review.</p>
            <div className="mt-6 space-y-2 font-mono text-[11px]">
              <p className="text-slate-500 mb-2.5">Which hook memoizes a value?</p>
              {[
                { opt: "A. useEffect", correct: false },
                { opt: "B. useMemo ✓", correct: true },
                { opt: "C. useRef", correct: false },
              ].map((o) => (
                <div key={o.opt} className={`rounded-lg border px-3 py-2 ${o.correct ? "border-emerald-500/40 bg-emerald-500/[0.07] text-emerald-300" : "border-white/[0.06] text-slate-500"}`}>
                  {o.opt}
                </div>
              ))}
            </div>
          </div>

          {/* Progress & streaks */}
          <div className={card}>
            <p className={num}>03</p>
            <h3 className={title}>See yourself actually finishing</h3>
            <p className={desc}>Streaks, completion rates, and quiz averages across every active sprint.</p>
            <div className="flex items-end gap-1.5 mt-6 h-14">
              {[5, 7, 6, 9, 8, 11, 14].map((h, i) => (
                <div key={i} className={`flex-1 rounded-sm ${i === 6 ? "bg-emerald-500" : "bg-white/[0.08]"}`} style={{ height: `${h * 4}px` }}></div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-emerald-400 tracking-wider mt-2.5">12-DAY STREAK</p>
          </div>

          {/* Sprinty */}
          <div className={card}>
            <p className={num}>04</p>
            <h3 className={title}>An AI guide that knows your goals</h3>
            <p className={desc}>Chat with Sprinty to find your next skill — it can generate a roadmap right from the conversation.</p>
            <div className="mt-6 space-y-2 text-[11px]">
              <div className="rounded-lg rounded-br-sm bg-white/[0.04] border border-white/[0.06] px-3 py-2 text-slate-300 ml-8">
                what should I learn for backend?
              </div>
              <div className="rounded-lg rounded-bl-sm bg-emerald-500/[0.07] border border-emerald-500/20 px-3 py-2 text-emerald-200 mr-8">
                Node.js — 4-week sprint. <span className="underline underline-offset-2">Launch roadmap →</span>
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div className={card}>
            <p className={num}>05</p>
            <h3 className={title}>Finish with something to show</h3>
            <p className={desc}>Complete the timeline and pass the final quiz at 60%+ to unlock a mastery certificate.</p>
            <div className="mt-6 rounded-lg border border-white/[0.09] bg-white/[0.02] p-4 text-center">
              <p className="font-mono text-[9px] tracking-[0.3em] text-emerald-400 uppercase mb-1.5">Certificate of Mastery</p>
              <p className="text-sm font-bold text-slate-100">React · Intermediate</p>
              <p className="font-mono text-[9px] text-slate-500 mt-1.5">100% COMPLETE · QUIZ 80%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
