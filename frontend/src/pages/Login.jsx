import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="glass-panel rounded-3xl p-8 w-full max-w-md relative z-10 transition-all hover:shadow-2xl hover:shadow-purple-500/5">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg shadow-purple-500/20 animate-float">
            S
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-2">Log in to continue your learning sprint</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3.5 rounded-2xl mb-6 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5 ml-1">Email Address</label>
            <input
              type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
              className="w-full bg-white/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-600 focus:bg-white transition-all duration-300"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5 ml-1">Password</label>
            <input
              type="password" name="password" placeholder="••••••••"
              value={form.password} onChange={handleChange} required
              className="w-full bg-white/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-600 focus:bg-white transition-all duration-300"
            />
          </div>
          
          <button
            type="submit" disabled={loading}
            className="glow-btn w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3.5 rounded-2xl font-bold text-sm mt-3 disabled:opacity-50 cursor-pointer shadow-lg shadow-purple-600/20"
          >
            {loading ? 'Logging in...' : 'Log In →'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 font-bold hover:text-purple-800 hover:underline transition">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}

export default Login