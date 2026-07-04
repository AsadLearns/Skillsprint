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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-gray-900/40 border border-gray-800 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <Logo size="w-12 h-12 mb-4 mx-auto" />
          <h1 className="text-2xl font-black text-white tracking-tight">Reset Password</h1>
          <p className="text-gray-400 text-sm mt-2">
            {step === 1 ? 'Enter your email to request a reset code.' : 'Enter the code and set your new password.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
            <span>✅</span> {success}
          </div>
        )}

        {/* Demo Helper Banner */}
        {step === 2 && demoCode && (
          <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs">
            <span className="font-bold text-purple-400 uppercase tracking-wider block mb-1">🛠️ Portfolio Demo Mode</span>
            We generated a mock reset code: <strong className="text-white text-sm bg-gray-950 px-2 py-0.5 rounded border border-gray-800 select-all">{demoCode}</strong>. Use it below to simulate the flow!
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-gray-950/60 border border-gray-800 focus:border-purple-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Send Reset Code'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Reset Code
              </label>
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="6-digit reset code"
                className="w-full bg-gray-950/60 border border-gray-800 focus:border-purple-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition text-center font-mono letter-spacing-widest"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-950/60 border border-gray-800 focus:border-purple-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-800/60 text-center">
          <Link to="/login" className="text-sm text-purple-400 hover:text-purple-300 font-medium transition">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
