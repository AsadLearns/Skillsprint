import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

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
    html = html.replace(/^### (.*$)/gim, '<h4 class="text-md font-extrabold text-slate-800 mt-4 mb-2">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="text-lg font-black text-slate-900 mt-5 mb-3 border-b border-purple-100 pb-1">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="text-xl font-black text-purple-700 mt-6 mb-4">$1</h2>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
    
    // Inline Code
    html = html.replace(/`(.*?)`/g, '<code class="bg-purple-50 text-purple-700 font-mono text-xs px-1.5 py-0.5 rounded border border-purple-100">$1</code>');
    
    // Code Blocks
    html = html.replace(/```[a-z]*\n([\s\S]*?)\n```/g, '<pre class="bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-2xl border border-slate-800 my-4 overflow-x-auto select-text"><code class="select-text">$1</code></pre>');
    
    // Bullet points
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-sm text-gray-600 mb-1.5">$1</li>');
    
    // Paragraphs (double newlines)
    html = html.replace(/\n\n/g, '</p><p class="text-sm text-gray-600 leading-relaxed mb-4">');
    
    return `<p class="text-sm text-gray-600 leading-relaxed mb-4">${html}</p>`;
  }

  useEffect(() => {
    fetchMyRoadmaps()
  }, [])

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
    <div className="min-h-screen hero-bg">
      {/* Background Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <nav className="nav-blur border-b border-purple-100/50 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">S</div>
          <span className="text-xl font-bold gradient-text tracking-tight">SkillSprint</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/quiz')} className="bg-white/80 border border-purple-200 text-purple-700 text-xs px-4 py-2 rounded-xl font-bold hover:bg-purple-50 transition cursor-pointer">🧠 Take Quiz</button>
          <button onClick={() => navigate('/dashboard')} className="text-xs text-gray-500 hover:text-purple-700 font-bold transition cursor-pointer">← Dashboard</button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 relative z-10">

        {step === 'select' && (
          <div>
            <div className="text-center mb-10">
              <div className="text-6xl mb-4 animate-float inline-block">🗺️</div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                Generate your <span className="shimmer">AI Learning Roadmap</span>
              </h1>
              <p className="text-gray-500 font-medium text-lg">Pick a tech skill and level. AI will structure a personalized timeline.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl mb-6 text-center shadow-sm">
                ⚠️ {error}
              </div>
            )}

            <div className="glass-panel rounded-3xl p-8 mb-10 border border-white/50">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4 ml-1">1. Choose your skill</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {skills.map(s => (
                  <button key={s} onClick={() => setSkill(s)}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 border-2 cursor-pointer ${skill === s ? 'border-purple-600 bg-purple-500/10 text-purple-700 shadow-md shadow-purple-500/10' : 'border-slate-100 bg-white/50 text-gray-600 hover:border-purple-300 hover:bg-white'}`}>
                    {s}
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 ml-1">Or enter any custom skill / language:</label>
                <input type="text" value={skills.includes(skill) ? '' : skill} onChange={(e) => setSkill(e.target.value)} placeholder="e.g. Rust, Go, C++, SQL, Swift..."
                  className="w-full bg-white/50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none"
                />
              </div>

              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4 ml-1">2. Choose your level</h2>
              <div className="flex gap-3 mb-8">
                {levels.map(l => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border-2 cursor-pointer ${level === l ? 'border-purple-600 bg-purple-500/10 text-purple-700 shadow-md shadow-purple-500/10' : 'border-slate-100 bg-white/50 text-gray-600 hover:border-purple-300 hover:bg-white'}`}>
                    {l}
                  </button>
                ))}
              </div>

              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4 ml-1">3. Choose duration</h2>
              <div className="flex gap-3 mb-8">
                {durations.map(d => (
                  <button key={d} onClick={() => setDuration(d)}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border-2 cursor-pointer ${duration === d ? 'border-purple-600 bg-purple-500/10 text-purple-700 shadow-md shadow-purple-500/10' : 'border-slate-100 bg-white/50 text-gray-600 hover:border-purple-300 hover:bg-white'}`}>
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
                <h2 className="text-xl font-black text-gray-900 mb-5 tracking-tight">Active Learning Tracks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {myRoadmaps.map(r => (
                    <div key={r._id} className="glass-panel rounded-3xl p-5 border border-white/50 transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`bg-gradient-to-r ${skillColors[r.skill] || 'from-purple-400 to-pink-500'} text-white text-xs font-black px-3 py-1 rounded-full shadow-sm`}>
                          {r.skill}
                        </div>
                        <span className="text-xs font-bold text-gray-400">{r.level} · {r.duration} weeks</span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                          <span className="text-gray-400 uppercase tracking-wider">Progress</span>
                          <span className="font-black text-purple-600">{r.progress}%</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2 shadow-inner overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: `${r.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => viewRoadmap(r._id)} className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold py-2.5 rounded-xl cursor-pointer transition">View Roadmap</button>
                        <button onClick={() => handleDeleteRoadmap(r._id)} className="bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition">Delete</button>
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
                  <span className="text-gray-400 font-semibold text-sm">{roadmap.level} · {roadmap.duration} weeks</span>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Custom Learning Roadmap</h1>
              </div>
              <button onClick={() => setStep('select')} className="text-xs font-bold text-purple-600 bg-purple-50 px-4 py-2.5 rounded-xl hover:bg-purple-100 transition cursor-pointer self-start md:self-auto">← All roadmaps</button>
            </div>

            {/* Overall progress block */}
            <div className="glass-panel rounded-3xl p-6 mb-10 border border-white/50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-600 text-sm">Overall progress</span>
                <span className="font-black text-purple-600 text-lg">{roadmap.progress}%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" style={{ width: `${roadmap.progress}%` }} />
              </div>
              <p className="text-xs font-bold text-gray-400 mt-2.5 uppercase tracking-wider">{roadmap.weeks.filter(w => w.completed).length} of {roadmap.weeks.length} milestones complete</p>
            </div>

            {/* Interactive Timeline */}
            <div className="relative border-l-2 border-purple-100/60 ml-4 md:ml-6 pl-8 md:pl-10 space-y-8 pb-10">
              {roadmap.weeks.map((week, i) => {
                const activeWeekNum = getActiveWeek(roadmap.weeks)
                const isActive = week.week === activeWeekNum
                const isCompleted = week.completed

                return (
                  <div key={i} className="relative group">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-[45px] md:-left-[53px] top-1 z-20">
                      {isCompleted ? (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm md:text-base border-4 border-white shadow-md">
                          ✓
                        </div>
                      ) : isActive ? (
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-40"></div>
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs md:text-sm border-4 border-white shadow-md relative z-10">
                            W{week.week}
                          </div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs md:text-sm border-4 border-white">
                          W{week.week}
                        </div>
                      )}
                    </div>

                    {/* Timeline Content Card */}
                    <div className={`glass-panel rounded-3xl p-6 border transition-all duration-300 hover:scale-[1.01] ${isCompleted ? 'border-green-200 bg-green-50/20 shadow-sm' : isActive ? 'border-purple-200 bg-white/90 shadow-md ring-1 ring-purple-100/50' : 'border-white/50 hover:border-purple-200/50'}`}>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-extrabold text-gray-950 text-lg leading-snug">{week.topic}</h3>
                            {isCompleted && (
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Completed</span>
                            )}
                            {isActive && (
                              <span className="text-[10px] bg-purple-500/10 text-purple-700 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Active Week</span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-500 leading-relaxed font-medium mb-4">{week.description}</p>
                          
                          {week.resources?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {week.resources.map((r, j) => (
                                <span key={j} className="text-[11px] bg-white border border-purple-100 hover:border-purple-300 text-purple-700 px-3 py-1.5 rounded-full font-semibold transition cursor-default shadow-sm flex items-center gap-1">
                                  <span>📚</span> {r}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 self-start md:self-auto flex-wrap">
                          <button onClick={() => openStudyGuide(week.week, week.topic)}
                            className="bg-white/85 hover:bg-purple-50 text-purple-700 border border-purple-200 text-xs font-black px-4 py-3 rounded-xl transition cursor-pointer shadow-sm flex items-center gap-1.5"
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
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setStudyWeek(null)}></div>
          
          {/* Panel */}
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 border-l border-purple-100/50">
            {/* Header */}
            <div className="p-6 border-b border-purple-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
              <div>
                <span className="text-[10px] text-purple-600 font-black uppercase tracking-wider">Week {studyWeek} Study Material</span>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight mt-1">{studyTopic}</h2>
              </div>
              <button onClick={() => setStudyWeek(null)} className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-gray-500 hover:text-purple-600 flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:scale-105 transition-all">✕</button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 select-text">
              {studyLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-purple-700 font-bold animate-pulse text-sm uppercase tracking-widest">AI is writing study guide...</p>
                </div>
              ) : (
                <div className="prose prose-purple max-w-none select-text" dangerouslySetInnerHTML={{ __html: renderMarkdown(studyContent) }} />
              )}
            </div>
            
            {/* Footer / CTA */}
            <div className="p-6 border-t border-purple-100 bg-gray-50 flex items-center justify-between gap-4">
              <button onClick={() => navigate('/quiz', { state: { skill: roadmap.skill, topic: studyTopic } })}
                className="glow-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-xs font-black px-5 py-3.5 rounded-xl cursor-pointer shadow-md shadow-purple-600/10 flex items-center gap-1.5"
              >
                🧠 Test Knowledge (Take Quiz)
              </button>
              <button onClick={() => setStudyWeek(null)} className="bg-white border border-slate-200 text-gray-600 hover:bg-slate-50 text-xs font-bold px-5 py-3.5 rounded-xl cursor-pointer">
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Roadmap