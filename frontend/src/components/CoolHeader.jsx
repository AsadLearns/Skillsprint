import { useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Cursor3DCanvas from './Cursor3DCanvas'

export default function CoolHeader({ activePage = 'roadmap', onOpenWarRoom, onOpenViva }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full animate-fadeIn shadow-2xl relative select-none">
      
      {/* 1. Luminous Cyber Ticker Ribbon with Cursive Accent */}
      <div className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200 border-b border-amber-500/20 py-2 overflow-hidden whitespace-nowrap select-none relative z-50 shadow-inner">
        <div className="inline-block animate-marquee font-mono text-[11px] tracking-wider">
          <span className="inline-flex items-center gap-2 mr-8">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE 3D SPRINT HUB
            </span>
            <span className="text-amber-400 font-bold">⚡ SPRINT TO YOUR GOALS WITH SPRINTY AI</span>
            <span className="text-slate-600">✦</span>
            <span className="font-cursive text-base text-pink-300 font-bold tracking-wide">
              &ldquo;Code with passion, sprint with intelligence ✨&rdquo;
            </span>
            <span className="text-slate-600">✦</span>
            <span className="text-rose-400 font-bold">🚨 ACTIVE CHAOS WAR ROOM READY</span>
            <span className="text-slate-600">✦</span>
            <span className="text-purple-300 font-bold">🛡️ AI VIVA DEFENSE ENGINE</span>
            <span className="text-slate-600">✦</span>
            <span className="font-cursive text-base text-amber-300 font-bold tracking-wide">
              &ldquo;Evolution not Revolution — Master any stack 🚀&rdquo;
            </span>
            <span className="text-slate-600">✦</span>
            <span className="text-cyan-300 font-bold">🎓 UNLOCK INDUSTRY-VERIFIED CERTIFICATES</span>
          </span>

          {/* Repeat for seamless infinite loop */}
          <span className="inline-flex items-center gap-2 mr-8">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE 3D SPRINT HUB
            </span>
            <span className="text-amber-400 font-bold">⚡ SPRINT TO YOUR GOALS WITH SPRINTY AI</span>
            <span className="text-slate-600">✦</span>
            <span className="font-cursive text-base text-pink-300 font-bold tracking-wide">
              &ldquo;Code with passion, sprint with intelligence ✨&rdquo;
            </span>
            <span className="text-slate-600">✦</span>
            <span className="text-rose-400 font-bold">🚨 ACTIVE CHAOS WAR ROOM READY</span>
            <span className="text-slate-600">✦</span>
            <span className="text-purple-300 font-bold">🛡️ AI VIVA DEFENSE ENGINE</span>
            <span className="text-slate-600">✦</span>
            <span className="font-cursive text-base text-amber-300 font-bold tracking-wide">
              &ldquo;Evolution not Revolution — Master any stack 🚀&rdquo;
            </span>
            <span className="text-slate-600">✦</span>
            <span className="text-cyan-300 font-bold">🎓 UNLOCK INDUSTRY-VERIFIED CERTIFICATES</span>
          </span>
        </div>
      </div>

      {/* 2. Dark Luxury Automotive & MIMCO-Inspired 3D Navbar */}
      <nav className="relative border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-slate-950/85 backdrop-blur-2xl transition-all overflow-hidden">
        
        {/* Real-Time Cursor-Responsive 3D Canvas Background */}
        <Cursor3DCanvas className="absolute inset-0 pointer-events-none opacity-45 z-0" />

        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none z-10" />

        {/* Left: 3D Logo + Cursive Brand Typography */}
        <div
          className="relative z-10 flex items-center gap-3 cursor-pointer group select-none"
          onClick={() => navigate('/dashboard')}
          data-cursor="magnetic"
        >
          <Logo size="w-8 h-8 sm:w-9 sm:h-9" />
          <div className="flex items-baseline">
            <span className="font-sans font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Skill
              <span className="font-cursive text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 bg-clip-text text-transparent ml-0.5">
                Sprint
              </span>
            </span>
            
            {/* Luxury Cursive Floating Pill */}
            <span className="hidden lg:inline-block font-cursive text-sm text-amber-300 font-bold ml-2.5 -rotate-2 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 shadow-2xs group-hover:rotate-0 transition-transform">
              &ldquo;mastery at sprint speed&rdquo; ⚡
            </span>
          </div>
        </div>

        {/* Center: Quick Mode Shortcuts (Desktop) */}
        <div className="relative z-10 hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-xs font-semibold shadow-inner">
          <button
            onClick={() => navigate('/roadmap')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              location.pathname === '/roadmap'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            data-cursor="magnetic"
          >
            <span>🗺️</span>
            <span>Roadmap</span>
          </button>

          {onOpenWarRoom ? (
            <button
              onClick={onOpenWarRoom}
              className="px-3.5 py-1.5 rounded-xl text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition cursor-pointer flex items-center gap-1.5 font-bold"
              data-cursor="magnetic"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
              <span>🚨 War Room</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/roadmap')}
              className="px-3.5 py-1.5 rounded-xl text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition cursor-pointer flex items-center gap-1.5 font-bold"
              data-cursor="magnetic"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
              <span>🚨 War Room</span>
            </button>
          )}

          {onOpenViva ? (
            <button
              onClick={onOpenViva}
              className="px-3.5 py-1.5 rounded-xl text-purple-300 hover:bg-purple-950/40 hover:text-purple-200 transition cursor-pointer flex items-center gap-1.5 font-bold"
              data-cursor="magnetic"
            >
              <span>🛡️ Viva Defense</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/roadmap')}
              className="px-3.5 py-1.5 rounded-xl text-purple-300 hover:bg-purple-950/40 hover:text-purple-200 transition cursor-pointer flex items-center gap-1.5 font-bold"
              data-cursor="magnetic"
            >
              <span>🛡️ Viva Defense</span>
            </button>
          )}

          <button
            onClick={() => navigate('/quiz')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              location.pathname === '/quiz'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            data-cursor="magnetic"
          >
            <span>🧠</span>
            <span>Quiz Studio</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="relative z-10 flex items-center gap-2.5">
          <button
            onClick={() => navigate('/quiz')}
            className="bg-gradient-to-r from-amber-500/20 to-cyan-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs px-3.5 py-2 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
            data-cursor="magnetic"
          >
            <span>🧠</span>
            <span className="hidden sm:inline">Take Quiz</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs text-slate-300 hover:text-white font-bold transition px-3 py-2 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer flex items-center gap-1 shadow-2xs"
            data-cursor="magnetic"
          >
            <span>←</span>
            <span>Dashboard</span>
          </button>
        </div>

      </nav>
    </header>
  )
}
