import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'
import ChatBot from '../components/ChatBot'

const skills = ['Java', 'Python', 'React', 'Web Development', 'Node.js', 'AI/ML', 'MongoDB', 'DevOps']
const levels = ['Beginner', 'Intermediate', 'Advanced']
const durations = [4, 6, 8, 12]

const skillColors = {
  'Java': 'from-orange-400 to-red-500 shadow-orange-500/10',
  'Python': 'from-blue-400 to-blue-600 shadow-blue-500/10',
  'React': 'from-cyan-400 to-blue-500 shadow-cyan-500/10',
  'Web Development': 'from-purple-400 to-pink-500 shadow-purple-500/10',
  'Node.js': 'from-green-400 to-emerald-600 shadow-emerald-500/10',
  'AI/ML': 'from-pink-400 to-rose-500 shadow-rose-500/10',
  'MongoDB': 'from-emerald-400 to-teal-600 shadow-teal-500/10',
  'DevOps': 'from-amber-400 to-orange-500 shadow-orange-500/10',
}

function Roadmap() {
  const [step, setStep] = useState('select')
  const [skill, setSkill] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [duration, setDuration] = useState(8)
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState(null)
  const [error, setError] = useState('')
  const [myRoadmaps, setMyRoadmaps] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const [studyWeek, setStudyWeek] = useState(null)
  const [studyTopic, setStudyTopic] = useState('')
  const [studyLoading, setStudyLoading] = useState(false)
  const [studyContent, setStudyContent] = useState('')

  const openStudyGuide = async (weekNumber, topicName) => {
    setStudyWeek(weekNumber)
    setStudyTopic(topicName)
    setStudyLoading(true)
    setStudyContent('')
    try {
      const res = await api.get(`/roadmap/${roadmap._id}/weeks/${weekNumber}/study`)
      setStudyContent(res.data.studyContent)
    } catch (err) {
      console.error(err)
      setStudyContent("### ⚠️ Error\nFailed to load study guide. Please try again.")
    } finally {
      setStudyLoading(false)
    }
  }

  const renderMarkdown = (text) => {
    if (!text) return "";
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h4 class="text-md font-extrabold text-slate-200 mt-4 mb-2">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="text-lg font-black text-slate-100 mt-5 mb-3 border-b border-purple-950/50 pb-1">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="text-xl font-black text-purple-400 mt-6 mb-4">$1</h2>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-100">$1</strong>');
    
    // Inline Code
    html = html.replace(/`(.*?)`/g, '<code class="bg-purple-950/60 text-purple-300 font-mono text-xs px-1.5 py-0.5 rounded border border-purple-900/50">$1</code>');
    
    // Links (with YouTube styling support)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
      const isYoutube = url.includes('youtube.com');
      if (isYoutube) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-rose-950/60 border border-rose-900/50 text-rose-300 hover:bg-rose-900/40 font-black text-xs rounded-xl shadow-sm transition hover:scale-102 my-1 mr-2 cursor-pointer">
          <svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.388.556a3.003 3.003 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.5 20.5 12 20.5 12 20.5s7.5 0 9.388-.556a3.003 3.003 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          ${text}
        </a>`;
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:text-purple-300 font-bold underline inline-flex items-center gap-1">🔗 ${text}</a>`;
    });

    // Code Blocks
    html = html.replace(/```[a-z]*\n([\s\S]*?)\n```/g, '<pre class="bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-2xl border border-slate-800 my-4 overflow-x-auto select-text"><code class="select-text">$1</code></pre>');
    
    // Bullet points
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-sm text-slate-300 mb-1.5">$1</li>');
    
    // Paragraphs (double newlines)
    html = html.replace(/\n\n/g, '</p><p class="text-sm text-slate-300 leading-relaxed mb-4">');
    
    return `<p class="text-sm text-slate-300 leading-relaxed mb-4">${html}</p>`;
  }

  useEffect(() => {
    fetchMyRoadmaps()
    if (location.state?.autoLoadRoadmapId) {
      viewRoadmap(location.state.autoLoadRoadmapId)
    }
  }, [location.state])

  const fetchMyRoadmaps = async () => {
    try {
      const res = await api.get('/roadmap')
      setMyRoadmaps(res.data.roadmaps)
    } catch (err) {
      console.error(err)
    }
  }

  const handleGenerate = async () => {
    if (!skill) return setError('Please select a skill first')
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/roadmap/generate', { skill, level, duration })
      setRoadmap(res.data.roadmap)
      setStep('view')
      fetchMyRoadmaps()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate roadmap. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteWeek = async (roadmapId, weekNumber) => {
    try {
      const res = await api.put(`/roadmap/${roadmapId}/complete-week`, { weekNumber })
      setRoadmap(res.data.roadmap)
      fetchMyRoadmaps()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteRoadmap = async (id) => {
    if (!window.confirm('Delete this roadmap?')) return
    try {
      await api.delete(`/roadmap/${id}`)
      fetchMyRoadmaps()
      if (roadmap?._id === id) {
        setRoadmap(null)
        setStep('select')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const viewRoadmap = async (id) => {
    try {
      const res = await api.get(`/roadmap/${id}`)
      setRoadmap(res.data.roadmap)
      setStep('view')
    } catch (err) {
      console.error(err)
    }
  }

  // Helper to find the current active week
  const getActiveWeek = (weeks) => {
    const active = weeks.find(w => !w.completed)
    return active ? active.week : -1
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

        <nav className="nav-blur border-b border-white/[0.06] px-6 py-4 flex items-center justify-between bg-[#030008]/75 backdrop-blur-xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Logo />
            <span className="text-xl font-bold gradient-text tracking-tight hover:scale-[1.02] transition-transform duration-300">SkillSprint</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/quiz')} className="bg-[#160d33]/85 hover:bg-[#25194f] text-purple-300 border border-purple-500/20 text-xs px-4 py-2 rounded-xl font-bold transition cursor-pointer">🧠 Take Quiz</button>
            <button onClick={() => navigate('/dashboard')} className="text-xs text-slate-400 hover:text-purple-300 font-bold transition cursor-pointer">← Dashboard</button>
          </div>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 relative z-10">

        {step === 'select' && (
          <div>
            <div className="text-center mb-10">
              <div className="text-6xl mb-4 animate-float inline-block">🗺️</div>
              <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
                Generate your <span className="shimmer">AI Learning Roadmap</span>
              </h1>
              <p className="text-slate-400 font-medium text-lg">Pick a tech skill and level. AI will structure a personalized timeline.</p>
            </div>

            {error && (
              <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-sm px-4 py-3 rounded-2xl mb-6 text-center shadow-sm animate-shake">
                ⚠️ {error}
              </div>
            )}

            <div className="glass-panel rounded-3xl p-8 mb-10">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4 ml-1">1. Choose your skill</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {skills.map(s => (
                  <button key={s} onClick={() => setSkill(s)}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 border-2 cursor-pointer ${skill === s ? 'border-purple-500 bg-purple-500/15 text-purple-400 shadow-md shadow-purple-500/20' : 'border-white/[0.05] bg-[#0e0722]/50 text-slate-300 hover:border-purple-500/20 hover:bg-[#180f3b]/60'}`}>
                    {s}
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 ml-1">Or enter any custom skill / language:</label>
                <input type="text" value={skills.includes(skill) ? '' : skill} onChange={(e) => setSkill(e.target.value)} placeholder="e.g. Rust, Go, C++, SQL, Swift..."
                  className="w-full bg-[#0a0518]/65 border border-white/[0.08] text-white focus:border-purple-500 focus:bg-[#110926]/90 rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none"
                />
              </div>

              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4 ml-1">2. Choose your level</h2>
              <div className="flex gap-3 mb-8">
                {levels.map(l => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border-2 cursor-pointer ${level === l ? 'border-purple-500 bg-purple-500/15 text-purple-400 shadow-md shadow-purple-500/20' : 'border-white/[0.05] bg-[#0e0722]/50 text-slate-300 hover:border-purple-500/20 hover:bg-[#180f3b]/60'}`}>
                    {l}
                  </button>
                ))}
              </div>

              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4 ml-1">3. Choose duration</h2>
              <div className="flex gap-3 mb-8">
                {durations.map(d => (
                  <button key={d} onClick={() => setDuration(d)}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border-2 cursor-pointer ${duration === d ? 'border-purple-500 bg-purple-500/15 text-purple-400 shadow-md shadow-purple-500/20' : 'border-white/[0.05] bg-[#0e0722]/50 text-slate-300 hover:border-purple-500/20 hover:bg-[#180f3b]/60'}`}>
                    {d} weeks
                  </button>
                ))}
              </div>

              <button onClick={handleGenerate} disabled={loading || !skill}
                className="glow-btn w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-4 rounded-2xl font-bold text-base disabled:opacity-50 shadow-lg shadow-purple-600/20 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    AI is building your roadmap...
                  </span>
                ) : '🤖 Generate My Roadmap →'}
              </button>
            </div>

            {myRoadmaps.length > 0 && (
              <div className="fade-up">
                <h2 className="text-xl font-black text-slate-100 mb-5 tracking-tight">Active Learning Tracks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {myRoadmaps.map(r => (
                    <div key={r._id} className="glass-panel rounded-3xl p-5 transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`bg-gradient-to-r ${skillColors[r.skill] || 'from-purple-400 to-pink-500'} text-white text-xs font-black px-3 py-1 rounded-full shadow-sm`}>
                          {r.skill}
                        </div>
                        <span className="text-xs font-bold text-slate-400">{r.level} · {r.duration} weeks</span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                          <span className="text-slate-400 uppercase tracking-wider">Progress</span>
                          <span className="font-black text-purple-400">{r.progress}%</span>
                        </div>
                        <div className="bg-slate-950/60 shadow-inner rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: `${r.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => viewRoadmap(r._id)} className="flex-1 bg-[#130b2c]/80 hover:bg-purple-950/40 text-purple-400 text-xs font-bold py-2.5 rounded-xl cursor-pointer transition">View Roadmap</button>
                        <button onClick={() => handleDeleteRoadmap(r._id)} className="bg-red-950/40 hover:bg-red-900/30 text-red-400 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'view' && roadmap && (
          <div className="fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className={`bg-gradient-to-r ${skillColors[roadmap.skill] || 'from-purple-400 to-pink-500'} text-white font-black px-4 py-1 rounded-full text-xs shadow-sm`}>
                    {roadmap.skill}
                  </div>
                  <span className="text-slate-400 font-semibold text-sm">{roadmap.level} · {roadmap.duration} weeks</span>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Your Custom Learning Roadmap</h1>
              </div>
              <button onClick={() => setStep('select')} className="text-xs font-bold text-purple-400 bg-[#130b2c]/80 px-4 py-2.5 rounded-xl hover:bg-purple-950/40 transition cursor-pointer self-start md:self-auto border border-white/[0.08]">← All roadmaps</button>
            </div>

            {/* Overall progress block */}
            <div className="glass-panel rounded-3xl p-6 mb-10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-300 text-sm">Overall progress</span>
                <span className="font-black text-purple-400 text-lg">{roadmap.progress}%</span>
              </div>
              <div className="bg-slate-950/60 shadow-inner rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" style={{ width: `${roadmap.progress}%` }} />
              </div>
              <p className="text-xs font-bold text-slate-400 mt-2.5 uppercase tracking-wider">{roadmap.weeks.filter(w => w.completed).length} of {roadmap.weeks.length} milestones complete</p>
            </div>

            {/* Interactive Timeline */}
            <div className="relative border-l-2 border-purple-950/80 ml-4 md:ml-6 pl-8 md:pl-10 space-y-8 pb-10">
              {roadmap.weeks.map((week, i) => {
                const activeWeekNum = getActiveWeek(roadmap.weeks)
                const isActive = week.week === activeWeekNum
                const isCompleted = week.completed

                return (
                  <div key={i} className="relative group">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-[49px] md:-left-[61px] top-1 z-20">
                      {isCompleted ? (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm md:text-base border-4 border-[#030008] shadow-md">
                          ✓
                        </div>
                      ) : isActive ? (
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-45"></div>
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs md:text-sm border-4 border-[#030008] shadow-md relative z-10">
                            W{week.week}
                          </div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0e0722] text-slate-500 flex items-center justify-center font-bold text-xs md:text-sm border-4 border-[#030008]">
                          W{week.week}
                        </div>
                      )}
                    </div>

                    {/* Timeline Content Card */}
                    <div className={`glass-panel rounded-3xl p-6 border transition-all duration-300 hover:scale-[1.01] ${isCompleted ? 'border-emerald-500/20 bg-emerald-950/15' : isActive ? 'border-purple-500/30 bg-[#160d33]/85 shadow-[0_0_25px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/20' : 'border-white/[0.04] hover:border-purple-500/20'}`}>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-extrabold text-slate-100 text-lg leading-snug">{week.topic}</h3>
                            {isCompleted && (
                              <span className="text-[10px] bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Completed</span>
                            )}
                            {isActive && (
                              <span className="text-[10px] bg-purple-950/40 text-purple-400 border border-purple-900/50 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Active Week</span>
                            )}
                          </div>
                          
                          <p className="text-sm text-slate-300 leading-relaxed font-medium mb-4">{week.description}</p>
                          
                          {week.resources?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {week.resources.map((r, j) => (
                                <span key={j} className="text-[11px] bg-[#130b2c]/85 border border-white/[0.05] text-purple-300 px-3 py-1.5 rounded-full font-semibold transition cursor-default shadow-sm flex items-center gap-1">
                                  <span>📚</span> {r}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 self-start md:self-auto flex-wrap">
                          <button onClick={() => openStudyGuide(week.week, week.topic)}
                            className="bg-[#191036] hover:bg-[#25194f] text-purple-300 border border-purple-500/20 text-xs font-black px-4 py-3 rounded-xl transition cursor-pointer shadow-sm flex items-center gap-1.5"
                          >
                            📖 Study Guide
                          </button>
                          {!isCompleted && (
                            <button onClick={() => handleCompleteWeek(roadmap._id, week.week)}
                              className="glow-btn bg-purple-600 hover:bg-purple-700 text-white text-xs font-black px-5 py-3 rounded-xl transition cursor-pointer shadow-sm"
                            >
                              Mark Done ✓
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Slide-over study guide panel */}
      {studyWeek !== null && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" onClick={() => setStudyWeek(null)}></div>
          
          {/* Panel */}
          <div className="relative w-full max-w-2xl bg-[#0b061c] h-full shadow-2xl flex flex-col z-10 border-l border-white/[0.08] animate-slide-in-right">
            {/* Header */}
            <div className="p-6 border-b border-white/[0.05] flex items-center justify-between bg-gradient-to-r from-[#190f3a]/80 to-[#2c133a]/80">
              <div>
                <span className="text-[10px] text-purple-400 font-black uppercase tracking-wider">Week {studyWeek} Study Material</span>
                <h2 className="text-xl font-extrabold text-slate-100 tracking-tight leading-tight mt-1">{studyTopic}</h2>
              </div>
              <button onClick={() => setStudyWeek(null)} className="w-9 h-9 rounded-xl bg-[#130b2c]/80 border border-white/[0.08] text-slate-400 hover:text-purple-400 flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:scale-105 transition-all">✕</button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 select-text">
              {studyLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-purple-400 font-bold animate-pulse text-sm uppercase tracking-widest">AI is writing study guide...</p>
                </div>
              ) : (
                <div className="prose prose-purple max-w-none select-text" dangerouslySetInnerHTML={{ __html: renderMarkdown(studyContent) }} />
              )}
            </div>
            
            {/* Footer / CTA */}
            <div className="p-6 border-t border-white/[0.05] bg-[#080314]/90 flex items-center justify-between gap-4">
              <button onClick={() => navigate('/quiz', { state: { skill: roadmap.skill, topic: studyTopic } })}
                className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-xs font-black px-5 py-3.5 rounded-xl cursor-pointer shadow-md shadow-purple-600/10 flex items-center gap-1.5"
              >
                🧠 Test Knowledge (Take Quiz)
              </button>
              <button onClick={() => setStudyWeek(null)} className="bg-[#130b2c]/80 border border-white/[0.08] text-slate-400 hover:text-white text-xs font-bold px-5 py-3.5 rounded-xl cursor-pointer">
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
      <ChatBot />
    </div>
  )
}

export default Roadmap