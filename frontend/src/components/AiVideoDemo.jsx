import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const chapters = [
  {
    id: 1,
    time: "0:00",
    title: "1. Prompt & Skill Selection",
    desc: "AI identifies your target stack, skill tier, and sprint pacing.",
    badge: "INPUT PARSER",
    tagColor: "text-cyber-400 border-cyber-500/30 bg-cyber-500/10",
  },
  {
    id: 2,
    time: "0:08",
    title: "2. Autonomous Curriculum Synthesis",
    desc: "Gemini AI structures week-by-week goals, milestones, and curated study dossiers.",
    badge: "ROADMAP ENGINE",
    tagColor: "text-accent-400 border-accent-500/30 bg-accent-500/10",
  },
  {
    id: 3,
    time: "0:18",
    title: "3. Concept Verification Quizzes",
    desc: "Automated MCQ assessments generated to test milestone retention before proceeding.",
    badge: "ASSESSMENT GEN",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    id: 4,
    time: "0:25",
    title: "4. Verifiable Certificate Issuance",
    desc: "Cryptographically signed mastery credential unlocked upon achieving 60%+ accuracy.",
    badge: "PROOF OF MASTERY",
    tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
]

function AiVideoDemo() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [progress, setProgress] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Loop video or advance
          setCurrentChapter((ch) => (ch + 1) % chapters.length)
          return 0
        }
        return prev + 1.2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleSelectChapter = (index) => {
    setCurrentChapter(index)
    setProgress(0)
  }

  const togglePlay = () => setIsPlaying(!isPlaying)

  return (
    <section id="ai-video-demo" className="reveal py-24 px-6 bg-[#070b14]/90 border-t border-white/[0.05] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-accent-600/15 via-cyber-500/15 to-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/25 mb-4 text-accent-300 font-mono text-[10px] font-bold uppercase tracking-wider shadow-glow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-400 animate-pulse"></span>
            AI ENGINE WALKTHROUGH
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight mb-4">
            See the AI Engine <span className="gradient-text">in Action</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-medium">
            Watch how SkillSprint synthesizes raw programming skills into structured roadmaps, study guides, and milestone quizzes.
          </p>
        </div>

        {/* Video Player Simulation Card */}
        <div className="surface-card rounded-3xl border border-white/[0.1] bg-[#0c1324]/95 backdrop-blur-2xl shadow-2xl overflow-hidden hover:border-accent-500/40 transition-all duration-500">
          {/* Player Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-[#080d19]/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-3 font-mono text-[11px] text-slate-400 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>REC // AI-GENERATED SPRINT DEMO.MP4</span>
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-cyber-400 font-bold hidden sm:inline">1080P 60FPS</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-slate-400 hover:text-white transition px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08]"
                title="Toggle audio synth"
              >
                {soundEnabled ? "🔊 Sound On" : "🔇 Muted"}
              </button>
            </div>
          </div>

          {/* Video Screen Area */}
          <div className="relative aspect-video w-full bg-[#050811] flex flex-col justify-between p-6 md:p-10 overflow-hidden group">
            {/* Holographic Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40"></div>

            {/* Top Stage Indicators */}
            <div className="relative z-10 flex items-center justify-between">
              <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${chapters[currentChapter].tagColor}`}>
                {chapters[currentChapter].badge}
              </div>
              <div className="font-mono text-xs text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-white/[0.08]">
                CH 0{currentChapter + 1} / 04
              </div>
            </div>

            {/* Central Dynamic AI Screen Content */}
            <div className="relative z-10 my-auto text-center max-w-xl mx-auto animate-fade-in key={currentChapter}">
              {currentChapter === 0 && (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-cyber-500/10 border border-cyber-500/30 flex items-center justify-center text-3xl shadow-glow-sm">
                    💻
                  </div>
                  <div className="font-mono text-xs md:text-sm text-cyber-300 bg-[#080d19]/90 border border-cyber-500/30 px-5 py-3 rounded-xl inline-block shadow-lg">
                    $ skillsprint generate --skill "React & TypeScript" --level "Pro"
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    Natural Language Skill Ingestion
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    AI ingests industry prerequisites, standard frameworks, and builds customized milestones.
                  </p>
                </div>
              )}

              {currentChapter === 1 && (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-500/10 border border-accent-500/30 flex items-center justify-center text-3xl shadow-glow-sm">
                    🗺️
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left font-mono text-[11px]">
                    {["1. Virtual DOM & Hooks", "2. State Management", "3. Server Actions", "4. Full-stack App"].map((t, i) => (
                      <div key={t} className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                        <span className="text-accent-400 block font-bold">WEEK {i + 1}</span>
                        <span className="text-slate-300 truncate block">{t}</span>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    Week-by-Week Technical Architecture
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Zero guesswork. Each week contains clear learning topics, curated video links, and synthesized markdown dossiers.
                  </p>
                </div>
              )}

              {currentChapter === 2 && (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl shadow-glow-sm">
                    🧠
                  </div>
                  <div className="bg-[#080d19]/90 border border-white/[0.08] p-4 rounded-2xl text-left max-w-md mx-auto">
                    <p className="text-xs text-slate-300 font-mono mb-2 font-semibold">Q: Which hook is used to handle side-effects in React?</p>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2 rounded border border-white/[0.06] text-slate-400">A. useMemo</div>
                      <div className="p-2 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-bold">B. useEffect ✓</div>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    Instant Concept Verification Quizzes
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Auto-generated multiple choice questions challenge your understanding before unlocking the next milestone.
                  </p>
                </div>
              )}

              {currentChapter === 3 && (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl shadow-glow-sm">
                    🎓
                  </div>
                  <div className="bg-gradient-to-r from-emerald-950/40 via-teal-950/40 to-slate-900 border border-emerald-500/30 p-4 rounded-2xl max-w-sm mx-auto shadow-2xl">
                    <span className="text-[10px] font-mono text-emerald-400 tracking-[0.25em] uppercase font-bold block mb-1">CERTIFICATE OF MASTERY</span>
                    <p className="text-base font-bold text-white">Full-Stack React Engineer</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-1">ISSUED TO ASAD · SCORE: 92%</p>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    Cryptographic Proof of Mastery
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Graduate your sprint with a shareable certificate proving hands-on completion.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Controls inside Screen */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.08] bg-[#0c1324]/60 backdrop-blur-md -mx-6 -mb-6 px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-accent-500 to-indigo-600 hover:from-accent-400 hover:to-indigo-500 text-white flex items-center justify-center shadow-glow-sm cursor-pointer transition-transform hover:scale-105"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <div className="font-mono text-xs text-slate-300">
                  <span>{chapters[currentChapter].time}</span> / <span className="text-slate-500">0:30</span>
                </div>
              </div>

              {/* Progress Scrubber */}
              <div className="flex-1 max-w-md mx-6 bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer" onClick={() => setProgress(0)}>
                <div
                  className="bg-gradient-to-r from-accent-500 via-cyber-400 to-emerald-400 h-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <button
                onClick={() => navigate(user ? "/dashboard" : "/signup")}
                className="bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer hidden sm:block"
              >
                Try It Live →
              </button>
            </div>
          </div>

          {/* Interactive Chapter Selector Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] border-t border-white/[0.06] bg-[#080d19]/90 font-mono text-xs">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(idx)}
                className={`p-4 text-left transition-all duration-300 cursor-pointer ${currentChapter === idx ? "bg-accent-500/10 text-white border-b-2 border-accent-500" : "text-slate-400 hover:bg-white/[0.02] hover:text-slate-200"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold ${currentChapter === idx ? "text-accent-400" : "text-slate-500"}`}>
                    STAGE 0{idx + 1}
                  </span>
                  <span className="text-[10px] text-slate-500">{ch.time}</span>
                </div>
                <p className="font-bold text-slate-200 text-xs truncate">{ch.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiVideoDemo
