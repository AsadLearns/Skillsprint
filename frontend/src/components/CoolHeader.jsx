import { useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo'

/**
 * Neat, Clean, and Minimalist Aesthetic Header
 * Zero clutter, zero text-heavy theories, pure clean typography
 * with a subtle cursive brand touch and clean navigation.
 */
export default function CoolHeader({ onOpenWarRoom, onOpenViva }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 transition-all select-none shadow-2xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Left: Clean Brand with Subtle Cursive Accent */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => navigate('/dashboard')}
        >
          <Logo size="w-7 h-7 sm:w-8 sm:h-8" />
          <div className="flex items-baseline">
            <span className="font-sans font-bold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Skill
              <span className="font-cursive text-2xl font-bold text-indigo-600 ml-0.5">
                Sprint
              </span>
            </span>
          </div>
        </div>

        {/* Center: Clean Minimalist Navigation Links (No Clutter) */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-100/70 border border-slate-200/60 text-xs font-medium">
          <button
            onClick={() => navigate('/roadmap')}
            className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
              location.pathname === '/roadmap'
                ? 'bg-white text-slate-900 font-semibold shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Roadmap
          </button>

          {onOpenWarRoom ? (
            <button
              onClick={onOpenWarRoom}
              className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>War Room</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/roadmap')}
              className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>War Room</span>
            </button>
          )}

          {onOpenViva ? (
            <button
              onClick={onOpenViva}
              className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition cursor-pointer"
            >
              Viva Defense
            </button>
          ) : (
            <button
              onClick={() => navigate('/roadmap')}
              className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition cursor-pointer"
            >
              Viva Defense
            </button>
          )}

          <button
            onClick={() => navigate('/quiz')}
            className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
              location.pathname === '/quiz'
                ? 'bg-white text-slate-900 font-semibold shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quiz Studio
          </button>
        </div>

        {/* Right: Clean, Aesthetic Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/quiz')}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
          >
            Take Quiz
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs text-slate-700 hover:text-slate-950 font-medium transition px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer shadow-2xs"
          >
            Dashboard
          </button>
        </div>

      </nav>
    </header>
  )
}
