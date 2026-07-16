import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="sticky top-0 z-50 w-full animate-fade-in">
      {/* Announcement Marquee Ticker */}
      <div className="w-full bg-[#0f0f10] font-mono text-[10px] uppercase tracking-widest text-slate-500 py-1.5 border-b border-white/[0.06] overflow-hidden whitespace-nowrap select-none relative z-50">
        <div className="inline-block animate-marquee">
          <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      <nav className="relative border-b border-white/[0.06] px-6 py-4 flex items-center justify-between bg-[#0a0a0a]/85 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-slate-100 tracking-tight">SkillSprint</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
          <a href="#features" className="hover:text-slate-200 transition">Features</a>
          <a href="#how" className="hover:text-slate-200 transition">Process</a>
          <a href="#faq" className="hover:text-slate-200 transition">FAQ</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-slate-300 font-semibold hover:text-white transition">Dashboard</Link>
              <Link to="/profile" className="text-sm text-slate-400 font-semibold hover:text-white transition px-2">Profile</Link>
              <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-red-400 transition font-medium px-3 py-2 cursor-pointer">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-400 hover:text-slate-200 transition font-medium px-3 py-2">Log in</Link>
              <Link to="/signup" className="bg-white text-zinc-950 hover:bg-zinc-200 text-sm px-4 py-2 rounded-lg font-semibold transition-colors">Get started</Link>
            </>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-400 hover:text-slate-200 focus:outline-none transition-all duration-300">
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
          <div className="absolute top-full left-0 w-full bg-[#0f0f10]/95 backdrop-blur-lg border-b border-white/[0.06] px-6 py-6 md:hidden flex flex-col gap-4 z-40 animate-slide-down shadow-2xl">
            <a href="#features" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white font-bold transition py-2 border-b border-white/[0.03]">Features</a>
            <a href="#how" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white font-bold transition py-2 border-b border-white/[0.03]">Process</a>
            <a href="#faq" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white font-bold transition py-2 border-b border-white/[0.03]">FAQ</a>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-slate-100 font-bold py-2 border-b border-white/[0.03]">Dashboard</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-slate-300 font-bold py-2 border-b border-white/[0.03]">Profile</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-slate-300 hover:text-red-400 font-bold transition py-2 cursor-pointer">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white font-bold py-2 border-b border-white/[0.03]">Log in</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-white text-zinc-950 text-center py-3 rounded-lg font-semibold mt-2">Get started</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
