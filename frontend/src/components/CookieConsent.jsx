import { useState, useEffect } from 'react'

export default function CookieConsent({ onOpenCompliance }) {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsConsent, setAnalyticsConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('skillsprint_cookie_consent')
    if (!consent) {
      // Delay slightly for smooth entry
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem(
      'skillsprint_cookie_consent',
      JSON.stringify({
        essential: true,
        analytics: true,
        timestamp: new Date().toISOString(),
      })
    )
    setVisible(false)
  }

  const handleEssentialOnly = () => {
    localStorage.setItem(
      'skillsprint_cookie_consent',
      JSON.stringify({
        essential: true,
        analytics: false,
        timestamp: new Date().toISOString(),
      })
    )
    setVisible(false)
  }

  const handleSaveCustom = () => {
    localStorage.setItem(
      'skillsprint_cookie_consent',
      JSON.stringify({
        essential: true,
        analytics: analyticsConsent,
        timestamp: new Date().toISOString(),
      })
    )
    setShowPreferences(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside aria-label="Cookie and Privacy Consent" className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 animate-slide-up">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-2xl shadow-slate-900/10 text-slate-800">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xl shrink-0">
            🛡️
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-950 font-heading">
                Privacy &amp; Data Protection (DPDP Act 2023)
              </h2>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                Zero Replays
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              We respect your privacy. SkillSprint strictly uses essential cookies for secure login and session state. 
              <strong> We do NOT record sensitive keystrokes or run unconsented session replay trackers.</strong>
            </p>

            {showPreferences && (
              <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">Essential Authentication Cookies</span>
                    <span className="text-slate-500 text-[11px]">Required for login, security, and session validation.</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Always Active
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">Performance &amp; Learning Telemetry</span>
                    <span className="text-slate-500 text-[11px]">Anonymous metrics to calculate quiz accuracy and uptime.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl border border-slate-200 transition cursor-pointer"
              >
                Essential Only
              </button>

              {!showPreferences ? (
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1"
                >
                  Customize
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-indigo-100 transition cursor-pointer"
                >
                  Save Choices
                </button>
              )}

              {onOpenCompliance && (
                <button
                  type="button"
                  onClick={onOpenCompliance}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline ml-auto"
                >
                  Legal Terms
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
