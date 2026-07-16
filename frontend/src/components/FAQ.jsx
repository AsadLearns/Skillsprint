import { useState } from "react"

const faqs = [
  {
    q: "Is SkillSprint really free to use?",
    a: "Yes. Signing up, generating AI roadmaps, taking quizzes, and earning mastery certificates are all free — no credit card required.",
  },
  {
    q: "Do I need prior experience in a skill to start?",
    a: "No. Pick your current level (beginner, intermediate, advanced) when generating a roadmap and Sprinty tailors the plan and quizzes to match.",
  },
  {
    q: "How does the AI roadmap actually work?",
    a: "You choose a skill and level, and our AI generates a week-by-week plan with milestones. You can also ask Sprinty, our AI assistant, to generate one for you directly in chat.",
  },
  {
    q: "What do I get for completing a roadmap?",
    a: "Completing 100% of a roadmap's timeline and scoring 60% or higher on its milestone quiz unlocks a mastery certificate on your profile.",
  },
  {
    q: "What if I forget my password?",
    a: "Use the Forgot Password flow on the login page — you'll get a reset code to set a new password in seconds.",
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end justify-between gap-4 border-b border-white/[0.06] pb-5 mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Questions, <span className="text-emerald-400">answered</span>
          </h2>
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-[0.25em] shrink-0 hidden sm:block">04 / FAQ</span>
        </div>

        <div className="rounded-xl border border-white/[0.07] divide-y divide-white/[0.06] bg-[#0d0d0e] overflow-hidden">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 text-left px-6 py-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-mono text-[10px] text-emerald-400/70 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-semibold text-slate-100 flex-1 text-sm md:text-base">{item.q}</span>
                  <span aria-hidden="true" className={`text-slate-400 text-xl shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="pl-16 pr-6 pb-5 text-slate-400 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
