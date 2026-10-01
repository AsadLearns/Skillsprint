import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [waking, setWaking] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const wakeTimer = setTimeout(() => setWaking(true), 4000)
    try {
      await register(form.name, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      clearTimeout(wakeTimer)
      setWaking(false)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="surface-card rounded-3xl p-8 w-full max-w-md relative z-10 border border-white/[0.08] bg-[#0c1324]/90 backdrop-blur-2xl shadow-2xl">
        <div className="text-center mb-8">
          <Logo size="w-14 h-14 mx-auto mb-4" />
          <h1 className="text-3xl font-black text-slate-100 tracking-tight">Create account</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Join SkillSprint and accelerate your learning sprints</p>
        </div>

        {error && (
          <div className="bg-rose-950/40 border border-rose-900/50 text-rose-300 text-sm px-4 py-3.5 rounded-xl mb-6 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Full name</label>
            <input
              type="text" name="name" placeholder="Enter your name"
              value={form.name} onChange={handleChange} required
              className="w-full bg-[#080d19] border border-white/[0.08] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-500/60 focus:bg-[#0c1324] transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Email address</label>
            <input
              type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
              className="w-full bg-[#080d19] border border-white/[0.08] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-500/60 focus:bg-[#0c1324] transition-all duration-300 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Password</label>
            <input
              type="password" name="password" placeholder="Minimum 6 characters"
              value={form.password} onChange={handleChange} required
              className="w-full bg-[#080d19] border border-white/[0.08] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-500/60 focus:bg-[#0c1324] transition-all duration-300 outline-none"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-accent-500 to-indigo-600 hover:from-accent-400 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-glow-sm hover:shadow-glow text-sm mt-4 disabled:opacity-50 cursor-pointer transition-all duration-300"
          >
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>

          {loading && waking && (
            <p className="text-center text-xs text-slate-500 animate-pulse">
              ⏳ Waking up the server — the first request after a quiet period can take up to a minute. Hang tight!
            </p>
          )}
        </form>

        <p className="text-center text-sm text-slate-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-400 font-bold hover:text-accent-300 hover:underline transition">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
