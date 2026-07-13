import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function CTABanner() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleStart = () => {
    navigate(user ? "/dashboard" : "/signup")
  }

  return (
    <section className="bg-[#030008] py-20 px-6 relative overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-purple-500/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="glass-panel max-w-4xl mx-auto rounded-3xl px-8 py-16 text-center relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <h2 className="text-3xl md:text-5xl font-black text-slate-100 relative z-10">
          Ready to start your <span className="gradient-text">first sprint?</span>
        </h2>
        <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto relative z-10">
          Join thousands of learners building real skills with AI-generated roadmaps. Free forever, no credit card needed.
        </p>

        <div className="flex items-center justify-center gap-4 mt-10 flex-wrap relative z-10">
          <button
            onClick={handleStart}
            className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-base cursor-pointer"
          >
            🚀 Get started free
          </button>
          <a
            href="#faq"
            className="bg-[#130b2c]/80 border border-white/[0.08] text-purple-400 hover:bg-purple-950/40 px-8 py-4 rounded-xl font-bold text-base transition inline-block"
          >
            Still have questions?
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTABanner
