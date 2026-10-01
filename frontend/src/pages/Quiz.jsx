import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'

const skills = ['Java', 'Python', 'React', 'Web Development', 'Node.js', 'AI/ML', 'MongoDB', 'DevOps']

const topicsBySkill = {
  'Java': ['Variables & Data Types', 'OOP Concepts', 'Collections', 'Exception Handling', 'Threads'],
  'Python': ['Python Basics', 'Functions', 'Lists & Dicts', 'OOP in Python', 'File Handling'],
  'React': ['JSX Basics', 'Components & Props', 'useState Hook', 'useEffect Hook', 'React Router'],
  'Web Development': ['HTML Basics', 'CSS Flexbox', 'JavaScript DOM', 'Responsive Design', 'APIs'],
  'Node.js': ['Node Basics', 'Express Routes', 'Middleware', 'REST APIs', 'Authentication'],
  'AI/ML': ['ML Basics', 'Supervised Learning', 'Neural Networks', 'Model Evaluation', 'NLP'],
  'MongoDB': ['NoSQL Basics', 'CRUD Operations', 'Schema Design', 'Aggregation', 'Indexing'],
  'DevOps': ['Git Basics', 'Docker', 'CI/CD', 'Kubernetes', 'Cloud Basics'],
}

export default function Quiz() {
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState('select')
  const [skill, setSkill] = useState('')
  const [topic, setTopic] = useState('')
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (location.state?.resumeQuiz) {
      const resumed = location.state.resumeQuiz
      setQuiz(resumed)
      if (resumed.completed) {
        const correct = resumed.questions.filter(q => q.userAnswer === q.correct).length
        setResult({ quiz: resumed, correct, total: resumed.questions.length })
        setStep('result')
      } else {
        setAnswers({})
        setCurrent(0)
        setStep('quiz')
      }
      return
    }
    if (location.state?.skill) {
      setSkill(location.state.skill)
    }
    if (location.state?.topic) {
      setTopic(location.state.topic)
    }
  }, [location.state])

  const handleGenerate = async () => {
    if (!skill || !topic) return setError('Please select both skill and topic')
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/quiz/generate', { skill, topic, count })
      setQuiz(res.data.quiz)
      setStep('quiz')
      setCurrent(0)
      setAnswers({})
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate quiz. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (qIndex, aIndex) => {
    setAnswers(prev => ({ ...prev, [qIndex]: aIndex }))
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quiz.questions.length) {
      return setError('Please answer all questions before submitting')
    }
    setLoading(true)
    try {
      const answerArray = quiz.questions.map((_, i) => answers[i] ?? -1)
      const res = await api.put(`/quiz/${quiz._id}/submit`, { answers: answerArray })
      setResult(res.data)
      setQuiz(res.data.quiz)
      setStep('result')
    } catch (err) {
      setError('Failed to submit quiz')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen hero-bg relative overflow-hidden">
      <div className="sticky top-0 z-50 w-full">
        {/* Announcement Marquee Ticker */}
        <div className="w-full bg-[#131d33] font-mono text-[10px] uppercase tracking-widest text-slate-500 py-1.5 border-b border-white/[0.06] overflow-hidden whitespace-nowrap select-none relative z-50">
          <div className="inline-block animate-marquee">
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        <nav className="nav-blur border-b border-white/[0.06] px-4 md:px-6 py-4 flex items-center justify-between bg-[#0b1220]/75 backdrop-blur-xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Logo />
            <span className="text-lg md:text-xl font-bold gradient-text tracking-tight hover:scale-[1.02] transition-transform duration-300">SkillSprint</span>
          </div>
          <button onClick={() => navigate('/dashboard')} className="text-xs font-bold text-slate-400 hover:text-slate-200 transition cursor-pointer">← Dashboard</button>
        </nav>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 relative z-10">

        {step === 'select' && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/25 mb-4 text-accent-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-pulse"></span>
                AI Milestone Verification
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-100 tracking-tight mb-2">Quiz Generator</h1>
              <p className="text-slate-400 font-medium text-base md:text-lg max-w-lg mx-auto">Validate your concept mastery. AI generates customized assessment scenarios instantly.</p>
            </div>

            {error && (
              <div className="bg-rose-950/40 border border-rose-900/50 text-rose-300 text-sm px-4 py-3.5 rounded-xl mb-6 text-center">
                ⚠️ {error}
              </div>
            )}

            <div className="surface-card rounded-3xl border border-white/[0.08] bg-[#0c1324]/80 backdrop-blur-xl p-6 mb-5">
              <h2 className="text-xs font-mono font-bold text-cyber-400 uppercase tracking-widest block mb-4 ml-1">// 01. SELECT DOMAIN</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {skills.map(s => (
                  <button key={s} onClick={() => { setSkill(s); setTopic('') }}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 border cursor-pointer ${skill === s ? 'border-accent-500 bg-accent-500/20 text-white shadow-glow-sm' : 'border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-accent-500/40 hover:bg-white/[0.06]'}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Or enter custom skill / language:</label>
                <input type="text" value={skills.includes(skill) ? '' : skill} onChange={(e) => { setSkill(e.target.value); setTopic('') }} placeholder="e.g. Rust, Go, C++, SQL, Ruby, GraphQL..."
                  className="w-full bg-[#080d19] border border-white/[0.08] text-white focus:border-accent-500/60 focus:bg-[#0c1324] rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
                />
              </div>
            </div>

            {skill && (
              <div className="surface-card rounded-3xl border border-white/[0.08] bg-[#0c1324]/80 backdrop-blur-xl p-6 mb-5 fade-up">
                <h2 className="text-xs font-mono font-bold text-accent-400 uppercase tracking-widest block mb-4 ml-1">// 02. SELECT TOPIC</h2>
                {topicsBySkill[skill] ? (
                  <div className="grid grid-cols-1 gap-2.5">
                    {topicsBySkill[skill]?.map(t => (
                      <button key={t} onClick={() => setTopic(t)}
                        className={`py-3.5 px-5 rounded-xl font-bold text-sm transition-all duration-300 border text-left cursor-pointer ${topic === t ? 'border-accent-500 bg-accent-500/20 text-white shadow-glow-sm' : 'border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-accent-500/40 hover:bg-white/[0.06]'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Type custom topic to generate quiz on:</label>
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Memory management, Pointers, Concurrency, Joins..."
                      className="w-full bg-[#080d19] border border-white/[0.08] text-white focus:border-accent-500/60 focus:bg-[#0c1324] rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
                    />
                  </div>
                )}
              </div>
            )}

            {skill && topic && (
              <div className="surface-card rounded-3xl border border-white/[0.08] bg-[#0c1324]/80 backdrop-blur-xl p-6 mb-6 fade-up">
                <h2 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-4 ml-1">// 03. QUESTION COUNT</h2>
                <div className="flex gap-3">
                  {[5, 10, 15, 20].map(n => (
                    <button key={n} onClick={() => setCount(n)}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 border cursor-pointer ${count === n ? 'border-accent-500 bg-accent-500/20 text-white shadow-glow-sm' : 'border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-accent-500/40 hover:bg-white/[0.06]'}`}>
                      {n} Qs
                    </button>
                  ))}
                </div>
              </div>
            )}

            {skill && topic && (
              <button onClick={handleGenerate} disabled={loading}
                className="w-full bg-gradient-to-r from-accent-500 to-indigo-600 hover:from-accent-400 hover:to-indigo-500 text-white py-4 rounded-xl font-bold text-base shadow-glow-sm hover:shadow-glow disabled:opacity-50 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Synthesizing questions...
                  </span>
                ) : '⚡ Generate Quiz →'}
              </button>
            )}
          </div>
        )}

        {step === 'quiz' && quiz && (
          <div className="fade-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black text-slate-100 tracking-tight">{quiz.topic}</h1>
                <p className="text-slate-400 font-mono text-xs mt-0.5 uppercase tracking-wider">{quiz.skill} · {quiz.questions.length} questions</p>
              </div>
              <div className="text-xs font-mono font-bold text-cyber-400 bg-cyber-500/10 border border-cyber-500/20 px-3.5 py-1.5 rounded-full">
                {Object.keys(answers).length} / {quiz.questions.length} Answered
              </div>
            </div>

            {/* Sleek Progress Bar */}
            <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden mb-6 border border-white/[0.04]">
              <div
                className="bg-gradient-to-r from-accent-500 to-cyber-400 h-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>

            {/* Pagination nodes */}
            <div className="flex flex-wrap gap-2 mb-6">
              {quiz.questions.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${current === i ? 'bg-gradient-to-r from-accent-500 to-indigo-600 text-white shadow-glow-sm' : answers[i] !== undefined ? 'bg-accent-500/15 text-accent-300 border border-accent-500/30' : 'bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:border-white/[0.2]'}`}>
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Question Panel */}
            <div key={current} className="surface-card rounded-3xl p-6 md:p-8 mb-6 border border-white/[0.08] bg-[#0c1324]/85 backdrop-blur-xl shadow-2xl animate-slide-up">
              <p className="text-[10px] text-cyber-400 font-mono font-bold uppercase tracking-wider mb-2">Question {current + 1} of {quiz.questions.length}</p>
              <h2 className="text-xl font-bold text-slate-100 leading-snug mb-8">{quiz.questions[current].question}</h2>
              <div className="space-y-3">
                {quiz.questions[current].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(current, i)}
                    className={`w-full text-left py-3.5 px-5 rounded-xl border font-medium text-sm transition-all duration-300 cursor-pointer hover:scale-[1.01] ${answers[current] === i ? 'border-accent-500 bg-accent-500/20 text-white font-bold shadow-glow-sm' : 'border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-white/[0.16] hover:bg-white/[0.06]'}`}>
                    <span className="font-mono font-bold mr-3 text-slate-500">{['A', 'B', 'C', 'D'][i]}.</span>{opt}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-rose-400 font-semibold text-sm text-center mb-4">⚠️ {error}</p>}

            <div className="flex gap-3">
              {current > 0 && (
                <button onClick={() => setCurrent(c => c - 1)} className="flex-1 border border-white/[0.1] bg-white/[0.03] text-slate-300 py-3.5 rounded-xl font-bold text-sm hover:bg-white/[0.06] transition cursor-pointer">← Previous</button>
              )}
              {current < quiz.questions.length - 1 ? (
                <button onClick={() => setCurrent(c => c + 1)} className="flex-1 bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 py-3.5 rounded-xl font-bold text-sm transition cursor-pointer">Next →</button>
              ) : (
                <button onClick={handleSubmit} disabled={loading || Object.keys(answers).length < quiz.questions.length}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 py-3.5 rounded-xl font-bold text-sm disabled:opacity-50 cursor-pointer transition shadow-sm"
                >
                  {loading ? 'Evaluating...' : '✅ Submit Assessment'}
                </button>
              )}
            </div>
          </div>
        )}

        {step === 'result' && quiz && result && (
          <div className="text-center fade-up">
            <div className="text-7xl mb-4 animate-float inline-block">
              {result.quiz.score >= 80 ? '🎉' : result.quiz.score >= 50 ? '👍' : '💪'}
            </div>
            
            {/* Luminous visual score badge */}
            <div className="my-6 inline-flex flex-col items-center justify-center p-8 bg-[#0c1324]/90 border border-white/[0.1] rounded-full w-48 h-48 shadow-2xl relative">
              <span className={`text-5xl font-mono font-black ${result.quiz.score >= 80 ? 'text-emerald-400' : result.quiz.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>{result.quiz.score}%</span>
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest mt-1">Accuracy</span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-100 mb-1.5 tracking-tight">Assessment Complete</h1>
            <p className="text-slate-400 font-medium mb-10">{result.correct} out of {result.total} answers correct · {quiz.topic}</p>

            {/* Answer review list */}
            <div className="space-y-4 text-left mb-10">
              {quiz.questions.map((q, i) => {
                const isCorrect = q.userAnswer === q.correct
                return (
                  <div key={i} className={`surface-card rounded-2xl p-6 border ${isCorrect ? 'border-emerald-500/20 bg-emerald-950/10' : 'border-rose-500/20 bg-rose-950/10'}`}>
                    <p className="font-extrabold text-slate-100 mb-4 text-sm leading-tight">{i + 1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, j) => (
                        <div key={j} className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-between ${j === q.correct ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25' : j === q.userAnswer && !isCorrect ? 'bg-rose-500/10 text-rose-300 border border-rose-500/25' : 'text-slate-400 bg-white/[0.02]'}`}>
                          <div>
                            <span className="font-mono font-bold mr-2 text-slate-500">{['A', 'B', 'C', 'D'][j]}.</span>{opt}
                          </div>
                          {j === q.correct && <span className="ml-2 text-[9px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-mono font-black uppercase tracking-wider">Correct Answer</span>}
                          {j === q.userAnswer && !isCorrect && <span className="ml-2 text-[9px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-mono font-black uppercase tracking-wider">Your Pick</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setStep('select'); setQuiz(null); setResult(null); setAnswers({}) }}
                className="flex-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 py-3.5 rounded-xl font-bold text-sm transition cursor-pointer"
              >
                Take another quiz
              </button>
              <button onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gradient-to-r from-accent-500 to-indigo-600 hover:from-accent-400 hover:to-indigo-500 text-white py-3.5 rounded-xl font-bold text-sm cursor-pointer transition shadow-glow-sm"
              >
                Back to Terminal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}