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
      {/* Streetwear Announcement Marquee Ticker */}
      <div className="w-full bg-gradient-to-r from-purple-950/90 via-pink-950/90 to-purple-950/90 text-[10px] uppercase font-black tracking-widest py-1 border-b border-white/[0.04] overflow-hidden whitespace-nowrap select-none relative z-50">
        <div className="inline-block animate-marquee">
          <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      <nav className="nav-blur border-b border-white/[0.06] px-6 py-4 flex items-center justify-between bg-[#030008]/75 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold gradient-text hover:scale-[1.02] transition-transform duration-300">SkillSprint</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#features" className="hover:text-purple-300 transition font-medium">Features</a>
          <a href="#how" className="hover:text-purple-300 transition font-medium">How it works</a>
          <a href="#skills" className="hover:text-purple-300 transition font-medium">Skills</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-purple-400 font-semibold hover:underline">Dashboard</Link>
              <Link to="/profile" className="text-sm text-slate-400 font-semibold hover:underline px-2">Profile</Link>
              <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-red-400 transition font-medium px-3 py-2 cursor-pointer">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-400 hover:text-purple-300 transition font-medium px-3 py-2">Log in</Link>
              <Link to="/signup" className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-sm px-5 py-2.5 rounded-xl font-semibold">Get started free →</Link>
            </>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-400 hover:text-purple-400 focus:outline-none transition-all duration-300">
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
          <div className="absolute top-[68px] left-0 w-full bg-[#0b061c]/95 backdrop-blur-lg border-b border-white/[0.06] px-6 py-6 md:hidden flex flex-col gap-4 z-40 animate-slide-down shadow-2xl">
            <a href="#features" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-purple-300 font-bold transition py-2 border-b border-white/[0.03]">Features</a>
            <a href="#how" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-purple-300 font-bold transition py-2 border-b border-white/[0.03]">How it works</a>
            <a href="#skills" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-purple-300 font-bold transition py-2 border-b border-white/[0.03]">Skills</a>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-purple-400 font-bold py-2 border-b border-white/[0.03]">Dashboard</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-slate-300 font-bold py-2 border-b border-white/[0.03]">Profile</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-slate-300 hover:text-red-400 font-bold transition py-2 cursor-pointer">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-purple-300 font-bold py-2 border-b border-white/[0.03]">Log in</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-3.5 rounded-xl font-bold mt-2 shadow-lg shadow-purple-500/20">Get started free →</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar