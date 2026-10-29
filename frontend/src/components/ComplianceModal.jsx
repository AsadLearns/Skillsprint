export default function ComplianceModal({ isOpen, onClose, defaultTab = 'dpdp' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>

      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 z-10 flex flex-col text-slate-800 max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-lg">
              ⚖️
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-950 font-heading">
                Trust, Compliance &amp; Consumer Protection
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                DPDP Act 2023 · RBI E-Mandate · CCPA Dark Pattern Prevention
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-5 space-y-6 text-xs text-slate-600 leading-relaxed pr-2">
          {/* Section 1: DPDP Act 2023 & Minor Consent */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">👶</span>
              <h4 className="font-bold text-slate-950 text-sm">
                1. Digital Personal Data Protection (DPDP) Act 2023 &amp; Age Gate
              </h4>
            </div>
            <p>
              In accordance with Section 9 of the DPDP Act 2023, SkillSprint strictly prohibits the processing of personal data belonging to children under 18 without verifiable parental or guardian consent.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Mandatory Age Verification:</strong> All users must confirm they are at least 18 years old (or possess parental consent) before creating an account.</li>
              <li><strong>Right to Data Erasure (Section 12):</strong> Users can permanently delete their account and wipe all stored progress from our databases with one click via their Profile page.</li>
              <li><strong>No Targeted Profiling of Minors:</strong> We do not conduct behavioral advertising, profiling, or tracking targeted at young learners.</li>
            </ul>
          </div>

          {/* Section 2: Zero Keystroke Logging & No Session Replay */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">📊</span>
              <h4 className="font-bold text-slate-950 text-sm">
                2. Privacy-First Analytics (No Session Replay / No Keylogging)
              </h4>
            </div>
            <p>
              Unlike applications that secretly deploy session replay scripts (recording every user keystroke and cursor movement), <strong>SkillSprint does NOT record your keystrokes</strong>.
            </p>
            <p>
              Telemetry is restricted to strictly necessary evaluation metrics (e.g., quiz score percentages, sprint milestone completion, and outage response runbooks).
            </p>
          </div>

          {/* Section 3: Frontend Secret Isolation */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🔑</span>
              <h4 className="font-bold text-slate-950 text-sm">
                3. Zero Secret Key Leakage &amp; Sandboxed Architecture
              </h4>
            </div>
            <p>
              All database connection strings (MongoDB URIs), Gemini AI API keys, and JWT authentication secrets are strictly isolated on the backend server. No database credentials or private master keys exist within client-side code bundles.
            </p>
          </div>

          {/* Section 4: CCPA Dark Pattern Prevention & 1-Click Cancellation */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">💳</span>
              <h4 className="font-bold text-slate-950 text-sm">
                4. Anti-Dark Pattern Guarantee (CCPA &amp; FTC Fair Terms)
              </h4>
            </div>
            <p>
              SkillSprint adheres strictly to fair consumer protection standards. We firmly reject subscription traps and dark patterns:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Immediate 1-Click Cancellation:</strong> Cancel any membership directly from your Profile settings with zero retention questionnaires or phone calls.</li>
              <li><strong>Transparent Billing:</strong> No hidden setup fees or surprise charges. What you see is what you pay.</li>
            </ul>
          </div>

          {/* Section 5: RBI E-Mandate Framework & 24hr Notice */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🔄</span>
              <h4 className="font-bold text-slate-950 text-sm">
                5. RBI E-Mandate Compliance &amp; Pre-Debit Notifications
              </h4>
            </div>
            <p>
              Under the Reserve Bank of India (RBI) e-mandate framework for recurring card transactions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>24-Hour Pre-Debit Notice:</strong> Users with recurring payment mandates receive an automated pre-debit advisory via email at least 24 hours prior to any scheduled transaction.</li>
              <li><strong>Opt-Out &amp; Mandate Revocation:</strong> Users retain full authority to pause, cancel, or modify their payment mandate anytime before debit execution.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">
            Last Updated: October 2026 · Compliant with DPDP Act &amp; RBI Circulars
          </span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
          >
            I Understand &amp; Close
          </button>
        </div>
      </div>
    </div>
  )
}
