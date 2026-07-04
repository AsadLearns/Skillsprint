import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'

const skillColors = {
  'Java': 'from-orange-400 to-red-500',
  'Python': 'from-blue-400 to-blue-600',
  'React': 'from-cyan-400 to-blue-500',
  'Web Development': 'from-purple-400 to-pink-500',
  'Node.js': 'from-green-400 to-emerald-600',
  'AI/ML': 'from-pink-400 to-rose-500',
  'MongoDB': 'from-emerald-400 to-teal-600',
  'DevOps': 'from-amber-400 to-orange-500',
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [roadmaps, setRoadmaps] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [generatingDemo, setGeneratingDemo] = useState(false)

  useEffect(() => { fetchData() }, [])

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
      setRoadmaps(rm.data.roadmaps)
      setQuizzes(qz.data.quizzes)
    } catch (err) {
      console.error(err)
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
    <div className="min-h-screen hero-bg relative overflow-hidden">
      {/* Drifting Neon Blobs */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px] animate-float-orb-1 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-pink-400/15 rounded-full blur-[120px] animate-float-orb-2 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-400/10 rounded-full blur-[90px] animate-float-orb-1 pointer-events-none"></div>

      <nav className="nav-blur border-b border-purple-100/50 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <Logo size="w-8 h-8 md:w-9 md:h-9" />
          <span className="text-lg md:text-2xl font-black gradient-text tracking-tight">SkillSprint</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={() => navigate('/roadmap')} className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-[10px] md:text-xs px-2.5 md:px-4 py-2 md:py-2.5 rounded-xl font-bold shadow-md shadow-purple-500/10 cursor-pointer">
            <span className="md:inline hidden">+ New Roadmap</span>
            <span className="md:hidden">🗺️ New</span>
          </button>
          <button onClick={() => navigate('/quiz')} className="bg-white/80 border border-purple-200 text-purple-700 text-[10px] md:text-xs px-2.5 md:px-4 py-2 md:py-2.5 rounded-xl font-bold hover:bg-purple-50 transition cursor-pointer">
            <span className="md:inline hidden">🧠 Take Quiz</span>
            <span className="md:hidden">🧠 Quiz</span>
          </button>
          <button onClick={handleLogout} className="text-[10px] md:text-xs text-gray-500 hover:text-red-500 font-bold transition px-2 py-1 cursor-pointer">Log out</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 animate-slide-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Welcome back, <span className="gradient-text">{user?.name}</span> 👋
            </h1>
            <p className="text-gray-500 mt-1.5 font-medium text-sm md:text-base">Track your learning sprints, complete milestones, and crush your goals.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/50 px-5 py-3 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{user?.name}</p>
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Learner Pro</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">
          {[
            { label: 'Active Roadmaps', value: roadmaps.length, color: 'text-purple-600', border: 'border-purple-100', bg: 'bg-purple-500/10 text-purple-600', icon: '🗺️', delay: 'animation-delay-100' },
            { label: 'Weeks Completed', value: completedWeeks, color: 'text-emerald-600', border: 'border-emerald-100', bg: 'bg-emerald-500/10 text-emerald-600', icon: '✅', delay: 'animation-delay-200' },
            { label: 'Avg Progress', value: totalProgress + '%', color: 'text-blue-600', border: 'border-blue-100', bg: 'bg-blue-500/10 text-blue-600', icon: '📈', delay: 'animation-delay-300' },
            { label: 'Quiz Avg Score', value: avgQuizScore + '%', color: 'text-pink-600', border: 'border-pink-100', bg: 'bg-pink-500/10 text-pink-600', icon: '🧠', delay: 'animation-delay-500' },
          ].map((s, index) => (
            <div key={s.label} className={`glass-panel rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4 transition-all duration-300 hover:scale-[1.02] border border-white/50 animate-slide-up ${s.delay}`}>
              <div className={`${s.bg} w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-3xl shadow-sm`}>{s.icon}</div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">{s.label}</p>
                <p className={`text-xl md:text-2xl font-black mt-0.5 md:mt-1 ${s.color}`}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* High-tech toggle switches */}
        <div className="flex gap-2 mb-8 bg-slate-200/50 backdrop-blur-md p-1.5 rounded-2xl w-fit shadow-inner border border-slate-200/20">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === t ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md shadow-purple-600/20' : 'text-gray-500 hover:text-purple-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-purple-700 font-bold animate-pulse text-sm uppercase tracking-widest">Retrieving your stats...</p>
          </div>
        ) : (
          <div className="fade-up">
            
            {/* Overview tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="glass-panel rounded-3xl p-6 border border-white/50">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-extrabold text-gray-900 text-xl tracking-tight">Active Roadmaps</h2>
                    <button onClick={() => navigate('/roadmap')} className="text-sm text-purple-600 font-bold hover:text-purple-800 transition cursor-pointer">View all →</button>
                  </div>
                  {roadmaps.length === 0 ? (
                    <div className="text-center py-10 bg-white/30 rounded-2xl border border-dashed border-purple-200/70 p-6">
                      <div className="text-5xl mb-4">🗺️</div>
                      <p className="text-gray-500 font-medium text-sm mb-5">No roadmap tracks created yet</p>
                      <button onClick={() => navigate('/roadmap')} className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs px-5 py-3 rounded-xl font-bold shadow-md shadow-purple-600/10 cursor-pointer">Generate first roadmap →</button>
                    </div>
                  ) : roadmaps.slice(0, 3).map(r => (
                    <div key={r._id} onClick={() => navigate('/roadmap', { state: { autoLoadRoadmapId: r._id } })} className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/40 hover:bg-white/80 border border-transparent hover:border-purple-100 cursor-pointer transition-all duration-300 mb-3 hover:scale-[1.01]">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skillColors[r.skill] || 'from-purple-500 to-pink-500'} flex items-center justify-center text-white font-black text-sm shadow-md`}>
                        {r.skill.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-800 text-sm">{r.skill}</span>
                          <span className="text-xs font-black text-purple-600">{r.progress}%</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2 shadow-inner overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: `${r.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-panel rounded-3xl p-6 border border-white/50">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-extrabold text-gray-900 text-xl tracking-tight">Recent Quizzes</h2>
                    <button onClick={() => navigate('/quiz')} className="text-sm text-purple-600 font-bold hover:text-purple-800 transition cursor-pointer">Take quiz →</button>
                  </div>
                  {quizzes.length === 0 ? (
                    <div className="text-center py-10 bg-white/30 rounded-2xl border border-dashed border-purple-200/70 p-6">
                      <div className="text-5xl mb-4">🧠</div>
                      <p className="text-gray-500 font-medium text-sm mb-5">No quiz logs recorded</p>
                      <button onClick={() => navigate('/quiz')} className="bg-white text-purple-700 border border-purple-200 text-xs px-5 py-3 rounded-xl font-bold hover:bg-purple-50 transition cursor-pointer">Start a quiz →</button>
                    </div>
                  ) : quizzes.slice(0, 4).map(q => (
                    <div key={q._id} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/40 hover:bg-white/70 border border-transparent hover:border-purple-100 transition-all duration-300 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-xl shadow-inner">🧠</div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm leading-tight">{q.topic}</p>
                          <p className="text-xs text-gray-400 font-bold mt-0.5">{q.skill}</p>
                        </div>
                      </div>
                      <div className={`text-xs font-black px-3 py-1.5 rounded-full shadow-sm ${q.score >= 80 ? 'bg-green-50 text-green-700 border border-green-100' : q.score >= 50 ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                        {q.completed ? q.score + '%' : 'Pending'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-2 bg-gradient-to-r from-purple-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                  {/* Decorative element */}
                  <div className="absolute right-0 bottom-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mb-20"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-2xl font-extrabold mb-2 tracking-tight">Ready to learn something new?</h2>
                      <p className="text-purple-200 text-sm font-medium">Generate an advanced, structured learning roadmap for any technical skill instantly.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <button onClick={() => navigate('/roadmap')} className="glow-btn bg-white text-purple-900 font-extrabold text-xs px-5 py-3.5 rounded-xl hover:bg-purple-50 transition cursor-pointer shadow-lg shadow-white/5">🗺️ New Roadmap</button>
                      <button onClick={() => navigate('/quiz')} className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-extrabold text-xs px-5 py-3.5 rounded-xl transition cursor-pointer">🧠 Take Quiz</button>
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
                    <div className="text-center py-12 glass-panel rounded-3xl border border-dashed border-purple-200 max-w-2xl mx-auto p-8">
                      <div className="text-5xl mb-4 animate-float inline-block">🗺️</div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">No active roadmaps yet</h2>
                      <p className="text-gray-500 mb-6 font-medium text-sm">Generate a custom AI-guided path or pick one of our speed templates below!</p>
                      <button onClick={() => navigate('/roadmap')} className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-purple-600/20 cursor-pointer">🤖 Generate Roadmap →</button>
                    </div>

                    {/* Curated Speed Templates */}
                    <div className="animate-slide-up">
                      <h3 className="font-extrabold text-xs text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5 justify-center">
                        <span>⚡</span> Launch a Curated Speed Template
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[
                          { skill: 'React', desc: 'Master state, hooks, responsive layouts & Vercel deployment', level: 'Intermediate', duration: 4, color: 'from-cyan-400 to-blue-500' },
                          { skill: 'Python', desc: 'Understand basics, OOP, automation, lists & ML basics', level: 'Beginner', duration: 4, color: 'from-blue-400 to-indigo-600' },
                          { skill: 'DevOps', desc: 'Build Docker pipelines, CI/CD, Git, cloud basics & k8s', level: 'Advanced', duration: 4, color: 'from-purple-500 to-pink-500' }
                        ].map((tmpl, idx) => (
                          <div key={idx} className="glass-panel rounded-2xl p-5 border border-white/60 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md">
                            <div>
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tmpl.color} flex items-center justify-center text-white font-black text-sm mb-3 shadow-inner`}>
                                {tmpl.skill.charAt(0)}
                              </div>
                              <h4 className="font-extrabold text-gray-950 text-base">{tmpl.skill} Sprint</h4>
                              <p className="text-xs font-semibold text-purple-600 mt-0.5">{tmpl.level} · {tmpl.duration} Weeks</p>
                              <p className="text-xs text-gray-400 mt-2 leading-relaxed font-medium">{tmpl.desc}</p>
                            </div>
                            <button 
                              onClick={() => handleStartCuratedTrack(tmpl.skill, tmpl.level, tmpl.duration)}
                              disabled={generatingDemo}
                              className="mt-4 w-full bg-white/80 border border-purple-200 hover:bg-purple-50 text-purple-700 font-bold text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-sm"
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
                      <div key={r._id} onClick={() => navigate('/roadmap', { state: { autoLoadRoadmapId: r._id } })} className="glass-panel card-hover rounded-3xl p-6 cursor-pointer border border-white/50 hover:scale-[1.01]">
                        <div className="flex items-center gap-4 mb-5">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skillColors[r.skill] || 'from-purple-500 to-pink-500'} flex items-center justify-center text-white font-black text-lg shadow-md`}>
                            {r.skill.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-gray-950 tracking-tight text-lg">{r.skill}</h3>
                            <p className="text-xs font-semibold text-gray-400 mt-0.5">{r.level} · {r.duration} weeks</p>
                          </div>
                          <span className={`ml-auto text-xs font-black px-3 py-1.5 rounded-full shadow-sm border ${r.progress === 100 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
                            {r.progress === 100 ? '✅ Done' : 'In Progress'}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                            <span className="text-gray-400 uppercase tracking-wider">Progress</span>
                            <span className="font-black text-purple-600">{r.progress}%</span>
                          </div>
                          <div className="bg-gray-100 rounded-full h-2 shadow-inner overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: `${r.progress}%` }} />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 font-bold mt-4">{r.weeks.filter(w => w.completed).length} of {r.weeks.length} milestones complete</p>
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
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Quiz Dashboard</h2>
                  <button onClick={() => navigate('/quiz')} className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-xs px-5 py-3 rounded-xl font-bold shadow-md shadow-purple-500/15 cursor-pointer">🧠 New Quiz</button>
                </div>
                {quizzes.length === 0 ? (
                  <div className="text-center py-20 glass-panel rounded-3xl border-dashed border-purple-200 max-w-xl mx-auto p-8">
                    <div className="text-6xl mb-4">🧠</div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No quiz sessions yet</h2>
                    <p className="text-gray-500 mb-6 font-medium text-sm">Test your technical milestone knowledge with instant feedback.</p>
                    <button onClick={() => navigate('/quiz')} className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-purple-600/20 cursor-pointer">Start First Quiz →</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {quizzes.map(q => (
                      <div key={q._id} className="glass-panel rounded-3xl p-5 border border-white/50 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🧠</div>
                            <div>
                              <p className="font-extrabold text-gray-900 tracking-tight leading-tight">{q.topic}</p>
                              <p className="text-xs text-gray-400 font-bold mt-0.5">{q.skill} · {q.questions.length} Qs</p>
                            </div>
                          </div>
                          <div className={`text-lg font-black ${q.score >= 80 ? 'text-green-600' : q.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {q.completed ? q.score + '%' : '—'}
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2 shadow-inner overflow-hidden mt-3">
                          <div className={`h-2 rounded-full transition-all duration-500 ${q.score >= 80 ? 'bg-green-500' : q.score >= 50 ? 'bg-yellow-500' : 'bg-red-400'}`} style={{ width: `${q.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}