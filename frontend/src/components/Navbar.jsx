import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="nav-blur border-b border-purple-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
        <span className="text-xl font-bold gradient-text">SkillSprint</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
        <a href="#features" className="hover:text-purple-700 transition font-medium">Features</a>
        <a href="#how" className="hover:text-purple-700 transition font-medium">How it works</a>
        <a href="#skills" className="hover:text-purple-700 transition font-medium">Skills</a>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <>
            <Link to="/dashboard" className="text-sm text-purple-600 font-semibold hover:underline">Dashboard</Link>
            <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-red-500 transition font-medium px-3 py-2">Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-gray-600 hover:text-purple-700 transition font-medium px-3 py-2">Log in</Link>
            <Link to="/signup" className="glow-btn bg-gradient-to-r from-purple-600 to-purple-800 text-white text-sm px-5 py-2.5 rounded-xl font-semibold">Get started free →</Link>
          </>
        )}
      </div>

      {/* Hamburger Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 hover:text-purple-600 focus:outline-none transition-all duration-300">
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
        <div className="absolute top-[68px] left-0 w-full bg-white/95 backdrop-blur-lg border-b border-purple-100 px-6 py-6 md:hidden flex flex-col gap-4 z-40 animate-slide-down shadow-xl">
          <a href="#features" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-purple-700 font-bold transition py-2 border-b border-gray-50">Features</a>
          <a href="#how" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-purple-700 font-bold transition py-2 border-b border-gray-50">How it works</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-purple-700 font-bold transition py-2 border-b border-gray-50">Skills</a>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-purple-600 font-bold py-2 border-b border-gray-50">Dashboard</Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-gray-600 hover:text-red-500 font-bold transition py-2">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-purple-700 font-bold py-2 border-b border-gray-50">Log in</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="glow-btn bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-3.5 rounded-xl font-bold mt-2 shadow-lg shadow-purple-500/20">Get started free →</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar