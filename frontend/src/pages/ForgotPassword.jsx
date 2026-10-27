import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1) // 1: Request OTP, 2: Verify OTP, 3: Set New Password
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [previewUrl, setPreviewUrl] = useState('')
  const [demoCode, setDemoCode] = useState('')
  const navigate = useNavigate()

  // Countdown timer for Resend OTP button
  useEffect(() => {
    let interval = null
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  // Step 1: Request OTP to be sent to user's email
  const handleRequestOTP = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const cleanEmail = email.trim().toLowerCase()

    try {
      const res = await api.post('/auth/forgot-password', { email: cleanEmail })
      setSuccess(res.data.message || `A 6-digit verification code has been sent to ${cleanEmail}.`)
      if (res.data.previewUrl) setPreviewUrl(res.data.previewUrl)
      if (res.data.demoToken) setDemoCode(res.data.demoToken)

      setStep(2)
      setResendTimer(60) // 60s cooldown for resending
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification code. Please check your email and try again.')
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const cleanOtp = otp.trim()
    if (cleanOtp.length < 6) {
      setError('Please enter a valid 6-digit verification code.')
      setLoading(false)
      return
    }

    try {
      const res = await api.post('/auth/verify-otp', {
        email: email.trim().toLowerCase(),
        otp: cleanOtp,
      })
      setSuccess(res.data.message || 'Code verified successfully! Please set your new password.')
      setStep(3)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired verification code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.')
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.')
      setLoading(false)
      return
    }

    try {
      const res = await api.post('/auth/reset-password', {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      })
      setSuccess(res.data.message || 'Password reset successfully! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="surface-card rounded-3xl p-8 md:p-10 w-full max-w-md relative z-10 border border-slate-200 bg-white shadow-card">
        {/* Step Progress Pills */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 1 ? 'w-8 bg-indigo-600' : 'w-4 bg-slate-200'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 2 ? 'w-8 bg-indigo-600' : 'w-4 bg-slate-200'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 3 ? 'w-8 bg-indigo-600' : 'w-4 bg-slate-200'
            }`}
          />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <Logo size="w-14 h-14 mx-auto mb-3" />
          <h1 className="text-2xl font-black text-slate-950 tracking-tight font-heading">
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Verify Security Code'}
            {step === 3 && 'Create New Password'}
          </h1>
          <p className="text-slate-600 text-sm mt-1.5">
            {step === 1 && 'Enter your account email to receive a 6-digit verification OTP.'}
            {step === 2 && (
              <>
                Enter the 6-digit OTP code sent to <strong className="text-slate-900">{email}</strong>.
              </>
            )}
            {step === 3 && 'Verification complete. Set and confirm your new secure password.'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5 animate-shake">
            <span className="text-base leading-none">⚠️</span>
            <div className="leading-snug">{error}</div>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-2.5">
            <span className="text-base leading-none">✅</span>
            <div className="leading-snug">{success}</div>
          </div>
        )}

        {/* Test / Ethereal Email Preview Notice (if available) */}
        {previewUrl && (
          <div className="mb-5 p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center justify-between">
            <span>📨 Test Email Delivered (Ethereal):</span>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-indigo-700 hover:text-indigo-900"
            >
              View Email Inbox ↗
            </a>
          </div>
        )}

        {/* Fallback code notice if in offline development */}
        {step === 2 && demoCode && !previewUrl && (
          <div className="mb-5 p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center justify-between">
            <span>Dev Code Preview:</span>
            <code className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-300 text-indigo-600">
              {demoCode}
            </code>
          </div>
        )}

        {/* STEP 1: REQUEST OTP */}
        {step === 1 && (
          <form onSubmit={handleRequestOTP} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-600 uppercase tracking-wider mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                'Send Verification OTP →'
              )}
            </button>
          </form>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                  6-Digit OTP Code
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1)
                    setError('')
                    setSuccess('')
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Change Email
                </button>
              </div>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                autoFocus
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3.5 text-center font-mono text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition font-bold"
              />
              <p className="text-xs text-slate-500 mt-2 text-center">
                Please check your inbox and spam/junk folder.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                'Verify & Proceed →'
              )}
            </button>

            {/* Resend OTP */}
            <div className="text-center pt-2">
              <button
                type="button"
                disabled={resendTimer > 0 || loading}
                onClick={handleRequestOTP}
                className="text-xs font-medium text-slate-600 hover:text-indigo-600 disabled:opacity-50 disabled:hover:text-slate-600 transition"
              >
                {resendTimer > 0 ? (
                  <span>Resend code in <strong className="text-slate-900">{resendTimer}s</strong></span>
                ) : (
                  <span>Didn't receive the code? <strong className="text-indigo-600 underline">Resend OTP</strong></span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SET NEW PASSWORD */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-600 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  autoFocus
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-600 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your new password"
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition"
              />
            </div>

            {newPassword && confirmPassword && (
              <div className="text-xs">
                {newPassword === confirmPassword ? (
                  <span className="text-emerald-600 font-medium">✓ Passwords match</span>
                ) : (
                  <span className="text-rose-600 font-medium">✕ Passwords do not match</span>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !newPassword || newPassword !== confirmPassword}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                'Set New Password & Login →'
              )}
            </button>
          </form>
        )}

        {/* Footer Back Link */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition flex items-center justify-center gap-1.5"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword