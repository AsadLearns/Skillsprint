import { useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function CoolHeader({ activePage = 'roadmap', onOpenWarRoom, onOpenViva }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full animate-fadeIn shadow-sm">
      {/* 1. Luminous Cyber Ticker Ribbon with Cursive Accent */}
      <div className="w-full bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-slate-200 border-b border-indigo-500/25 py-2 overflow-hidden whitespace-nowrap select-none relative z-50 shadow-inner">
        <div className="inline-block animate-marquee font-mono text-[11px] tracking-wider">
          <span className="inline-flex items-center gap-2 mr-8">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE SPRINT HUB
            </span>
            <span className="text-indigo-300 font-bold">⚡ SPRINT TO YOUR GOALS WITH SPRINTY AI</span>
            <span className="text-slate-500">✦</span>
            <span className="font-cursive text-base text-pink-300 font-bold tracking-wide">
              &ldquo;Code with passion, sprint with intelligence ✨&rdquo;
            </span>
            <span className="text-slate-500">✦</span>
            <span className="text-rose-400 font-bold">🚨 ACTIVE CHAOS WAR ROOM READY</span>
            <span className="text-slate-500">✦</span>
            <span className="text-purple-300 font-bold">🛡️ AI VIVA DEFENSE ENGINE</span>
            <span className="text-slate-500">✦</span>
            <span className="font-cursive text-base text-amber-300 font-bold tracking-wide">
              &ldquo;Transform your technical depth overnight 🚀&rdquo;
            </span>
            <span className="text-slate-500">✦</span>
            <span className="text-cyan-300 font-bold">🎓 UNLOCK INDUSTRY-VERIFIED CERTIFICATES</span>
          </span>

          {/* Repeat for seamless infinite loop */}
          <span className="inline-flex items-center gap-2 mr-8">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE SPRINT HUB
            </span>
            <span className="text-indigo-300 font-bold">⚡ SPRINT TO YOUR GOALS WITH SPRINTY AI</span>
            <span className="text-slate-500">✦</span>
            <span className="font-cursive text-base text-pink-300 font-bold tracking-wide">
              &ldquo;Code with passion, sprint with intelligence ✨&rdquo;
            </span>
            <span className="text-slate-500">✦</span>
            <span className="text-rose-400 font-bold">🚨 ACTIVE CHAOS WAR ROOM READY</span>
            <span className="text-slate-500">✦</span>
            <span className="text-purple-300 font-bold">🛡️ AI VIVA DEFENSE ENGINE</span>
            <span className="text-slate-500">✦</span>
            <span className="font-cursive text-base text-amber-300 font-bold tracking-wide">
              &ldquo;Transform your technical depth overnight 🚀&rdquo;
            </span>
            <span className="text-slate-500">✦</span>
            <span className="text-cyan-300 font-bold">🎓 UNLOCK INDUSTRY-VERIFIED CERTIFICATES</span>
          </span>
        </div>
      </div>

      {/* 2. Glassmorphic Ultra-Cool Navbar */}
      <nav className="border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-white/90 backdrop-blur-2xl transition-all">
        
        {/* Left: 3D Logo + Cursive Brand Typography */}
        <div
          className="flex items-center gap-3 cursor-pointer group select-none"
          onClick={() => navigate('/dashboard')}
        >
          <Logo size="w-8 h-8 sm:w-9 sm:h-9" />
          <div className="flex items-baseline">
            <span className="font-sans font-black text-xl sm:text-2xl tracking-tight text-slate-950 group-hover:text-indigo-600 transition-colors">
              Skill
              <span className="font-cursive text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent ml-0.5">
                Sprint
              </span>
            </span>
            
            {/* Cool Handwritten Cursive Floating Pill */}
            <span className="hidden lg:inline-block font-cursive text-sm text-purple-700 font-bold ml-2.5 -rotate-2 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200/80 shadow-2xs group-hover:rotate-0 transition-transform">
              &ldquo;mastery at sprint speed&rdquo; ⚡
            </span>
          </div>
        </div>

        {/* Center: Quick Mode Shortcuts (Desktop) */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 text-xs font-semibold">
          <button
            onClick={() => navigate('/roadmap')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              location.pathname === '/roadmap'
                ? 'bg-white text-indigo-700 font-bold shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>🗺️</span>
            <span>Roadmap</span>
          </button>

          {onOpenWarRoom ? (
            <button
              onClick={onOpenWarRoom}
              className="px-3.5 py-1.5 rounded-xl text-rose-700 hover:bg-rose-50 transition cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span>🚨 War Room</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/roadmap')}
              className="px-3.5 py-1.5 rounded-xl text-rose-700 hover:bg-rose-50 transition cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span>🚨 War Room</span>
            </button>
          )}

          {onOpenViva ? (
            <button
              onClick={onOpenViva}
              className="px-3.5 py-1.5 rounded-xl text-purple-700 hover:bg-purple-50 transition cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <span>🛡️ Viva Defense</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/roadmap')}
              className="px-3.5 py-1.5 rounded-xl text-purple-700 hover:bg-purple-50 transition cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <span>🛡️ Viva Defense</span>
            </button>
          )}

          <button
            onClick={() => navigate('/quiz')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              location.pathname === '/quiz'
                ? 'bg-white text-indigo-700 font-bold shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>🧠</span>
            <span>Quiz Studio</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/quiz')}
            className="bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-indigo-700 border border-indigo-200/80 text-xs px-3.5 py-2 rounded-xl font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
          >
            <span>🧠</span>
            <span className="hidden sm:inline">Take Quiz</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs text-slate-700 hover:text-slate-950 font-bold transition px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer flex items-center gap-1 shadow-2xs"
          >
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>

      </nav>
    </header>
  )
}
