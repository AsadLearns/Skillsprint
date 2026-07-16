import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import Logo from '../components/Logo'

const skillColors = {
  'Java': 'bg-orange-500/15 text-orange-300 border border-orange-500/25',
  'Python': 'bg-sky-500/15 text-sky-300 border border-sky-500/25',
  'React': 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
  'Web Development': 'bg-violet-500/15 text-violet-300 border border-violet-500/25',
  'Node.js': 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25',
  'AI/ML': 'bg-rose-500/15 text-rose-300 border border-rose-500/25',
  'MongoDB': 'bg-teal-500/15 text-teal-300 border border-teal-500/25',
  'DevOps': 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
}

export default function Profile() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [roadmaps, setRoadmaps] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Edit fields
  const [form, setForm] = useState({
    name: user?.name || '',
    title: user?.title || 'Learner Pro',
    bio: user?.bio || '',
    linkedin: user?.linkedin || '',
    github: user?.github || ''
  })

  // Selected certificate for modal overlay
  const [activeCert, setActiveCert] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [rm, qz] = await Promise.all([
        api.get('/roadmap'),
        api.get('/quiz')
      ])
      setRoadmaps(rm.data.roadmaps || [])
      setQuizzes(qz.data.quizzes || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await api.put('/auth/update-profile', form)
      // Update local storage and context
      localStorage.setItem('token', res.data.user.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      // Force refresh AuthContext state
      login(res.data.user)
      setSuccess('Profile updated successfully!')
      setEditMode(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile changes.')
    } finally {
      setSaving(false)
    }
  }

  // Calculate certificates dynamically
  // Condition: roadmap progress is 100% AND at least one quiz for that skill has score >= 60%
  const getCertificates = () => {
    const certs = []
    const completedRoadmaps = roadmaps.filter(r => r.progress === 100)
    
    completedRoadmaps.forEach(r => {
      // Find if there is a quiz for this skill that scored >= 60%
      const qualifyingQuiz = quizzes.find(q => q.skill === r.skill && q.completed && q.score >= 60)
      if (qualifyingQuiz) {
        certs.push({
          skill: r.skill,
          roadmapId: r._id,
          quizId: qualifyingQuiz._id,
          quizScore: qualifyingQuiz.score,
          date: new Date(qualifyingQuiz.updatedAt || Date.now()).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          }),
          certId: `SS-CERT-${r._id.slice(-6).toUpperCase()}-${qualifyingQuiz._id.slice(-6).toUpperCase()}`
        })
      }
    })
    return certs
  }

  const certificates = getCertificates()
  const avgQuizScore = quizzes.filter(q => q.completed).length
    ? Math.round(quizzes.filter(q => q.completed).reduce((s, q) => s + q.score, 0) / quizzes.filter(q => q.completed).length) : 0

  return (
    <div className="min-h-screen hero-bg relative overflow-hidden">
      <div className="sticky top-0 z-50 w-full animate-fade-in">
        {/* Announcement Marquee Ticker */}
        <div className="w-full bg-[#0f0f10] font-mono text-[10px] uppercase tracking-widest text-slate-500 py-1.5 border-b border-white/[0.06] overflow-hidden whitespace-nowrap select-none relative z-50">
          <div className="inline-block animate-marquee">
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>⚡ SPRINT TO YOUR GOALS WITH SPRINTY CHATBOT ⚡ COMPLETE ROADMAP MILESTONES TO EARN EXCLUSIVE REWARDS ⚡ GAIN &gt;60% IN QUIZZES TO UNLOCK MASTERY CERTIFICATES 🎓 &nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        <nav className="nav-blur border-b border-white/[0.06] px-4 md:px-6 py-4 flex items-center justify-between bg-[#0a0a0a]/75 backdrop-blur-xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Logo />
            <span className="text-xl font-bold gradient-text tracking-tight hover:scale-[1.02] transition-transform duration-300">SkillSprint</span>
          </div>
          <button onClick={() => navigate('/dashboard')} className="text-xs font-bold text-slate-400 hover:text-slate-200 transition cursor-pointer">← Dashboard</button>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 relative z-10">
        
        {/* Main profile section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left card: details & avatar */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-6 text-center animate-slide-up">
              <div className="w-24 h-24 bg-white/[0.08] border border-white/[0.12] rounded-2xl flex items-center justify-center text-slate-100 font-black text-4xl mx-auto mb-4">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">{user?.name}</h2>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mt-1">{form.title}</p>
              
              <div className="flex justify-center gap-3 mt-4 text-xs font-bold text-slate-400">
                {form.github && <a href={form.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition">💻 GitHub</a>}
                {form.linkedin && <a href={form.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition">🔗 LinkedIn</a>}
              </div>

              {form.bio && (
                <p className="text-xs text-slate-400 font-medium leading-relaxed mt-4 pt-4 border-t border-white/[0.05]">{form.bio}</p>
              )}

              <button 
                onClick={() => setEditMode(!editMode)}
                className="mt-6 w-full py-2.5 bg-[#111112]/80 border border-white/[0.08] text-emerald-400 font-extrabold text-xs hover:bg-white/[0.06] transition cursor-pointer rounded-xl"
              >
                {editMode ? 'Cancel Edit' : 'Edit Profile Details'}
              </button>
            </div>

            {/* Profile achievements overview */}
            <div className="glass-panel rounded-3xl p-6 animate-slide-up animation-delay-100">
              <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-4">Mastery Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-400">Completed Tracks</span>
                  <span className="text-emerald-400 font-bold">{roadmaps.filter(r => r.progress === 100).length}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-400">Average Quiz Accuracy</span>
                  <span className="text-amber-400 font-bold">{avgQuizScore}%</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-400">Certificates Earned</span>
                  <span className="text-emerald-400 font-bold">{certificates.length} 🏆</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right section: edit form OR certificates + active tracks */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {editMode ? (
              <form onSubmit={handleSave} className="glass-panel rounded-3xl p-6 md:p-8 animate-slide-up">
                <h3 className="text-xl font-black text-slate-100 tracking-tight mb-6">Edit Profile</h3>
                
                {error && <div className="mb-4 text-red-400 font-bold text-xs">⚠️ {error}</div>}
                {success && <div className="mb-4 text-green-400 font-bold text-xs">✅ {success}</div>}
 
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
                    <input 
                      type="text" 
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-[#101011]/65 border border-white/[0.08] text-white focus:border-emerald-500/60 focus:bg-[#131314] rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Headline/Title</label>
                    <input 
                      type="text" 
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      className="w-full bg-[#101011]/65 border border-white/[0.08] text-white focus:border-emerald-500/60 focus:bg-[#131314] rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Short Bio</label>
                    <textarea 
                      rows="3"
                      value={form.bio}
                      onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                      className="w-full bg-[#101011]/65 border border-white/[0.08] text-white focus:border-emerald-500/60 focus:bg-[#131314] rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none leading-relaxed"
                      placeholder="Tell recruiters/friends about your learning goal..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">LinkedIn URL</label>
                      <input 
                        type="url" 
                        value={form.linkedin}
                        onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                        className="w-full bg-[#101011]/65 border border-white/[0.08] text-white focus:border-emerald-500/60 focus:bg-[#131314] rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">GitHub URL</label>
                      <input 
                        type="url" 
                        value={form.github}
                        onChange={e => setForm(f => ({ ...f, github: e.target.value }))}
                        className="w-full bg-[#101011]/65 border border-white/[0.08] text-white focus:border-emerald-500/60 focus:bg-[#131314] rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button 
                    type="submit" 
                    disabled={saving}
                    className="flex-1 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs py-3.5 rounded-lg cursor-pointer transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEditMode(false)}
                    className="bg-[#111112]/85 border border-white/[0.08] text-slate-400 hover:text-white font-bold text-xs px-6 py-3.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-6">
                
                {/* Certificates Section */}
                <div className="glass-panel rounded-3xl p-6 md:p-8 animate-slide-up">
                  <h3 className="text-xl font-black text-slate-100 tracking-tight mb-2">My Certificates</h3>
                  <p className="text-xs text-slate-400 font-medium mb-6">Complete all roadmap milestones and score &gt;60% in a quiz for that skill to earn achievements!</p>
                  
                  {loading ? (
                    <div className="text-center py-6 text-slate-400 text-xs font-bold animate-pulse">Calculating certificates...</div>
                  ) : certificates.length === 0 ? (
                    <div className="text-center py-10 bg-[#0f0f10]/40 rounded-2xl border border-dashed border-white/[0.12] p-6">
                      <div className="text-4xl mb-3">🎓</div>
                      <p className="text-xs text-slate-400 font-bold leading-relaxed mb-4">No master certificates earned yet.<br />Finish a study guide roadmap and pass the quiz to claim your first reward!</p>
                      <button onClick={() => navigate('/dashboard')} className="bg-[#111112]/80 border border-white/[0.08] text-emerald-400 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-white/[0.06] transition cursor-pointer">Start Learning</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {certificates.map(cert => (
                        <div 
                          key={cert.certId}
                          onClick={() => setActiveCert(cert)}
                          className="glass-panel rounded-2xl p-5 border border-amber-500/20 hover:border-amber-500/60 bg-amber-500/5 hover:scale-[1.02] cursor-pointer transition-all duration-300 shadow-sm flex items-start gap-4"
                        >
                          <div className="text-3xl mt-0.5">🏆</div>
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-100 leading-tight">Mastery Certificate</h4>
                            <p className="text-[10px] font-bold text-emerald-400 mt-0.5 uppercase tracking-wider">{cert.skill}</p>
                            <p className="text-[10px] text-slate-400 font-semibold mt-1">Accuracy: {cert.quizScore}%</p>
                            <span className="text-[8px] bg-amber-950/40 text-amber-400 border border-amber-900/50 px-2 py-0.5 rounded-full mt-2 inline-block">Click to view</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Roadmaps in progress */}
                <div className="glass-panel rounded-3xl p-6 md:p-8 animate-slide-up animation-delay-100">
                  <h3 className="text-xl font-black text-slate-100 tracking-tight mb-5">Learning Progress</h3>
                  
                  {loading ? (
                    <div className="text-center py-6 text-slate-400 text-xs font-bold animate-pulse">Loading progress...</div>
                  ) : roadmaps.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4 font-bold">No active learning sprint roadmaps.</p>
                  ) : (
                    <div className="space-y-4">
                      {roadmaps.map(r => (
                        <div key={r._id} className="p-4 bg-[#111112]/40 rounded-2xl border border-white/[0.04] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-100">{r.skill} Roadmap</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{r.level} · {r.duration} weeks</p>
                          </div>
                          <div className="flex-1 sm:max-w-xs">
                            <div className="flex justify-between text-[10px] font-bold text-emerald-400 mb-1">
                              <span>Progress</span>
                              <span>{r.progress}%</span>
                            </div>
                            <div className="bg-slate-950/60 shadow-inner rounded-full h-1.5 overflow-hidden">
                              <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${r.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Printable Certificate Modal Overlay */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="absolute inset-0 cursor-default" onClick={() => setActiveCert(null)}></div>
          
          <div className="relative w-full max-w-3xl bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-8 border-double border-amber-400/60 z-10 flex flex-col items-center justify-center text-center select-none overflow-hidden max-h-[90vh]">
            {/* Elegant Background Crest overlay */}
            <div className="absolute opacity-[0.02] text-amber-500 text-[250px] font-black pointer-events-none">🎓</div>
            
            {/* Verified badge */}
            <div className="absolute top-6 right-6 w-16 h-16 border-2 border-emerald-400/40 rounded-full flex flex-col items-center justify-center text-emerald-600 font-bold text-[8px] uppercase tracking-tighter opacity-80 rotate-12">
              <span>Verified</span>
              <span className="font-extrabold mt-0.5 text-[7px]">SkillSprint</span>
            </div>

            <Logo size="w-12 h-12 mb-6" />
            
            <span className="text-[10px] text-amber-600 font-black uppercase tracking-widest border-b-2 border-amber-100 pb-1">Certificate of Achievement</span>
            
            <p className="text-xs text-gray-400 font-medium italic mt-6">This is to officially certify that</p>
            
            <h2 className="text-3xl md:text-4.5xl font-black text-gray-950 mt-4 font-serif tracking-tight">{user?.name}</h2>
            
            <p className="text-xs text-gray-500 max-w-lg mt-4 leading-relaxed font-medium">
              has successfully completed all learning roadmap sprints and met the academic evaluation milestones with an accuracy score of <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{activeCert.quizScore}%</span>, thereby achieving complete mastery of the core discipline of
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 mt-4 uppercase tracking-wide">{activeCert.skill}</h3>

            <div className="w-24 h-0.5 bg-amber-400 my-8"></div>

            <div className="grid grid-cols-2 gap-12 text-left w-full max-w-md text-xs font-semibold text-gray-400">
              <div>
                <p className="text-[9px] uppercase tracking-wider">Date of Issuance</p>
                <p className="text-gray-800 font-bold mt-1 text-sm">{activeCert.date}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider">Verification Hash</p>
                <p className="text-gray-800 font-mono font-bold mt-1 text-[10px] tracking-tight">{activeCert.certId}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-10 w-full max-w-sm justify-center">
              <button 
                onClick={() => window.print()}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs py-3 rounded-lg cursor-pointer transition"
              >
                🖨️ Print / Save PDF
              </button>
              <button 
                onClick={() => setActiveCert(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl cursor-pointer transition"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}