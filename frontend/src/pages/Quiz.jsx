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
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="sticky top-0 z-50 w-full">
        {/* Announcement Marquee Ticker */}
        <div className="w-full bg-slate-100 font-mono text-[10px] uppercase tracking-widest text-slate-600 py-1.5 border-b border-slate-200 overflow-hidden whitespace-nowrap select-none relative z-50">
          <div className="inline-block animate-marquee">
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        <nav className="border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between bg-white/90 backdrop-blur-xl shadow-xs">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Logo />
            <span className="text-lg md:text-xl font-bold gradient-text tracking-tight hover:scale-[1.02] transition-transform duration-300">SkillSprint</span>
          </div>
          <button onClick={() => navigate('/dashboard')} className="text-xs font-bold text-slate-600 hover:text-slate-950 font-bold transition cursor-pointer">← Dashboard</button>
        </nav>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 relative z-10">

        {step === 'select' && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 mb-4 text-indigo-700 font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                AI Milestone Verification
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight mb-2 font-heading">Quiz Generator</h1>
              <p className="text-slate-600 font-medium text-base md:text-lg max-w-lg mx-auto">Validate your concept mastery. AI generates customized assessment scenarios instantly.</p>
            </div>

            {error && (
              <div className="bg-rose-950/40 border border-rose-900/50 text-rose-300 text-sm px-4 py-3.5 rounded-xl mb-6 text-center">
                ⚠️ {error}
              </div>
            )}

            <div className="surface-card rounded-3xl border border-slate-200 bg-white p-6 mb-5 shadow-card">
              <h2 className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-4 ml-1">// 01. SELECT DOMAIN</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {skills.map(s => (
                  <button key={s} onClick={() => { setSkill(s); setTopic('') }}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 border cursor-pointer ${skill === s ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider block mb-2 ml-1">Or enter custom skill / language:</label>
                <input type="text" value={skills.includes(skill) ? '' : skill} onChange={(e) => { setSkill(e.target.value); setTopic('') }} placeholder="e.g. Rust, Go, C++, SQL, Ruby, GraphQL..."
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
                />
              </div>
            </div>

            {skill && (
              <div className="surface-card rounded-3xl border border-slate-200 bg-white p-6 mb-5 shadow-card fade-up">
                <h2 className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-4 ml-1">// 02. SELECT TOPIC</h2>
                {topicsBySkill[skill] ? (
                  <div className="grid grid-cols-1 gap-2.5">
                    {topicsBySkill[skill]?.map(t => (
                      <button key={t} onClick={() => setTopic(t)}
                        className={`py-3.5 px-5 rounded-xl font-bold text-sm transition-all duration-300 border text-left cursor-pointer ${topic === t ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider block mb-2 ml-1">Type custom topic to generate quiz on:</label>
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Memory management, Pointers, Concurrency, Joins..."
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
                    />
                  </div>
                )}
              </div>
            )}

            {skill && topic && (
              <div className="surface-card rounded-3xl border border-slate-200 bg-white p-6 mb-6 shadow-card fade-up">
                <h2 className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-4 ml-1">// 03. QUESTION COUNT</h2>
                <div className="flex gap-3">
                  {[5, 10, 15, 20].map(n => (
                    <button key={n} onClick={() => setCount(n)}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 border cursor-pointer ${count === n ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'}`}>
                      {n} Qs
                    </button>
                  ))}
                </div>
              </div>
            )}

            {skill && topic && (
              <button onClick={handleGenerate} disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-4 rounded-xl font-bold text-base shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
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
                <h1 className="text-2xl font-black text-slate-950 tracking-tight font-heading">{quiz.topic}</h1>
                <p className="text-slate-500 font-mono text-xs mt-0.5 uppercase tracking-wider">{quiz.skill} · {quiz.questions.length} questions</p>
              </div>
              <div className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-full shadow-xs">
                {Object.keys(answers).length} / {quiz.questions.length} Answered
              </div>
            </div>

            {/* Sleek Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6 border border-slate-200">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full transition-all duration-500 ease-out shadow-xs"
                style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>

            {/* Pagination nodes */}
            <div className="flex flex-wrap gap-2 mb-6">
              {quiz.questions.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${current === i ? 'bg-indigo-600 text-white shadow-xs' : answers[i] !== undefined ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}>
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Question Panel */}
            <div key={current} className="surface-card rounded-3xl p-6 md:p-8 mb-6 border border-slate-200 bg-white shadow-card animate-slide-up">
              <p className="text-[10px] text-indigo-600 font-mono font-bold uppercase tracking-wider mb-2">Question {current + 1} of {quiz.questions.length}</p>
              <h2 className="text-xl font-bold text-slate-950 leading-snug mb-8 font-heading">{quiz.questions[current].question}</h2>
              <div className="space-y-3">
                {quiz.questions[current].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(current, i)}
                    className={`w-full text-left py-3.5 px-5 rounded-xl border font-medium text-sm transition-all duration-300 cursor-pointer hover:scale-[1.01] ${answers[current] === i ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-xs' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'}`}>
                    <span className="font-mono font-bold mr-3 text-slate-500">{['A', 'B', 'C', 'D'][i]}.</span>{opt}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-rose-400 font-semibold text-sm text-center mb-4">⚠️ {error}</p>}

            <div className="flex gap-3">
              {current > 0 && (
                <button onClick={() => setCurrent(c => c - 1)} className="flex-1 border border-slate-300 bg-white text-slate-700 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition cursor-pointer shadow-xs">← Previous</button>
              )}
              {current < quiz.questions.length - 1 ? (
                <button onClick={() => setCurrent(c => c + 1)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 rounded-xl font-bold text-sm transition cursor-pointer shadow-xs">Next →</button>
              ) : (
                <button onClick={handleSubmit} disabled={loading || Object.keys(answers).length < quiz.questions.length}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-3.5 rounded-xl font-bold text-sm disabled:opacity-50 cursor-pointer transition shadow-md"
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
            <div className="my-6 inline-flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-full w-48 h-48 shadow-card relative">
              <span className={`text-5xl font-mono font-black ${result.quiz.score >= 80 ? 'text-emerald-400' : result.quiz.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>{result.quiz.score}%</span>
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest mt-1">Accuracy</span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-950 mb-1.5 tracking-tight font-heading">Assessment Complete</h1>
            <p className="text-slate-600 font-medium mb-10">{result.correct} out of {result.total} answers correct · {quiz.topic}</p>

            {/* Answer review list */}
            <div className="space-y-4 text-left mb-10">
              {quiz.questions.map((q, i) => {
                const isCorrect = q.userAnswer === q.correct
                return (
                  <div key={i} className={`surface-card rounded-2xl p-6 border ${isCorrect ? 'border-emerald-500/20 bg-emerald-950/10' : 'border-rose-500/20 bg-rose-950/10'}`}>
                    <p className="font-extrabold text-slate-900 mb-4 text-sm leading-tight">{i + 1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, j) => (
                        <div key={j} className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-between ${j === q.correct ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : j === q.userAnswer && !isCorrect ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'text-slate-600 bg-slate-50 border border-slate-200'}`}>
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
                className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 py-3.5 rounded-xl font-bold text-sm transition cursor-pointer shadow-xs"
              >
                Take another quiz
              </button>
              <button onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3.5 rounded-xl font-bold text-sm cursor-pointer transition shadow-md"
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