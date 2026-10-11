import { useState, useMemo } from 'react'
import { getVivaQuestions, evaluateVivaResponse } from '../utils/vivaEngine'

export default function VivaDefenseModal({ skill, topic, weekNumber, onClose }) {
  const questions = useMemo(() => getVivaQuestions(skill, topic), [skill, topic])
  
  const [currentRound, setCurrentRound] = useState(0) // 0, 1, 2
  const [answers, setAnswers] = useState(['', '', ''])
  const [currentInput, setCurrentInput] = useState('')
  const [evaluating, setEvaluating] = useState(false)
  const [result, setResult] = useState(null) // evaluation result
  const [showTips, setShowTips] = useState(false)

  const activeQuestion = questions[currentRound]

  const handleNextRound = () => {
    const updated = [...answers]
    updated[currentRound] = currentInput
    setAnswers(updated)

    if (currentRound < questions.length - 1) {
      setCurrentRound(currentRound + 1)
      setCurrentInput(answers[currentRound + 1] || '')
      setShowTips(false)
    } else {
      // Evaluate all answers
      setEvaluating(true)
      setTimeout(() => {
        const evaluation = evaluateVivaResponse(updated, skill, topic)
        setResult(evaluation)
        setEvaluating(false)
      }, 1500)
    }
  }

  const handlePreviousRound = () => {
    if (currentRound > 0) {
      const updated = [...answers]
      updated[currentRound] = currentInput
      setAnswers(updated)
      setCurrentRound(currentRound - 1)
      setCurrentInput(answers[currentRound - 1] || '')
      setShowTips(false)
    }
  }

  // Draw simple SVG Radar Polygon
  const renderRadarChart = (radar) => {
    const size = 220
    const center = size / 2
    const radius = 80

    const axes = [
      { key: 'architecture', label: 'Architecture', val: radar.architecture || 75 },
      { key: 'resilience', label: 'Resilience', val: radar.resilience || 70 },
      { key: 'security', label: 'Security', val: radar.security || 80 },
      { key: 'performance', label: 'Performance', val: radar.performance || 85 },
      { key: 'communication', label: 'Clarity', val: radar.communication || 90 }
    ]

    const points = axes.map((a, i) => {
      const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2
      const r = (a.val / 100) * radius
      const x = center + r * Math.cos(angle)
      const y = center + r * Math.sin(angle)
      return `${x},${y}`
    }).join(' ')

    return (
      <svg width={size} height={size} className="mx-auto my-2">
        {/* Background webs */}
        {[0.3, 0.6, 1].map((scale, idx) => {
          const webPoints = axes.map((_, i) => {
            const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2
            const r = radius * scale
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
          }).join(' ')
          return (
            <polygon
              key={idx}
              points={webPoints}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={idx < 2 ? "2,2" : undefined}
            />
          )
        })}

        {/* Data polygon */}
        <polygon
          points={points}
          fill="rgba(99, 102, 241, 0.25)"
          stroke="#4f46e5"
          strokeWidth="2.5"
        />

        {/* Labels & Data Dots */}
        {axes.map((a, i) => {
          const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2
          const dotR = (a.val / 100) * radius
          const labelR = radius + 18
          const dotX = center + dotR * Math.cos(angle)
          const dotY = center + dotR * Math.sin(angle)
          const labelX = center + labelR * Math.cos(angle)
          const labelY = center + labelR * Math.sin(angle)

          return (
            <g key={a.key}>
              <circle cx={dotX} cy={dotY} r="4" fill="#6366f1" />
              <text
                x={labelX}
                y={labelY + 4}
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill="#475569"
                fontFamily="monospace"
              >
                {a.label}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900 font-sans max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center font-bold text-lg">
              🛡️
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  // AI ARCHITECTURAL VIVA DEFENSE
                </span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-[10px] font-mono text-slate-400">
                  Week {weekNumber}: {topic}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight font-heading">
                Oral Defense: {skill}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {!result && !evaluating && (
            <div>
              {/* Stepper Progress */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                {questions.map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2 flex-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      idx === currentRound
                        ? 'bg-purple-600 text-white shadow-sm'
                        : idx < currentRound
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {idx < currentRound ? '✓' : idx + 1}
                    </div>
                    <span className={`text-xs font-bold hidden sm:inline ${
                      idx === currentRound ? 'text-purple-900' : 'text-slate-400'
                    }`}>
                      Round {idx + 1}
                    </span>
                    {idx < questions.length - 1 && (
                      <div className="flex-1 h-0.5 bg-slate-100 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Active Question Box */}
              <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-5 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-purple-700 uppercase tracking-wider">
                    {activeQuestion.roundTitle}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-bold">
                    Oral Examination
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {activeQuestion.question}
                </h3>
              </div>

              {/* Examiner Tip Dropdown */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowTips(!showTips)}
                  className="text-xs text-purple-700 hover:text-purple-900 font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{showTips ? '▼' : '▶'}</span>
                  <span>💡 {showTips ? 'Hide Examiner Expectations' : 'What is the Examiner looking for?'}</span>
                </button>
                {showTips && (
                  <p className="mt-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 p-3 rounded-xl leading-relaxed">
                    {activeQuestion.seniorTips}
                  </p>
                )}
              </div>

              {/* User Answer Field */}
              <div>
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  // Your Architectural Defense Statement:
                </label>
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Explain your technical decisions, trade-offs, and how you mitigate edge-case failures..."
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-purple-600 focus:bg-white rounded-2xl p-4 text-xs sm:text-sm font-sans text-slate-900 outline-none transition shadow-2xs leading-relaxed resize-none"
                />
                <div className="flex items-center justify-between mt-2 text-[11px] font-mono text-slate-400">
                  <span>Aim for &gt; 35 words for comprehensive technical depth</span>
                  <span>{currentInput.trim().split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </div>
            </div>
          )}

          {/* Evaluating State */}
          {evaluating && (
            <div className="py-16 text-center">
              <div className="w-14 h-14 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-black text-slate-900 font-heading">
                AI Senior Architect Evaluating Defense...
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Analyzing trade-off depth, fault-tolerance reasoning, and security vectors
              </p>
            </div>
          )}

          {/* Result / Competency Dossier */}
          {result && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Top Score Banner */}
              <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-purple-500/30">
                <div>
                  <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-widest block mb-1">
                    // OFFICIAL PROOF OF COMPETENCY DOSSIER
                  </span>
                  <h3 className="text-2xl font-black font-heading text-white">
                    {result.grade}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono mt-1">
                    Hash: <span className="text-purple-300 font-bold">{result.competencyHash}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="text-3xl font-black text-white">{result.score}%</span>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-purple-200 mt-0.5">Viva Mastery</span>
                  </div>
                </div>
              </div>

              {/* Radar Chart & Dimension Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Technical Depth Radar
                  </span>
                  {renderRadarChart(result.radar)}
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: "Architecture & Design", val: result.radar.architecture },
                    { label: "Resilience & Fault Tolerance", val: result.radar.resilience },
                    { label: "Security & Input Safety", val: result.radar.security },
                    { label: "Performance & Concurrency", val: result.radar.performance },
                    { label: "Technical Communication", val: result.radar.communication }
                  ].map((dim) => (
                    <div key={dim.label} className="bg-white border border-slate-200 rounded-xl p-2.5">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-700">{dim.label}</span>
                        <span className="font-mono text-indigo-600">{dim.val}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                          style={{ width: `${dim.val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Strengths */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>✓</span> Demonstrated Strengths
                </h4>
                <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside">
                  {result.feedback.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {!result && !evaluating ? (
            <>
              <button
                type="button"
                onClick={handlePreviousRound}
                disabled={currentRound === 0}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              >
                ← Previous Round
              </button>

              <button
                type="button"
                onClick={handleNextRound}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white cursor-pointer transition shadow-sm flex items-center gap-1.5"
              >
                {currentRound === questions.length - 1 ? '🎓 Submit Oral Defense' : 'Next Round →'}
              </button>
            </>
          ) : result ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-mono text-slate-500 font-semibold">
                ✓ Recorded in Student Mastery Profile
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white cursor-pointer transition"
              >
                Close &amp; Resume Sprint
              </button>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  )
}
