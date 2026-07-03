import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="nav-blur border-b border-purple-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
        <span className="text-xl font-bold gradient-text">SkillSprint</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
        <a href="#features" className="hover:text-purple-700 transition font-medium">Features</a>
        <a href="#how" className="hover:text-purple-700 transition font-medium">How it works</a>
        <a href="#skills" className="hover:text-purple-700 transition font-medium">Skills</a>
      </div>

      <div className="flex items-center gap-3">
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
    </nav>
  )
}

export default Navbar