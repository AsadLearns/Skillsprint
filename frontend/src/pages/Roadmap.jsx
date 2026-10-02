import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'
import ChatBot from '../components/ChatBot'
import RoadmapGenerating from '../components/RoadmapGenerating'
import { generateEngineeringSolution } from '../utils/solutionGenerator'

const skills = ['Java', 'Python', 'React', 'Web Development', 'Node.js', 'AI/ML', 'MongoDB', 'DevOps']
const levels = ['Beginner', 'Intermediate', 'Advanced']
const durations = [4, 6, 8, 12]

const skillColors = {
  'Java': 'bg-orange-50 text-orange-700 border border-orange-200',
  'Python': 'bg-sky-50 text-sky-700 border border-sky-200',
  'React': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
  'Web Development': 'bg-violet-50 text-violet-700 border border-violet-200',
  'Node.js': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'AI/ML': 'bg-rose-50 text-rose-700 border border-rose-200',
  'MongoDB': 'bg-teal-50 text-teal-700 border border-teal-200',
  'DevOps': 'bg-amber-50 text-amber-700 border border-amber-200',
}

function Roadmap() {
  const [step, setStep] = useState('select')
  const [trackMode, setTrackMode] = useState('curated') // 'curated' or 'prompt'
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
    html = html.replace(/^### (.*$)/gim, '<h4 class="text-md font-extrabold text-slate-800 mt-4 mb-2">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="text-lg font-black text-slate-900 mt-5 mb-3 border-b border-slate-200 pb-1">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="text-xl font-black text-indigo-600 mt-6 mb-4 font-heading">$1</h2>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
    
    // Inline Code
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-100 text-indigo-700 font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200">$1</code>');
    
    // Links (with YouTube styling support)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
      const isYoutube = url.includes('youtube.com');
      if (isYoutube) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-black text-xs rounded-xl shadow-xs transition hover:scale-102 my-1 mr-2 cursor-pointer">
          <svg class="w-4 h-4 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.388.556a3.003 3.003 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.5 20.5 12 20.5 12 20.5s7.5 0 9.388-.556a3.003 3.003 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          ${text}
        </a>`;
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-800 font-bold underline inline-flex items-center gap-1">🔗 ${text}</a>`;
    });

    // Code Blocks
    html = html.replace(/```[a-z]*\n([\s\S]*?)\n```/g, '<pre class="bg-slate-900 text-slate-100 font-mono text-xs p-4 rounded-xl border border-slate-800 my-4 overflow-x-auto select-text"><code class="select-text">$1</code></pre>');
    
    // Bullet points
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-sm text-slate-700 mb-1.5">$1</li>');
    
    // Paragraphs (double newlines)
    html = html.replace(/\n\n/g, '</p><p class="text-sm text-slate-700 leading-relaxed mb-4">');
    
    return `<p class="text-sm text-slate-700 leading-relaxed mb-4">${html}</p>`;
  }

  useEffect(() => {
    fetchMyRoadmaps()
    if (location.state?.autoLoadRoadmapId) {
      viewRoadmap(location.state.autoLoadRoadmapId)
    } else if (location.state?.customPrompt) {
      setTrackMode('prompt')
      setSkill(location.state.customPrompt)
    } else if (location.state?.autoSkill) {
      setSkill(location.state.autoSkill)
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
    if (!skill.trim()) return setError('Please specify an engineering skill or objective prompt')
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/roadmap/generate', { skill, level, duration })
      setRoadmap(res.data.roadmap)
      setStep('view')
      fetchMyRoadmaps()
    } catch (err) {
      console.warn('API error, synthesizing via client solution engine:', err.message)
      // Synthesize full client-side solution roadmap
      const sol = generateEngineeringSolution(skill)
      const syntheticWeeks = sol.milestones.slice(0, duration).map((m, idx) => ({
        week: idx + 1,
        topic: m.topic,
        description: m.deliverable + ' - Implementation with strict data safety controls and automated testing.',
        resources: [
          'SkillSprint Architecture Spec: ' + sol.spec,
          'Production Code Manifests & Terminal Sandbox'
        ],
        completed: false
      }))
      const syntheticRoadmap = {
        _id: 'sprint_' + Date.now(),
        skill: sol.title || skill,
        level,
        duration,
        weeks: syntheticWeeks,
        progress: 0,
        createdAt: new Date().toISOString()
      }
      setRoadmap(syntheticRoadmap)
      setStep('view')
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
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="sticky top-0 z-50 w-full">
        {/* Announcement Marquee Ticker */}
        <div className="w-full bg-slate-100 font-mono text-[10px] uppercase tracking-widest text-slate-600 py-1.5 border-b border-slate-200 overflow-hidden whitespace-nowrap select-none relative z-50">
          <div className="inline-block animate-marquee">
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        <nav className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-white/90 backdrop-blur-xl shadow-xs">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Logo />
            <span className="text-xl font-bold gradient-text tracking-tight hover:scale-[1.02] transition-transform duration-300">SkillSprint</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/quiz')} className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs px-4 py-2 rounded-xl font-semibold transition cursor-pointer shadow-xs">🧠 Take Quiz</button>
            <button onClick={() => navigate('/dashboard')} className="text-xs text-slate-600 hover:text-slate-950 font-bold transition cursor-pointer">← Dashboard</button>
          </div>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 relative z-10">

        {step === 'select' && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 mb-4 text-indigo-700 font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                AI Curriculum Architect
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight mb-3 font-heading">
                Generate your <span className="gradient-text">Learning Roadmap</span>
              </h1>
              <p className="text-slate-600 font-medium text-base md:text-lg max-w-xl mx-auto">Pick your target technical stack and pacing. AI will architect an exact week-by-week curriculum with study modules.</p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-2xl mb-6 text-center shadow-sm animate-shake">
                ⚠️ {error}
              </div>
            )}

            <div className="surface-card rounded-3xl border border-slate-200 bg-white p-6 md:p-8 mb-10 shadow-card">
              {/* Mode Switcher */}
              <div className="flex items-center gap-2 mb-8 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 w-fit">
                <button
                  type="button"
                  onClick={() => setTrackMode('curated')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    trackMode === 'curated'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚡ Standard Tracks
                </button>
                <button
                  type="button"
                  onClick={() => setTrackMode('prompt')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    trackMode === 'prompt'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>✍️ Custom Prompt Builder</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">AI</span>
                </button>
              </div>

              {trackMode === 'prompt' ? (
                <div className="mb-8 animate-fadeIn">
                  <h2 className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-2 ml-1">
                    // 01. WRITE YOUR OBJECTIVE PROMPT
                  </h2>
                  <p className="text-slate-600 text-xs mb-3 ml-1">
                    Describe any technical project. Our engine will formulate an exact architecture and weekly milestone curriculum.
                  </p>

                  <div className="flex items-start gap-2.5 rounded-2xl border border-slate-300 bg-slate-50 p-3.5 mb-3 focus-within:border-indigo-500 focus-within:bg-white transition-all shadow-xs">
                    <span className="font-mono text-indigo-600 font-bold text-sm select-none">$</span>
                    <textarea
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      placeholder="e.g. Making a full-stack website with React 19 & FastAPI, or making MLOps & DevOps working to keep sensitive data safe with automated backups..."
                      rows={3}
                      className="w-full bg-transparent text-slate-900 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed placeholder-slate-400"
                    />
                  </div>

                  {/* Preset prompt pills */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { label: "🛡️ MLOps & DevOps Data Safety", text: "making mlops and devops working to keep data safe with automated backups and AES-256 encryption" },
                      { label: "🌐 Full-Stack Website", text: "making a full stack website with React 19, FastAPI, PostgreSQL, Redis and Docker" },
                      { label: "⚡ High-Concurrency Go & Kafka", text: "building a high-throughput event streaming microservice architecture with Go and Apache Kafka" },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setSkill(p.text)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 hover:border-indigo-400 transition cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-4 ml-1">// 01. TARGET DOMAIN</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {skills.map(s => (
                      <button key={s} onClick={() => setSkill(s)}
                        className={`py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 border cursor-pointer ${skill === s ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'}`}>
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="mb-8">
                    <label className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider block mb-2 ml-1">Or enter custom skill / language:</label>
                    <input type="text" value={skills.includes(skill) ? '' : skill} onChange={(e) => setSkill(e.target.value)} placeholder="e.g. Rust, Go, C++, SQL, Swift, GraphQL..."
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
                    />
                  </div>
                </>
              )}

              <h2 className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-4 ml-1">// 02. PROFICIENCY TIER</h2>
              <div className="flex gap-3 mb-8">
                {levels.map(l => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border cursor-pointer ${level === l ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'}`}>
                    {l}
                  </button>
                ))}
              </div>

              <h2 className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-4 ml-1">// 03. SPRINT DURATION</h2>
              <div className="flex gap-3 mb-8">
                {durations.map(d => (
                  <button key={d} onClick={() => setDuration(d)}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border cursor-pointer ${duration === d ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'}`}>
                    {d} weeks
                  </button>
                ))}
              </div>

              <button onClick={handleGenerate} disabled={loading || !skill}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-4 rounded-xl font-bold text-base shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Synthesizing weekly milestones...
                  </span>
                ) : '⚡ Generate My Roadmap →'}
              </button>

              {loading && <RoadmapGenerating duration={duration} skill={skill} />}
            </div>

            {myRoadmaps.length > 0 && (
              <div className="fade-up">
                <h2 className="text-xl font-black text-slate-900 mb-5 tracking-tight font-heading">Active Learning Tracks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {myRoadmaps.map(r => (
                    <div key={r._id} className="surface-card rounded-3xl p-5 border border-slate-200 bg-white shadow-card transition-all duration-300 hover:shadow-cardHover">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`${skillColors[r.skill] || 'bg-slate-100 text-slate-700 border border-slate-200'} text-xs font-black px-3 py-1 rounded-full`}>
                          {r.skill}
                        </div>
                        <span className="text-xs font-bold text-slate-500">{r.level} · {r.duration} weeks</span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                          <span className="text-slate-500 uppercase tracking-wider">Progress</span>
                          <span className="font-black text-indigo-600">{r.progress}%</span>
                        </div>
                        <div className="bg-slate-100 shadow-inner rounded-full h-2 overflow-hidden border border-slate-200">
                          <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${r.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => viewRoadmap(r._id)} className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold py-2.5 rounded-xl cursor-pointer transition">View Roadmap</button>
                        <button onClick={() => handleDeleteRoadmap(r._id)} className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition">Delete</button>
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
                  <div className={`${skillColors[roadmap.skill] || 'bg-slate-100 text-slate-700 border border-slate-200'} font-black px-4 py-1 rounded-full text-xs`}>
                    {roadmap.skill}
                  </div>
                  <span className="text-slate-500 font-semibold text-sm">{roadmap.level} · {roadmap.duration} weeks</span>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight font-heading">Your Custom Learning Roadmap</h1>
              </div>
              <button onClick={() => setStep('select')} className="text-xs font-mono font-bold text-indigo-600 bg-white px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition cursor-pointer self-start md:self-auto border border-slate-200 shadow-xs">← All roadmaps</button>
            </div>

            {/* Overall progress block */}
            <div className="surface-card rounded-3xl p-6 mb-10 border border-slate-200 bg-white shadow-card">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-500">Curriculum Completion</span>
                <span className="font-mono font-black text-indigo-600 text-xl">{roadmap.progress}%</span>
              </div>
              <div className="bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 h-3 rounded-full transition-all duration-500 shadow-xs" style={{ width: `${roadmap.progress}%` }} />
              </div>
              <p className="text-xs font-mono text-slate-500 mt-3 uppercase tracking-wider">{roadmap.weeks.filter(w => w.completed).length} of {roadmap.weeks.length} milestones complete</p>
            </div>

            {/* Interactive Timeline */}
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 pl-8 md:pl-10 space-y-8 pb-10">
              {roadmap.weeks.map((week, i) => {
                const activeWeekNum = getActiveWeek(roadmap.weeks)
                const isActive = week.week === activeWeekNum
                const isCompleted = week.completed

                return (
                  <div key={i} className="relative group">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-[49px] md:-left-[61px] top-1 z-20">
                      {isCompleted ? (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-sm md:text-base border-4 border-white shadow-md">
                          ✓
                        </div>
                      ) : isActive ? (
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-30"></div>
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center font-mono font-black text-xs md:text-sm border-4 border-white shadow-md relative z-10">
                            W{week.week}
                          </div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-mono font-bold text-xs md:text-sm border-4 border-white shadow-xs">
                          W{week.week}
                        </div>
                      )}
                    </div>

                    {/* Timeline Content Card */}
                    <div className={`surface-card rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.005] ${isCompleted ? 'border-emerald-200 bg-emerald-50/40 shadow-xs' : isActive ? 'border-indigo-300 bg-white ring-2 ring-indigo-500/20 shadow-cardHover' : 'border-slate-200 bg-white hover:border-slate-300 shadow-card'}`}>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{week.topic}</h3>
                            {isCompleted && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">Completed</span>
                            )}
                            {isActive && (
                              <span className="text-[10px] bg-indigo-100 text-indigo-800 border border-indigo-200 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">Active Milestone</span>
                            )}
                          </div>
                          
                          <p className="text-sm text-slate-700 leading-relaxed font-medium mb-4">{week.description}</p>
                          
                          {week.resources?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {week.resources.map((r, j) => (
                                <span key={j} className="text-[11px] bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-semibold transition cursor-default shadow-2xs flex items-center gap-1">
                                  <span>📚</span> {r}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 self-start md:self-auto flex-wrap">
                          <button onClick={() => openStudyGuide(week.week, week.topic)}
                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                          >
                            📖 Study Guide
                          </button>
                          {!isCompleted && (
                            <button onClick={() => handleCompleteWeek(roadmap._id, week.week)}
                              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-xs cursor-pointer"
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
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={() => setStudyWeek(null)}></div>
          
          {/* Panel */}
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 border-l border-slate-200 animate-slide-in-right">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 backdrop-blur-xl">
              <div>
                <span className="text-[10px] text-indigo-600 font-mono font-bold uppercase tracking-wider">// Week {studyWeek} Intelligence Dossier</span>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight mt-1 font-heading">{studyTopic}</h2>
              </div>
              <button onClick={() => setStudyWeek(null)} className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center font-bold text-sm shadow-xs cursor-pointer hover:scale-105 transition-all">✕</button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 select-text">
              {studyLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-500 font-mono font-bold animate-pulse text-xs uppercase tracking-widest">Synthesizing study guide...</p>
                </div>
              ) : (
                <div className="prose max-w-none select-text" dangerouslySetInnerHTML={{ __html: renderMarkdown(studyContent) }} />
              )}
            </div>
            
            {/* Footer / CTA */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
              <button onClick={() => navigate('/quiz', { state: { skill: roadmap.skill, topic: studyTopic } })}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold px-5 py-3.5 rounded-xl cursor-pointer transition shadow-md flex items-center gap-1.5"
              >
                🧠 Test Knowledge (Take Quiz)
              </button>
              <button onClick={() => setStudyWeek(null)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold px-5 py-3.5 rounded-xl cursor-pointer shadow-xs">
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