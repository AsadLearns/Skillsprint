import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function CTABanner() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <section className="reveal bg-transparent pb-24 px-6 relative">
      <div className="max-w-4xl mx-auto rounded-3xl border border-white/[0.08] bg-[#0c1324]/90 grid-bg px-8 py-16 text-center relative overflow-hidden backdrop-blur-2xl shadow-2xl hover:border-accent-500/30 transition-all duration-500">
        {/* Luminous Glow Accents */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[450px] h-48 bg-gradient-to-r from-accent-600/20 via-cyber-500/15 to-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-20 right-10 w-48 h-48 bg-cyber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/25 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-pulse"></span>
            <span className="font-mono text-[10px] text-accent-300 font-bold uppercase tracking-[0.25em]">Ready when you are</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight mb-4">
            Your first sprint <span className="gradient-text">starts today.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto mb-8 font-medium leading-relaxed">
            Free forever. No credit card required. Generate an AI-architected, week-by-week technical curriculum in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate(user ? "/dashboard" : "/signup")}
              className="w-full sm:w-auto bg-gradient-to-r from-accent-500 to-indigo-600 hover:from-accent-400 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-glow-sm hover:shadow-glow transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-sm md:text-base group"
            >
              <span>{user ? "Go to Dashboard" : "Start learning free"}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              onClick={() => navigate("/features")}
              className="w-full sm:w-auto bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 font-semibold px-6 py-3.5 rounded-xl transition cursor-pointer text-sm md:text-base"
            >
              Explore Capabilities
            </button>
          </div>

          {/* Micro-perks */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5"><span className="text-cyber-400">✓</span> 100% Free Forever</span>
            <span className="flex items-center gap-1.5"><span className="text-accent-400">✓</span> Zero Credit Card</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Instant AI Roadmaps</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTABanner
