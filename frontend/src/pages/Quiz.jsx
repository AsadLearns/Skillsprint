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
      {/* Drifting Neon Blobs */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px] animate-float-orb-1 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-pink-400/15 rounded-full blur-[120px] animate-float-orb-2 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-400/10 rounded-full blur-[90px] animate-float-orb-1 pointer-events-none"></div>

      <div className="sticky top-0 z-50 w-full">
        {/* Streetwear Announcement Marquee Ticker */}
        <div className="w-full bg-gradient-to-r from-purple-950/90 via-pink-950/90 to-purple-950/90 text-[10px] uppercase font-black tracking-widest py-1 border-b border-white/[0.04] overflow-hidden whitespace-nowrap select-none relative z-50">
          <div className="inline-block animate-marquee">
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        <nav className="nav-blur border-b border-white/[0.06] px-4 md:px-6 py-4 flex items-center justify-between bg-[#030008]/75 backdrop-blur-xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Logo />
            <span className="text-lg md:text-xl font-bold gradient-text tracking-tight hover:scale-[1.02] transition-transform duration-300">SkillSprint</span>
          </div>
          <button onClick={() => navigate('/dashboard')} className="text-xs font-bold text-slate-400 hover:text-purple-300 transition cursor-pointer">← Dashboard</button>
        </nav>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 relative z-10">

        {step === 'select' && (
          <div>
            <div className="text-center mb-10">
              <div className="text-6xl mb-4 animate-float inline-block">🧠</div>
              <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight mb-2">AI Quiz Generator</h1>
              <p className="text-slate-400 font-medium text-lg">Test your milestone concepts. Generates custom MCQs instantly.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3.5 rounded-2xl mb-6 text-center shadow-sm">
                ⚠️ {error}
              </div>
            )}

            <div className="glass-panel rounded-3xl p-6 mb-5 border border-white/50">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4 ml-1">1. Choose a skill</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {skills.map(s => (
                  <button key={s} onClick={() => { setSkill(s); setTopic('') }}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 border-2 cursor-pointer ${skill === s ? 'border-purple-600 bg-purple-500/10 text-purple-700 shadow-md shadow-purple-500/10' : 'border-slate-100 bg-white/50 text-gray-600 hover:border-purple-300 hover:bg-white'}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 ml-1">Or enter custom skill / language:</label>
                <input type="text" value={skills.includes(skill) ? '' : skill} onChange={(e) => { setSkill(e.target.value); setTopic('') }} placeholder="e.g. Rust, Go, C++, SQL, Ruby..."
                  className="w-full bg-white/50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none"
                />
              </div>
            </div>

            {skill && (
              <div className="glass-panel rounded-3xl p-6 mb-6 border border-white/50 fade-up">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4 ml-1">2. Choose a topic</h2>
                {topicsBySkill[skill] ? (
                  <div className="grid grid-cols-1 gap-2.5">
                    {topicsBySkill[skill]?.map(t => (
                      <button key={t} onClick={() => setTopic(t)}
                        className={`py-3.5 px-5 rounded-xl font-bold text-sm transition-all duration-300 border-2 text-left cursor-pointer ${topic === t ? 'border-purple-600 bg-purple-500/10 text-purple-700 shadow-md shadow-purple-500/10' : 'border-slate-100 bg-white/50 text-gray-600 hover:border-purple-300 hover:bg-white'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 ml-1">Type custom topic to generate quiz on:</label>
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Memory management, Pointers, Concurrency, Joins..."
                      className="w-full bg-white/50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none"
                    />
                  </div>
                )}
              </div>
            )}

            {skill && topic && (
              <div className="glass-panel rounded-3xl p-6 mb-6 border border-white/50 fade-up">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4 ml-1">3. Number of Questions</h2>
                <div className="flex gap-3">
                  {[5, 10, 15, 20].map(n => (
                    <button key={n} onClick={() => setCount(n)}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 border-2 cursor-pointer ${count === n ? 'border-purple-600 bg-purple-500/10 text-purple-700 shadow-md shadow-purple-500/10' : 'border-slate-100 bg-white/50 text-gray-600 hover:border-purple-300 hover:bg-white'}`}>
                      {n} Qs
                    </button>
                  ))}
                </div>
              </div>
            )}

            {skill && topic && (
              <button onClick={handleGenerate} disabled={loading}
                className="glow-btn w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-4 rounded-2xl font-bold text-base disabled:opacity-50 shadow-lg shadow-purple-600/20 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Generating quiz questions...
                  </span>
                ) : '🧠 Generate Quiz →'}
              </button>
            )}
          </div>
        )}

        {step === 'quiz' && quiz && (
          <div className="fade-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black text-gray-950 tracking-tight">{quiz.topic}</h1>
                <p className="text-gray-400 font-bold text-xs mt-0.5 uppercase tracking-wider">{quiz.skill} · {quiz.questions.length} questions</p>
              </div>
              <div className="text-xs font-bold text-purple-600 bg-purple-50 border border-purple-100 px-4 py-2 rounded-xl">
                {Object.keys(answers).length} / {quiz.questions.length} Answered
              </div>
            </div>

            {/* Sleek Progress Bar */}
            <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden mb-6 border border-slate-200/20 shadow-inner">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-500 h-full transition-all duration-500 ease-out" 
                style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>

            {/* Pagination nodes */}
            <div className="flex gap-2 mb-6">
              {quiz.questions.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${current === i ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md' : answers[i] !== undefined ? 'bg-green-500/10 text-green-700 border border-green-200' : 'bg-white border border-slate-200 text-gray-500 hover:border-purple-300'}`}>
                  {current === i ? (
                    <span className="relative flex h-2 w-2 mx-auto mb-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  ) : null}
                  {current === i ? '' : i + 1}
                </button>
              ))}
            </div>

            {/* Question Panel */}
            <div key={current} className="glass-panel rounded-3xl p-8 mb-6 border border-white/50 shadow-md animate-slide-up">
              <p className="text-[10px] text-purple-600 font-black uppercase tracking-wider mb-2">Question {current + 1} of {quiz.questions.length}</p>
              <h2 className="text-xl font-bold text-gray-950 leading-snug mb-8">{quiz.questions[current].question}</h2>
              <div className="space-y-3.5">
                {quiz.questions[current].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(current, i)}
                    className={`w-full text-left py-3.5 px-5 rounded-2xl border-2 font-medium text-sm transition-all duration-300 cursor-pointer hover:scale-[1.01] ${answers[current] === i ? 'border-purple-600 bg-purple-500/10 text-purple-700 font-bold shadow-md shadow-purple-500/5' : 'border-slate-100 bg-white/50 text-gray-700 hover:border-purple-300 hover:bg-white'}`}>
                    <span className="font-extrabold mr-3 text-purple-400">{['A', 'B', 'C', 'D'][i]}.</span>{opt}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-500 font-semibold text-sm text-center mb-4">⚠️ {error}</p>}

            <div className="flex gap-3">
              {current > 0 && (
                <button onClick={() => setCurrent(c => c - 1)} className="flex-1 border border-slate-200 bg-white/80 text-gray-600 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition cursor-pointer">← Previous</button>
              )}
              {current < quiz.questions.length - 1 ? (
                <button onClick={() => setCurrent(c => c + 1)} className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 py-3.5 rounded-xl font-bold text-sm transition cursor-pointer">Next →</button>
              ) : (
                <button onClick={handleSubmit} disabled={loading || Object.keys(answers).length < quiz.questions.length}
                  className="flex-1 glow-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3.5 rounded-xl font-black text-sm disabled:opacity-50 cursor-pointer shadow-lg shadow-purple-600/20"
                >
                  {loading ? 'Submitting...' : '✅ Submit Quiz'}
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
            
            {/* Beautiful radial visual score badge */}
            <div className="my-6 inline-flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-md border border-white/50 rounded-full w-48 h-48 shadow-lg shadow-purple-500/5">
              <span className={`text-5xl font-black ${result.quiz.score >= 80 ? 'text-green-500' : result.quiz.score >= 50 ? 'text-yellow-500' : 'text-rose-500'}`}>{result.quiz.score}%</span>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Accuracy</span>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-1.5 tracking-tight">Quiz Session Complete</h1>
            <p className="text-gray-500 font-medium mb-10">{result.correct} out of {result.total} answers correct · {quiz.topic}</p>

            {/* Answer review list */}
            <div className="space-y-5 text-left mb-10">
              {quiz.questions.map((q, i) => {
                const isCorrect = q.userAnswer === q.correct
                return (
                  <div key={i} className={`glass-panel rounded-3xl p-6 border ${isCorrect ? 'border-green-200 bg-green-50/15' : 'border-red-200 bg-red-50/15'}`}>
                    <p className="font-extrabold text-gray-950 mb-4 text-sm leading-tight">{i + 1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, j) => (
                        <div key={j} className={`py-3 px-4 rounded-xl text-xs font-semibold ${j === q.correct ? 'bg-green-500/10 text-green-700 border border-green-200/50' : j === q.userAnswer && !isCorrect ? 'bg-red-500/10 text-red-600 border border-red-200/50' : 'text-gray-500 bg-white/40'}`}>
                          <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][j]}.</span>{opt}
                          {j === q.correct && <span className="ml-2 text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Correct Answer</span>}
                          {j === q.userAnswer && !isCorrect && <span className="ml-2 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Your Answer</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setStep('select'); setQuiz(null); setResult(null); setAnswers({}) }}
                className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 py-3.5 rounded-xl font-bold text-sm transition cursor-pointer"
              >
                Take another quiz
              </button>
              <button onClick={() => navigate('/dashboard')}
                className="flex-1 glow-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3.5 rounded-xl font-black text-sm cursor-pointer shadow-md"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}