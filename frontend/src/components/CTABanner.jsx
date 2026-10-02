import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function CTABanner() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <section className="reveal bg-transparent pb-24 px-6 relative">
      <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white px-8 py-16 text-center relative overflow-hidden shadow-xl hover:border-indigo-300 transition-all duration-300">
        {/* Luminous Glow Accents */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[450px] h-48 bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-violet-500/10 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="font-mono text-[10px] text-indigo-700 font-bold uppercase tracking-[0.25em]">Ready when you are</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight mb-4 font-heading">
            Your first sprint <span className="gradient-text">starts today.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-lg mx-auto mb-8 font-medium leading-relaxed">
            Free forever. No credit card required. Generate an AI-architected, week-by-week technical curriculum in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate(user ? "/dashboard" : "/signup")}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-indigo-500/25 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-sm md:text-base group"
            >
              <span>{user ? "Go to Dashboard" : "Start learning free"}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              onClick={() => navigate("/features")}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl transition cursor-pointer text-sm md:text-base shadow-xs"
            >
              Explore Capabilities
            </button>
          </div>

          {/* Micro-perks */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-mono font-medium">
            <span className="flex items-center gap-1.5"><span className="text-indigo-600 font-bold">✓</span> 100% Free Forever</span>
            <span className="flex items-center gap-1.5"><span className="text-cyan-600 font-bold">✓</span> Zero Credit Card</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Instant AI Roadmaps</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTABanner
