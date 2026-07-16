import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState(1) // 1: Email, 2: Reset Code & Password
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [demoCode, setDemoCode] = useState('')
  const navigate = useNavigate()

  const handleRequestCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await api.post('/auth/forgot-password', { email })
      setSuccess('A verification code has been generated.')
      if (res.data.demoToken) {
        setDemoCode(res.data.demoToken)
        setToken(res.data.demoToken) // Prefill for easy testing
      }
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request reset code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await api.post('/auth/reset-password', { token, newPassword })
      setSuccess('Password reset successfully! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-6 relative overflow-hidden">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8 md:p-10 relative z-10">
        <div className="text-center mb-8">
          <Logo size="w-12 h-12 mb-4 mx-auto" />
          <h1 className="text-2xl font-black text-slate-100 tracking-tight">Reset Password</h1>
          <p className="text-slate-400 text-sm mt-2">
            {step === 1 ? 'Enter your email to request a reset code.' : 'Enter the code and set your new password.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-900/50 text-red-400 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 text-sm flex items-center gap-2">
            <span>✅</span> {success}
          </div>
        )}

        {/* Demo Helper Banner */}
        {step === 2 && demoCode && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20 text-slate-300 text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-1">🛠️ Portfolio Demo Mode</span>
            We generated a mock reset code: <strong className="text-white text-sm bg-[#0a0a0a] px-2 py-0.5 rounded border border-white/[0.08] select-all">{demoCode}</strong>. Use it below to simulate the flow!
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#101011] border border-white/[0.08] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500/60 focus:bg-[#131314] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-3.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
              ) : (
                'Send Reset Code'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Reset Code
              </label>
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="6-digit reset code"
                className="w-full bg-[#101011] border border-white/[0.08] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500/60 focus:bg-[#131314] transition text-center font-mono tracking-widest"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#101011] border border-white/[0.08] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500/60 focus:bg-[#131314] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-3.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
          <Link to="/login" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
