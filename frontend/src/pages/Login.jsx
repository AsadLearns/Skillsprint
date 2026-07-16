import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

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
      <div className="glass-panel rounded-2xl p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Logo size="w-14 h-14 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-2">Log in to continue your learning sprint</p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-sm px-4 py-3.5 rounded-xl mb-6 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Email Address</label>
            <input
              type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
              className="w-full bg-[#101011] border border-white/[0.08] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500/60 focus:bg-[#131314] transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5 px-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition">Forgot password?</Link>
            </div>
            <input
              type="password" name="password" placeholder="••••••••"
              value={form.password} onChange={handleChange} required
              className="w-full bg-[#101011] border border-white/[0.08] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500/60 focus:bg-[#131314] transition-all duration-300 outline-none"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-white hover:bg-zinc-200 text-zinc-950 py-3.5 rounded-lg font-semibold text-sm mt-3 disabled:opacity-50 cursor-pointer transition-colors"
          >
            {loading ? 'Logging in...' : 'Log In →'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline transition">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
