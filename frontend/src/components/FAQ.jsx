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

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer"
      >
        <span className="font-bold text-slate-100">{item.q}</span>
        <span className={`text-purple-400 text-xl shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed font-medium">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-[#030008] py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10">
        <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest">Got questions?</span>
        <h2 className="text-4xl font-extrabold text-slate-100 mt-3">
          Frequently asked <span className="gradient-text">questions</span>
        </h2>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-4 relative z-10">
        {faqs.map((item, i) => (
          <FAQItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  )
}

export default FAQ
