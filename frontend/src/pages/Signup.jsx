import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import ComplianceModal from '../components/ComplianceModal'

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [ageConsent, setAgeConsent] = useState(false)
  const [showCompliance, setShowCompliance] = useState(false)
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

    if (!ageConsent) {
      setError('Under the DPDP Act 2023, you must confirm you are 18+ or have parental consent to register.')
      return
    }

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="surface-card rounded-3xl p-8 w-full max-w-md relative z-10 border border-slate-200 bg-white shadow-card">
        <div className="text-center mb-6">
          <Logo size="w-14 h-14 mx-auto mb-3" />
          <h1 className="text-3xl font-black text-slate-950 tracking-tight font-heading">Create account</h1>
          <p className="text-slate-600 text-sm mt-1.5 font-medium">Join SkillSprint and accelerate your learning sprints</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-4 py-3 rounded-xl mb-5 flex items-start gap-2">
            <span className="text-sm">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider block mb-1.5 ml-1">
              Full name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider block mb-1.5 ml-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider block mb-1.5 ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none"
            />
          </div>

          {/* DPDP Act 2023 Age Gate & Compliance Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={ageConsent}
                onChange={(e) => setAgeConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-600 leading-snug">
                I confirm that I am <strong>18 years of age or older</strong> (or have verified parental consent) and agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowCompliance(true)}
                  className="text-indigo-600 hover:text-indigo-800 underline font-semibold inline"
                >
                  Privacy Policy &amp; Terms
                </button>.
              </span>
            </label>
            <div className="text-[10px] text-slate-400 mt-1.5 pl-6">
              🛡️ In compliance with the DPDP Act 2023. We do not track or record keystrokes.
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !ageConsent}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg text-sm mt-3 disabled:opacity-50 cursor-pointer transition-all duration-300"
          >
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>

          {loading && waking && (
            <p className="text-center text-xs text-slate-500 animate-pulse mt-2">
              ⏳ Waking up the server — the first request after a quiet period can take up to a minute. Hang tight!
            </p>
          )}
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition">
            Log in
          </Link>
        </p>
      </div>

      <ComplianceModal
        isOpen={showCompliance}
        onClose={() => setShowCompliance(false)}
      />
    </div>
  )
}

export default Signup
