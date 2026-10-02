const card = "surface-card rounded-2xl border border-slate-200 bg-white p-7 hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group"
const num = "inline-block font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 tracking-[0.2em] mb-4"
const title = "text-xl font-extrabold text-slate-950 mb-2 group-hover:text-indigo-600 transition-colors font-heading"
const desc = "text-sm text-slate-600 leading-relaxed font-normal"

function Features() {
  return (
    <section id="features" className="reveal bg-white border-y border-slate-200 py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6 mb-12">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-indigo-600 font-bold block mb-2">// CAPABILITIES</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight font-heading">
              Engineered for <span className="gradient-text">high-velocity mastery</span>
            </h2>
          </div>
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-[0.25em] shrink-0 hidden sm:block font-bold">01 / Features</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* AI Roadmaps — wide card */}
          <div className={`${card} md:col-span-2`}>
            <p className={num}>01</p>
            <h3 className={title}>Type any skill, get a week-by-week plan</h3>
            <p className={desc}>No more guessing what to learn next. Every week has a topic, an AI study guide, and clear resources.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
              {["Setup & JSX", "Hooks & State", "Routing & APIs", "Ship it"].map((t, i) => (
                <div key={t} className={`rounded-xl border p-3 ${i === 0 ? "border-indigo-300 bg-indigo-50/80 shadow-xs" : "border-slate-200 bg-slate-50"}`}>
                  <p className="font-mono text-[9px] text-slate-500 mb-1 font-bold">WEEK {i + 1}</p>
                  <p className={`text-[11px] font-semibold ${i === 0 ? "text-indigo-700 font-bold" : "text-slate-700"}`}>{t}</p>
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
              <p className="text-slate-600 mb-2.5 font-bold">Which hook memoizes a value?</p>
              {[
                { opt: "A. useEffect", correct: false },
                { opt: "B. useMemo ✓", correct: true },
                { opt: "C. useRef", correct: false },
              ].map((o) => (
                <div key={o.opt} className={`rounded-lg border px-3 py-2 ${o.correct ? "border-indigo-300 bg-indigo-50 text-indigo-700 font-bold" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
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
                <div key={i} className={`flex-1 rounded-sm ${i === 6 ? "bg-indigo-600" : "bg-slate-200"}`} style={{ height: `${h * 4}px` }}></div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-indigo-600 tracking-wider mt-2.5 font-bold">12-DAY STREAK</p>
          </div>

          {/* Sprinty */}
          <div className={card}>
            <p className={num}>04</p>
            <h3 className={title}>An AI guide that knows your goals</h3>
            <p className={desc}>Chat with Sprinty to find your next skill — it can generate a roadmap right from the conversation.</p>
            <div className="mt-6 space-y-2 text-[11px]">
              <div className="rounded-lg rounded-br-sm bg-slate-100 border border-slate-200 px-3 py-2 text-slate-800 ml-8 shadow-xs">
                what should I learn for backend?
              </div>
              <div className="rounded-lg rounded-bl-sm bg-indigo-50 border border-indigo-200 px-3 py-2 text-indigo-800 font-semibold mr-8">
                Node.js — 4-week sprint. <span className="underline underline-offset-2">Launch roadmap →</span>
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div className={card}>
            <p className={num}>05</p>
            <h3 className={title}>Finish with something to show</h3>
            <p className={desc}>Complete the timeline and pass the final quiz at 60%+ to unlock a mastery certificate.</p>
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center shadow-xs">
              <p className="font-mono text-[9px] tracking-[0.3em] text-indigo-600 uppercase mb-1.5 font-bold">Certificate of Mastery</p>
              <p className="text-sm font-bold text-slate-900">React · Intermediate</p>
              <p className="font-mono text-[9px] text-slate-500 mt-1.5 font-semibold">100% COMPLETE · QUIZ 80%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
