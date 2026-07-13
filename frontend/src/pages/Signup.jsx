import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
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
          <Logo size="w-14 h-14 mx-auto mb-4 animate-float" />
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Create account</h1>
          <p className="text-slate-400 text-sm mt-2">Start learning smarter in just 30 seconds</p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-sm px-4 py-3.5 rounded-2xl mb-6 flex items-center gap-2 animate-shake">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Full name</label>
            <input
              type="text" name="name" placeholder="Enter your name"
              value={form.name} onChange={handleChange} required
              className="w-full bg-[#0a0518]/65 border border-white/[0.08] text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-[#110926]/90 transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Email address</label>
            <input
              type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
              className="w-full bg-[#0a0518]/65 border border-white/[0.08] text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-[#110926]/90 transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Password</label>
            <input
              type="password" name="password" placeholder="Minimum 6 characters"
              value={form.password} onChange={handleChange} required
              className="w-full bg-[#0a0518]/65 border border-white/[0.08] text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-[#110926]/90 transition-all duration-300 outline-none"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="glow-btn w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3.5 rounded-2xl font-bold text-sm mt-4 disabled:opacity-50 cursor-pointer shadow-lg shadow-purple-600/20"
          >
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 hover:underline transition">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup