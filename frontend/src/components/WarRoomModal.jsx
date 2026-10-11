import { useState, useMemo } from 'react'
import { getIncidentForTopic } from '../utils/warRoomIncidents'

export default function WarRoomModal({ skill, topic, weekNumber, onClose, onResolve }) {
  const incident = useMemo(() => getIncidentForTopic(skill, topic), [skill, topic])
  
  const [code, setCode] = useState(incident.brokenCode)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null) // { success: boolean, message: string }
  const [resolved, setResolved] = useState(false)
  const [activeTab, setActiveTab] = useState('editor') // 'editor' | 'logs'

  const handleDeployHotfix = () => {
    setTesting(true)
    setTestResult(null)

    setTimeout(() => {
      setTesting(false)
      const passed = incident.validateHotfix(code)

      if (passed) {
        setTestResult({
          success: true,
          message: `[HEALTH CHECK PASSED] Canary build deployed to cluster. Error rate dropped to 0.01%. All 4 regression tests passed! Incident ${incident.id} marked RESOLVED.`
        })
        setResolved(true)
        if (onResolve) onResolve(incident.id)
      } else {
        setTestResult({
          success: false,
          message: `[HOTFIX REJECTED] Health check failed: Root cause condition persists. Error rate remains elevated at ${incident.telemetry.errorRate}. Review the logs and architecture hint.`
        })
      }
    }, 1200)
  }

  const handleResetCode = () => {
    setCode(incident.brokenCode)
    setTestResult(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 border border-rose-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans">
        
        {/* Top Header / Live Incident Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-950 border-b border-rose-500/20 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-rose-400">
                  // {incident.severity}
                </span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="font-mono text-xs text-slate-400 font-bold">
                  {incident.id}
                </span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Week {weekNumber}: {topic}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white tracking-tight mt-0.5 font-heading">
                🚨 Chaos War Room: {incident.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {resolved && (
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5">
                <span>✓</span> RESOLVED (+150 XP)
              </span>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Telemetry HUD Strip */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs font-mono overflow-x-auto gap-4">
          <div className="flex items-center gap-6 text-slate-400 flex-nowrap">
            <div>
              <span className="text-slate-500">SERVICE: </span>
              <span className="text-slate-200 font-bold">{incident.service}</span>
            </div>
            <div>
              <span className="text-slate-500">CPU: </span>
              <span className="text-rose-400 font-bold">{incident.telemetry.cpuUsage}</span>
            </div>
            <div>
              <span className="text-slate-500">MEMORY: </span>
              <span className="text-amber-400 font-bold">{incident.telemetry.memoryUsage}</span>
            </div>
            <div>
              <span className="text-slate-500">IMPACT: </span>
              <span className="text-rose-400 font-bold">{incident.telemetry.impactedUsers || incident.telemetry.errorRate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                activeTab === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              💻 Code Hotfix
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                activeTab === 'logs' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              📜 Production Logs ({incident.logs.length})
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Panel: Incident Brief & Diagnostics */}
          <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-slate-800 p-5 overflow-y-auto space-y-4 bg-slate-900/60">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold mb-1">
                // INCIDENT SUMMARY & SYMPTOM
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {incident.symptom}
              </p>
            </div>

            {/* Live Stack Trace snippet */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                // ERROR STACK TRACE & ALERTS
              </h3>
              <div className="bg-black/80 rounded-xl p-3 border border-slate-800 font-mono text-[11px] text-rose-300/90 space-y-1.5 overflow-x-auto max-h-48">
                {incident.logs.map((log, i) => (
                  <div key={i} className="leading-tight">
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Hint Section */}
            <div className="border-t border-slate-800 pt-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>{showHint ? '▼' : '▶'}</span>
                <span>💡 {showHint ? 'Hide Architecture Hint' : 'Reveal Architecture Hint'}</span>
              </button>

              {showHint && (
                <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200 leading-relaxed font-sans animate-fadeIn">
                  {incident.hint}
                </div>
              )}
            </div>

            {/* Reference Hotfix Toggle */}
            <div>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>{showSolution ? '▼' : '▶'}</span>
                <span>🔍 {showSolution ? 'Hide Reference Hotfix' : 'View Reference Hotfix'}</span>
              </button>

              {showSolution && (
                <div className="mt-2 p-3 bg-slate-950 border border-indigo-500/30 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto max-h-48 whitespace-pre animate-fadeIn">
                  {incident.referenceSolution}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Code Hotfix Editor */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            
            {activeTab === 'editor' ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                    <span>active-source-patch.js</span>
                    <span className="text-[10px] text-slate-500">(Edit broken code below)</span>
                  </div>
                  <button
                    onClick={handleResetCode}
                    className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                    title="Reset to original incident state"
                  >
                    ↺ Reset File
                  </button>
                </div>

                <div className="flex-1 p-3 overflow-hidden">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                    className="w-full h-full bg-slate-950 font-mono text-xs md:text-sm text-emerald-300/90 p-4 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed selection:bg-indigo-500/30"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-300 space-y-2 bg-black">
                <div className="text-slate-500">// Real-time cluster stdout / stderr telemetry stream</div>
                {incident.logs.map((log, i) => (
                  <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800/80">
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Test Assertion Result Banner */}
            {testResult && (
              <div className={`px-6 py-3 font-mono text-xs border-t transition-all ${
                testResult.success
                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
              }`}>
                {testResult.message}
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-mono hidden sm:block">
                {resolved ? '✓ System operating normally' : '⚠️ Hotfix required to mitigate outage'}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white border border-slate-700 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                >
                  Close War Room
                </button>

                <button
                  onClick={handleDeployHotfix}
                  disabled={testing || resolved}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold font-mono transition shadow-lg flex items-center gap-2 cursor-pointer ${
                    resolved
                      ? 'bg-emerald-600 text-white cursor-default'
                      : testing
                      ? 'bg-indigo-700 text-indigo-200 cursor-wait'
                      : 'bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white'
                  }`}
                >
                  {testing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Running Canary Health Checks...</span>
                    </>
                  ) : resolved ? (
                    <span>Hotfix Verified &amp; Deployed ✓</span>
                  ) : (
                    <span>🚀 Deploy Hotfix &amp; Validate</span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
