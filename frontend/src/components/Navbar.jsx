import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="sticky top-0 z-50 w-full animate-fade-in">
      <nav className="nav-surface relative border-b border-slate-200/80 px-6 py-4 flex items-center justify-between bg-white/85 backdrop-blur-md shadow-sm">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo />
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">SkillSprint</span>
            <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">PRO</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600 font-semibold">
          <Link
            to="/builder"
            className={`transition flex items-center gap-1.5 ${
              isActive('/builder')
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5'
                : 'hover:text-slate-950'
            }`}
          >
            <span>AI Builder</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-black tracking-normal">
              NEW
            </span>
          </Link>
          <a
            href="/#fullpage-scroll-effects"
            className="hover:text-slate-950 transition flex items-center gap-1"
          >
            <span>Scroll 3D</span>
          </a>
          <Link to="/features" className={`transition ${isActive('/features') ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5' : 'hover:text-slate-950'}`}>Features</Link>
          <Link to="/how-it-works" className={`transition ${isActive('/how-it-works') ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5' : 'hover:text-slate-950'}`}>Process</Link>
          <Link to="/faq" className={`transition ${isActive('/faq') ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5' : 'hover:text-slate-950'}`}>FAQ</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-slate-700 font-semibold hover:text-slate-950 transition">Dashboard</Link>
              <Link to="/profile" className="text-sm text-slate-600 font-semibold hover:text-slate-950 transition px-2">Profile</Link>
              <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-rose-600 transition font-medium px-3 py-2 cursor-pointer">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-700 hover:text-slate-950 transition font-semibold px-3 py-2">Log in</Link>
              <Link to="/signup" className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-indigo-500/25 hover:scale-[1.02]">Get started</Link>
            </>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-3 text-slate-700 hover:text-slate-950 focus:outline-none transition-all duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Drawer Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-slate-200 px-6 py-6 md:hidden flex flex-col gap-4 z-40 animate-slide-down shadow-2xl">
            <Link
              to="/builder"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/builder') ? 'text-indigo-600 font-extrabold' : 'text-slate-700 hover:text-slate-950'
              } font-bold transition py-3 border-b border-slate-100 flex items-center justify-between`}
            >
              <span>AI Builder (Prompt to Work)</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-600 text-white font-bold">NEW</span>
            </Link>
            <a
              href="/#fullpage-scroll-effects"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 hover:text-slate-950 font-bold transition py-3 border-b border-slate-100 flex items-center justify-between"
            >
              <span>Scroll 3D Effects</span>
              <span className="text-xs text-indigo-600 font-mono font-bold">fullPage</span>
            </a>
            <Link to="/features" onClick={() => setIsOpen(false)} className={`${isActive('/features') ? 'text-indigo-600 font-extrabold' : 'text-slate-700 hover:text-slate-950'} font-bold transition py-3 border-b border-slate-100`}>Features</Link>
            <Link to="/how-it-works" onClick={() => setIsOpen(false)} className={`${isActive('/how-it-works') ? 'text-indigo-600 font-extrabold' : 'text-slate-700 hover:text-slate-950'} font-bold transition py-3 border-b border-slate-100`}>Process</Link>
            <Link to="/faq" onClick={() => setIsOpen(false)} className={`${isActive('/faq') ? 'text-indigo-600 font-extrabold' : 'text-slate-700 hover:text-slate-950'} font-bold transition py-3 border-b border-slate-100`}>FAQ</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-slate-900 font-bold py-3 border-b border-slate-100">Dashboard</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-slate-700 font-bold py-3 border-b border-slate-100">Profile</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-slate-700 hover:text-rose-600 font-bold transition py-3 cursor-pointer">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-800 hover:text-slate-950 font-bold py-3 border-b border-slate-100">Log in</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-indigo-600 text-white text-center py-3 rounded-xl font-bold mt-2 shadow-md">Get started</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar