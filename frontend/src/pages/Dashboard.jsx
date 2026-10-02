import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'
import ChatBot from '../components/ChatBot'
import AnimatedCounter from '../components/AnimatedCounter'

const skillColors = {
  'Java': 'bg-amber-50 text-amber-700 border border-amber-200',
  'Python': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'React': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
  'Web Development': 'bg-violet-50 text-violet-700 border border-violet-200',
  'Node.js': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'AI/ML': 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200',
  'MongoDB': 'bg-teal-50 text-teal-700 border border-teal-200',
  'DevOps': 'bg-rose-50 text-rose-700 border border-rose-200',
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [roadmaps, setRoadmaps] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [generatingDemo, setGeneratingDemo] = useState(false)
  const getSuggestedSkill = (interest) => {
    const lower = interest.toLowerCase();
    if (lower.includes('web') || lower.includes('frontend') || lower.includes('javascript') || lower.includes('react')) return 'Web Development';
    if (lower.includes('mobile') || lower.includes('android') || lower.includes('ios') || lower.includes('java')) return 'Java';
    if (lower.includes('backend') || lower.includes('server') || lower.includes('api') || lower.includes('node') || lower.includes('python')) return 'Python';
    if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine learning')) return 'AI/ML';
    if (lower.includes('devops') || lower.includes('cloud') || lower.includes('docker') || lower.includes('kubernetes')) return 'DevOps';
    if (lower.includes('data') || lower.includes('database') || lower.includes('mongodb')) return 'MongoDB';
    return 'Web Development';
  }

  // Onboarding Sprint Finder States
  const [finderStep, setFinderStep] = useState(1) // 1: Build, 2: Language, 3: Recommendation
  const [finderBuild, setFinderBuild] = useState('')
  const [finderLang, setFinderLang] = useState('')
  const [finderResult, setFinderResult] = useState(null)

  const handleFinderSelectBuild = (choice) => {
    setFinderBuild(choice)
    // If DevOps or Web Dev (no language step needed), go straight to result
    if (choice === 'devops') {
      setFinderResult({
        skill: 'DevOps',
        level: 'Advanced',
        explanation: 'Since you want to build automation pipelines and cloud environments, DevOps is your perfect sprint!'
      })
      setFinderStep(3)
    } else {
      setFinderStep(2)
    }
  }

  const handleFinderSelectLang = (lang) => {
    setFinderLang(lang)
    let recommendedSkill = 'Web Development'
    let recommendedLevel = 'Beginner'
    let explanation = ''

    if (finderBuild === 'web') {
      recommendedSkill = 'React'
      recommendedLevel = 'Intermediate'
      explanation = 'Since you want to build interactive web apps using JavaScript/React, this sprint will teach you frontend state management and API integrations!'
    } else if (finderBuild === 'mobile') {
      recommendedSkill = 'Java'
      recommendedLevel = 'Intermediate'
      explanation = 'Since you want to write mobile applications, learning Java OOP foundations and mobile layout structures is the perfect route.'
    } else if (finderBuild === 'backend') {
      if (lang === 'js') {
        recommendedSkill = 'Node.js'
        recommendedLevel = 'Intermediate'
        explanation = 'Since you want to build server APIs in JavaScript, Node.js and Express is the best back-end roadmap for you!'
      } else if (lang === 'py') {
        recommendedSkill = 'Python'
        recommendedLevel = 'Intermediate'
        explanation = 'Since you want to build server backends with Python, learning Python structures and scripting is your best starting sprint!'
      } else {
        recommendedSkill = 'Java'
        recommendedLevel = 'Advanced'
        explanation = 'Since you want to build enterprise backend systems, Java databases and servers is your recommended path!'
      }
    } else if (finderBuild === 'ai') {
      recommendedSkill = 'AI/ML'
      recommendedLevel = 'Advanced'
      explanation = 'Since you want to train AI and ML models with Python, this advanced AI/ML foundations sprint is the exact path you need!'
    }

    setFinderResult({ skill: recommendedSkill, level: recommendedLevel, explanation })
    setFinderStep(3)
  }

  const handleFinderReset = () => {
    setFinderStep(1)
    setFinderBuild('')
    setFinderLang('')
    setFinderResult(null)
  }

  const [slowLoad, setSlowLoad] = useState(false)

  useEffect(() => {
    fetchData()
    const t = setTimeout(() => setSlowLoad(true), 4000)
    // Safety fallback: never block tab switching for more than 5 seconds if backend is sleeping
    const safetyTimer = setTimeout(() => setLoading(false), 5000)
    return () => {
      clearTimeout(t)
      clearTimeout(safetyTimer)
    }
  }, [])

  const handleStartCuratedTrack = async (skill, level, duration) => {
    setGeneratingDemo(true)
    try {
      const res = await api.post('/roadmap/generate', { skill, level, duration })
      await fetchData()
      navigate('/roadmap', { state: { autoLoadRoadmapId: res.data.roadmap._id } })
    } catch (err) {
      console.error(err)
    } finally {
      setGeneratingDemo(false)
    }
  }

  const fetchData = async () => {
    try {
      const [rm, qz] = await Promise.all([
        api.get('/roadmap'),
        api.get('/quiz'),
      ])
      setRoadmaps(rm.data.roadmaps || [])
      setQuizzes(qz.data.quizzes || [])
    } catch (err) {
      console.error(err)
      setRoadmaps([])
      setQuizzes([])
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() { logout(); navigate('/') }

  const totalProgress = roadmaps.length
    ? Math.round(roadmaps.reduce((s, r) => s + r.progress, 0) / roadmaps.length) : 0
  const completedWeeks = roadmaps.reduce((s, r) => s + r.weeks.filter(w => w.completed).length, 0)
  const avgQuizScore = quizzes.filter(q => q.completed).length
    ? Math.round(quizzes.filter(q => q.completed).reduce((s, q) => s + q.score, 0) / quizzes.filter(q => q.completed).length) : 0

  const tabs = ['overview', 'roadmaps', 'quizzes']

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
            <Logo size="w-8 h-8 md:w-9 md:h-9" />
            <span className="text-lg md:text-2xl font-black gradient-text tracking-tight hover:scale-[1.02] transition-transform duration-300">SkillSprint</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => navigate('/roadmap')} className="bg-gradient-to-r from-accent-500 to-indigo-600 hover:from-accent-400 hover:to-indigo-500 text-white text-[10px] md:text-xs px-3 md:px-4 py-2 md:py-2.5 rounded-xl font-bold transition-all shadow-glow-sm hover:shadow-glow cursor-pointer">
              <span className="md:inline hidden">+ New Roadmap</span>
              <span className="md:hidden">🗺️ New</span>
            </button>
            <button onClick={() => navigate('/quiz')} className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-[10px] md:text-xs px-2.5 md:px-4 py-2 md:py-2.5 rounded-xl font-semibold transition cursor-pointer shadow-xs">
              <span className="md:inline hidden">🧠 Take Quiz</span>
              <span className="md:hidden">🧠 Quiz</span>
            </button>
            <button onClick={handleLogout} className="text-[10px] md:text-xs text-slate-500 hover:text-rose-600 font-bold transition px-2 py-1 cursor-pointer">Log out</button>
          </div>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 animate-slide-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[10px] font-bold uppercase tracking-wider mb-2 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
              Sprint Intelligence Terminal
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
              Welcome back, <span className="gradient-text">{user?.name}</span> 👋
            </h1>
            <p className="text-slate-600 mt-1.5 font-medium text-sm md:text-base">Track active sprints, review milestone quizzes, and engineer your engineering stack.</p>
          </div>
          <div onClick={() => navigate('/profile')} className="flex items-center gap-3 bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-card cursor-pointer hover:border-indigo-400 transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-accent-600 to-cyber-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user?.name}</p>
              <p className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">{user?.title || 'Engineer Pro'}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">
          {[
            { label: 'Active Tracks', rawVal: roadmaps.length, suffix: '', color: 'text-cyan-700', bg: 'bg-cyan-50 text-cyan-700 border border-cyan-200', icon: '🗺️', delay: 'animation-delay-100' },
            { label: 'Weeks Done', rawVal: completedWeeks, suffix: '', color: 'text-indigo-700', bg: 'bg-indigo-50 text-indigo-700 border border-indigo-200', icon: '⚡', delay: 'animation-delay-200' },
            { label: 'Avg Progress', rawVal: totalProgress, suffix: '%', color: 'text-slate-900', bg: 'bg-slate-100 text-slate-800 border border-slate-200', icon: '📈', delay: 'animation-delay-300' },
            { label: 'Quiz Accuracy', rawVal: avgQuizScore, suffix: '%', color: 'text-emerald-700', bg: 'bg-emerald-50 text-emerald-700 border border-emerald-200', icon: '🎯', delay: 'animation-delay-500' },
          ].map((s, index) => (
            <div key={s.label} className={`surface-card rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4 transition-all duration-300 hover:scale-[1.02] hover:border-accent-500/30 border border-white/[0.08] bg-white shadow-card animate-slide-up ${s.delay}`}>
              <div className={`${s.bg} w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-sm shrink-0`}>{s.icon}</div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs text-slate-400 font-mono font-bold uppercase tracking-wider truncate">{s.label}</p>
                <p className={`text-xl md:text-2xl font-black mt-0.5 md:mt-1 ${s.color}`}>
                  <AnimatedCounter value={s.rawVal} suffix={s.suffix} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* High-tech toggle switches */}
        <div className="inline-flex items-center gap-1.5 mb-8 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${activeTab === t ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'}`}>
              {t === 'overview' && <span>📊</span>}
              {t === 'roadmaps' && <span>🗺️</span>}
              {t === 'quizzes' && <span>🧠</span>}
              <span>{t}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-bold animate-pulse text-sm uppercase tracking-widest">Retrieving your stats...</p>
            {slowLoad && (
              <p className="text-slate-500 text-xs mt-3 max-w-xs leading-relaxed">
                ⏳ The server is waking up after a quiet period — this can take up to a minute. It'll be fast once it's awake.
              </p>
            )}
          </div>
        ) : (
          <div className="fade-up">

            {/* Interest-based suggestion */}
            {user.interest && (
              <div className="glass-panel rounded-3xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-extrabold text-slate-950 text-xl tracking-tight font-heading">Based on your interest</h2>
                </div>
                <p className="text-slate-400 mb-4">
                  Based on your interest in <span className="font-semibold">{user.interest}</span>, you might enjoy learning
                  {getSuggestedSkill(user.interest)}
                  .
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/roadmap')}
                    className="flex-1 bg-white hover:bg-slate-200 text-slate-950 font-semibold text-xs py-3.5 rounded-lg cursor-pointer transition-colors"
                  >
                    Explore roadmaps
                  </button>
                  <button
                    onClick={() => handleStartCuratedTrack('Web Development', 'Beginner', 4)}
                    className="flex-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white font-semibold text-xs py-3.5 rounded-lg transition cursor-pointer"
                  >
                    Create a web app
                  </button>
                </div>
              </div>
            )}
            {/* Overview tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="surface-card rounded-3xl border border-slate-200 bg-white shadow-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-extrabold text-slate-950 text-xl tracking-tight font-heading">Active Roadmaps</h2>
                    <button onClick={() => navigate('/roadmap')} className="text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer">View all →</button>
                  </div>
                  {roadmaps.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6">
                      <div className="text-5xl mb-4">🗺️</div>
                      <p className="text-slate-400 font-medium text-sm mb-5">No roadmap tracks created yet</p>
                      <button onClick={() => navigate('/roadmap')} className="bg-gradient-to-r from-accent-500 to-indigo-600 hover:from-accent-400 hover:to-indigo-500 text-white text-xs px-5 py-3 rounded-xl font-bold cursor-pointer transition shadow-glow-sm">Generate first roadmap →</button>
                    </div>
                  ) : roadmaps.slice(0, 3).map(r => (
                    <div key={r._id} onClick={() => navigate('/roadmap', { state: { autoLoadRoadmapId: r._id } })} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-indigo-300 shadow-xs cursor-pointer transition-all duration-300 mb-3 hover:scale-[1.01]">
                      <div className={`w-12 h-12 rounded-xl ${skillColors[r.skill] || 'bg-white/[0.06] text-slate-200 border border-white/[0.1]'} flex items-center justify-center font-black text-sm shrink-0`}>
                        {r.skill.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-slate-900 text-sm truncate">{r.skill}</span>
                          <span className="text-xs font-mono font-black text-indigo-600">{r.progress}%</span>
                        </div>
                        <div className="bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                          <div className="bg-gradient-to-r from-accent-500 to-cyber-400 h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" style={{ width: `${r.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="surface-card rounded-3xl border border-slate-200 bg-white shadow-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-extrabold text-slate-950 text-xl tracking-tight font-heading">Recent Quizzes</h2>
                    <button onClick={() => navigate('/quiz')} className="text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer">Take quiz →</button>
                  </div>
                  {quizzes.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6">
                      <div className="text-5xl mb-4">🧠</div>
                      <p className="text-slate-400 font-medium text-sm mb-5">No quiz logs recorded</p>
                      <button onClick={() => navigate('/quiz')} className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 text-xs px-5 py-3 rounded-xl font-semibold transition cursor-pointer">Start a quiz →</button>
                    </div>
                  ) : quizzes.slice(0, 4).map(q => (
                    <div key={q._id} onClick={() => navigate('/quiz', { state: { resumeQuiz: q } })} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-indigo-300 shadow-xs cursor-pointer transition-all duration-300 mb-3 hover:scale-[1.01]">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-accent-500/10 border border-accent-500/20 text-accent-300 rounded-xl flex items-center justify-center text-lg shrink-0">🧠</div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-sm leading-tight truncate">{q.topic}</p>
                          <p className="text-xs font-mono text-slate-400 mt-0.5">{q.skill}</p>
                        </div>
                      </div>
                      <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-full border shrink-0 ${q.score >= 80 ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25' : q.score >= 50 ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/25' : q.completed ? 'bg-rose-500/10 text-rose-300 border-rose-500/25' : 'bg-accent-500/10 text-accent-300 border-accent-500/25'}`}>
                        {q.completed ? q.score + '%' : 'Continue →'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-2 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/80 rounded-3xl p-8 text-slate-900 relative overflow-hidden shadow-card border border-indigo-100 transition-all duration-500">
                  <div className="absolute right-0 bottom-0 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-accent-500/10 border border-accent-500/25 text-accent-300 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                        ACCELERATED SPRINTING
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight text-slate-950 font-heading">Ready to learn something new?</h2>
                      <p className="text-slate-400 text-sm font-medium max-w-xl">Generate an advanced, structured learning roadmap for any technical skill with week-by-week milestones and AI study guides.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <button onClick={() => navigate('/roadmap')} className="bg-gradient-to-r from-accent-500 to-indigo-600 hover:from-accent-400 hover:to-indigo-500 text-white font-bold text-xs px-5 py-3.5 rounded-xl cursor-pointer transition shadow-glow-sm">🗺️ New Roadmap</button>
                      <button onClick={() => navigate('/quiz')} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs px-5 py-3.5 rounded-xl transition cursor-pointer shadow-xs">🧠 Take Quiz</button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Roadmaps tab */}
            {activeTab === 'roadmaps' && (
              <div>
                {roadmaps.length === 0 ? (
                  <div className="flex flex-col gap-8">
                    
                    {/* Onboarding Sprint Finder Wizard */}
                    <div className="glass-panel rounded-3xl p-6 md:p-8 max-w-2xl mx-auto w-full text-center relative overflow-hidden border border-white/[0.06] shadow-2xl">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500/[0.05] rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                      {finderStep === 1 && (
                        <div className="animate-fade-in">
                          <span className="text-3xl inline-block mb-3 animate-bounce">⚡</span>
                          <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-2 font-heading">Find Your Perfect Learning Path</h2>
                          <p className="text-slate-600 font-medium text-xs md:text-sm mb-8">Choose what you want to create and build:</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            {[
                              { id: 'web', title: '🎨 Web & UI Frontends', desc: 'Build modern, responsive websites & web apps.' },
                              { id: 'mobile', title: '📱 Mobile Applications', desc: 'Build Android/iOS native or cross-platform apps.' },
                              { id: 'backend', title: '🛠️ Server APIs & Databases', desc: 'Write backend routes, models & databases.' },
                              { id: 'devops', title: '🚀 DevOps & Deployments', desc: 'Configure cloud deployments & CI/CD servers.' },
                              { id: 'ai', title: '🤖 AI, Machine Learning & Scripts', desc: 'Write models, data scripts & automations.' }
                            ].map((opt) => (
                              <div 
                                key={opt.id}
                                onClick={() => handleFinderSelectBuild(opt.id)}
                                className="p-4 bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 rounded-2xl cursor-pointer hover:scale-[1.01] transition-all duration-300 shadow-xs"
                              >
                                <h4 className="font-extrabold text-slate-900 text-sm">{opt.title}</h4>
                                <p className="text-[11px] text-slate-400 mt-1 font-medium">{opt.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {finderStep === 2 && (
                        <div className="animate-fade-in">
                          <span className="text-3xl inline-block mb-3">💻</span>
                          <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-2 font-heading">Preferred Coding Language</h2>
                          <p className="text-slate-600 font-medium text-xs md:text-sm mb-8">Select the programming language you want to write code in:</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {[
                              { id: 'js', name: 'JavaScript / React', desc: 'Great for Web & APIs', icon: '💛' },
                              { id: 'py', name: 'Python', desc: 'Great for AI & Scripting', icon: '🐍' },
                              { id: 'java', name: 'Java', desc: 'Great for Android & Backends', icon: '☕' }
                            ].map((lang) => (
                              <div 
                                key={lang.id}
                                onClick={() => handleFinderSelectLang(lang.id)}
                                className="p-5 bg-[#131d33]/50 hover:bg-[#1e2d4a]/60 border border-white/[0.05] hover:border-white/[0.16] rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-sm flex flex-col items-center text-center"
                              >
                                <span className="text-3xl mb-2">{lang.icon}</span>
                                <h4 className="font-extrabold text-slate-900 text-xs">{lang.name}</h4>
                                <p className="text-[10px] text-slate-400 mt-1 font-semibold">{lang.desc}</p>
                              </div>
                            ))}
                          </div>

                          <button 
                            onClick={() => setFinderStep(1)}
                            className="text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
                          >
                            ← Back to choices
                          </button>
                        </div>
                      )}

                      {finderStep === 3 && finderResult && (
                        <div className="animate-scale-up py-4">
                          <span className="text-4xl inline-block mb-4">🏆</span>
                          <span className="text-[10px] font-bold text-accent-400 uppercase tracking-widest block mb-1">Recommended Sprint</span>
                          <h2 className="text-3xl font-black text-accent-400 tracking-tight mb-2">
                            {finderResult.skill} Roadmap
                          </h2>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                            Level: {finderResult.level} · 4-Week Track
                          </p>
                          
                          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8 max-w-md mx-auto text-left">
                            <p className="text-xs text-slate-700 font-semibold leading-relaxed">{finderResult.explanation}</p>
                          </div>

                          <div className="flex gap-4 max-w-sm mx-auto flex-col sm:flex-row">
                            <button 
                              disabled={generatingDemo}
                              onClick={() => handleStartCuratedTrack(finderResult.skill, finderResult.level, 4)}
                              className="flex-1 bg-white hover:bg-slate-200 text-slate-950 font-semibold text-xs py-3 rounded-lg cursor-pointer transition-colors"
                            >
                              {generatingDemo ? 'Generating Sprint...' : '🚀 Launch This Sprint'}
                            </button>
                            <button 
                              onClick={handleFinderReset}
                              className="px-6 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition shadow-xs"
                            >
                              Restart Finder
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Curated Speed Templates */}
                    <div className="animate-slide-up">
                      <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5 justify-center">
                        <span>⚡</span> Or Quick-Launch a Curated Speed Template
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[
                          { skill: 'React', desc: 'Master state, hooks, responsive layouts & Vercel deployment', level: 'Intermediate', duration: 4, color: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25' },
                          { skill: 'Python', desc: 'Understand basics, OOP, automation, lists & ML basics', level: 'Beginner', duration: 4, color: 'bg-sky-500/15 text-sky-300 border border-sky-500/25' },
                          { skill: 'DevOps', desc: 'Build Docker pipelines, CI/CD, Git, cloud basics & k8s', level: 'Advanced', duration: 4, color: 'bg-amber-500/15 text-amber-300 border border-amber-500/25' }
                        ].map((tmpl, idx) => (
                          <div key={idx} className="glass-panel rounded-2xl p-5 border border-white/[0.05] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md">
                            <div>
                              <div className={`w-10 h-10 rounded-xl ${tmpl.color} flex items-center justify-center font-black text-sm mb-3`}>
                                {tmpl.skill.charAt(0)}
                              </div>
                              <h4 className="font-extrabold text-slate-900 text-base font-heading">{tmpl.skill} Sprint</h4>
                              <p className="text-xs font-semibold text-accent-400 mt-0.5">{tmpl.level} · {tmpl.duration} Weeks</p>
                              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">{tmpl.desc}</p>
                            </div>
                            <button 
                              onClick={() => handleStartCuratedTrack(tmpl.skill, tmpl.level, tmpl.duration)}
                              disabled={generatingDemo}
                              className="mt-4 w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-semibold text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                            >
                              {generatingDemo ? 'Spawning...' : 'Launch Track 🚀'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {roadmaps.map(r => (
                      <div key={r._id} onClick={() => navigate('/roadmap', { state: { autoLoadRoadmapId: r._id } })} className="glass-panel card-hover rounded-3xl p-6 cursor-pointer hover:scale-[1.01] transition-all duration-300">
                        <div className="flex items-center gap-4 mb-5">
                          <div className={`w-14 h-14 rounded-xl ${skillColors[r.skill] || 'bg-white/[0.06] text-slate-200 border border-white/[0.1]'} flex items-center justify-center font-black text-lg`}>
                            {r.skill.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-slate-100 tracking-tight text-lg">{r.skill}</h3>
                            <p className="text-xs font-semibold text-slate-400 mt-0.5">{r.level} · {r.duration} weeks</p>
                          </div>
                          <span className={`ml-auto text-xs font-black px-3 py-1.5 rounded-full border ${r.progress === 100 ? 'bg-accent-500/10 text-accent-300 border-accent-500/25' : 'bg-white/[0.04] text-slate-300 border-white/[0.1]'}`}>
                            {r.progress === 100 ? '✅ Done' : 'In Progress'}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                            <span className="text-slate-400 uppercase tracking-wider">Progress</span>
                            <span className="font-black text-accent-400">{r.progress}%</span>
                          </div>
                          <div className="bg-slate-100 shadow-inner rounded-full h-2 overflow-hidden border border-slate-200">
                            <div className="bg-accent-500 h-2 rounded-full transition-all duration-500" style={{ width: `${r.progress}%` }} />
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 font-bold mt-4">{r.weeks.filter(w => w.completed).length} of {r.weeks.length} milestones complete</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quizzes tab */}
            {activeTab === 'quizzes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Quiz Dashboard</h2>
                  <button onClick={() => navigate('/quiz')} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-5 py-3 rounded-xl font-bold cursor-pointer transition shadow-xs">🧠 New Quiz</button>
                </div>
                {quizzes.length === 0 ? (
                  <div className="text-center py-20 glass-panel rounded-3xl border-dashed border-white/[0.12] max-w-xl mx-auto p-8 animate-fade-in">
                    <div className="text-6xl mb-4">🧠</div>
                    <h2 className="text-xl font-bold text-slate-950 mb-2 font-heading">No quiz sessions yet</h2>
                    <p className="text-slate-400 mb-6 font-medium text-sm">Test your technical milestone knowledge with instant feedback.</p>
                    <button onClick={() => navigate('/quiz')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition shadow-md">Start First Quiz →</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
                    {quizzes.map(q => (
                      <div key={q._id} onClick={() => navigate('/quiz', { state: { resumeQuiz: q } })} className="glass-panel card-hover rounded-3xl p-5 border border-white/[0.04] flex flex-col justify-between cursor-pointer transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-2xl flex items-center justify-center text-2xl shadow-xs">🧠</div>
                            <div>
                              <p className="font-extrabold text-slate-100 tracking-tight leading-tight">{q.topic}</p>
                              <p className="text-xs text-slate-400 font-bold mt-0.5">{q.skill} · {q.questions.length} Qs</p>
                            </div>
                          </div>
                          <div className={`text-lg font-black ${q.score >= 80 ? 'text-green-400' : q.score >= 50 ? 'text-yellow-400' : q.completed ? 'text-red-400' : 'text-accent-400'}`}>
                            {q.completed ? q.score + '%' : ''}
                          </div>
                        </div>
                        {q.completed ? (
                          <div className="bg-slate-100 shadow-inner rounded-full h-2 overflow-hidden border border-slate-200 mt-3">
                            <div className={`h-2 rounded-full transition-all duration-500 ${q.score >= 80 ? 'bg-green-500' : q.score >= 50 ? 'bg-yellow-500' : 'bg-red-400'}`} style={{ width: `${q.score}%` }} />
                          </div>
                        ) : (
                          <div className="text-xs font-black text-accent-400 mt-1">Continue quiz →</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}
      </div>
      <ChatBot />
    </div>
  )
}