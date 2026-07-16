import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function CTABanner() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <section className="bg-[#0a0a0a] pb-24 px-6">
      <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.08] bg-[#0d0d0e] grid-bg px-8 py-16 text-center relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-56 bg-emerald-500/[0.06] rounded-full blur-[110px] pointer-events-none"></div>

        <div className="relative z-10">
          <p className="font-mono text-[11px] text-emerald-400 uppercase tracking-[0.25em] mb-5">Ready when you are</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight mb-4">
            Your first sprint starts today.
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto mb-9">
            Free forever. No credit card. A full roadmap in under a minute.
          </p>
          <button
            onClick={() => navigate(user ? "/dashboard" : "/signup")}
            className="bg-white text-zinc-950 hover:bg-zinc-200 px-7 py-3.5 rounded-lg font-semibold text-base transition-colors cursor-pointer"
          >
            Start learning free
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTABanner
