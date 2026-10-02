import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const chapters = [
  {
    id: 1,
    time: "0:00",
    label: "01. Input Ingestion",
    title: "Stack & Level Declaration",
    desc: "Developer specifies target technology, career seniority, and weekly sprint cadence.",
    activeTab: "config"
  },
  {
    id: 2,
    time: "0:08",
    label: "02. Milestone Graph",
    title: "Autonomous Architecture Engine",
    desc: "AI builds a directed acyclic graph of weekly concepts, reading material, and practical deliverables.",
    activeTab: "curriculum"
  },
  {
    id: 3,
    time: "0:18",
    label: "03. Code Evaluation",
    title: "Runtime Concept Verification",
    desc: "Auto-generated technical quizzes test memory management, concurrency bugs, and architectural trade-offs.",
    activeTab: "quiz"
  },
  {
    id: 4,
    time: "0:25",
    label: "04. Credential Delivery",
    title: "Verifiable Proof of Skill",
    desc: "Cryptographically verified digital certificate awarded once all weekly milestones and quizzes pass 60%+.",
    activeTab: "cert"
  },
]

function AiVideoDemo() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [progress, setProgress] = useState(0)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentChapter((ch) => (ch + 1) % chapters.length)
          return 0
        }
        return prev + 1.2
      })
    }, 100)
    return () => clearInterval(interval)
  }, [isPlaying])

  const selectChapter = (idx) => {
    setCurrentChapter(idx)
    setProgress(0)
  }

  return (
    <section id="ai-video-demo" className="reveal py-24 px-6 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Realistic Developer Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 mb-12">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-indigo-600 font-bold block mb-2">
              // ENGINE DEMONSTRATION
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight font-heading">
              Interactive <span className="gradient-text">Engine Walkthrough</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-md font-medium">
            Inspect how the SkillSprint compiler ingests a technology stack, outputs weekly milestones, and validates active recall.
          </p>
        </div>

        {/* Realistic IDE / Video Studio Container */}
        <div className="rounded-2xl border border-slate-300 bg-slate-950 shadow-2xl overflow-hidden">
          
          {/* macOS / IDE Top Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#080d19] border-b border-white/[0.06] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
              <span className="ml-3 text-slate-400 hidden sm:inline">skillsprint-engine / runtime / walkthrough.ts</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ENGINE: ONLINE</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 text-[11px] font-mono">{chapters[currentChapter].time} / 0:30</span>
            </div>
          </div>

          {/* IDE Editor Tabs */}
          <div className="flex items-center border-b border-white/[0.06] bg-[#090e1c] overflow-x-auto no-scrollbar font-mono text-xs">
            {[
              { id: "config", label: "sprint.config.ts", icon: "TS" },
              { id: "curriculum", label: "milestones.graph", icon: "DAG" },
              { id: "quiz", label: "evaluation_test.go", icon: "GO" },
              { id: "cert", label: "credential.json", icon: "KEY" },
            ].map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => selectChapter(idx)}
                className={`flex items-center gap-2 px-5 py-2.5 border-r border-white/[0.06] transition-colors cursor-pointer ${
                  currentChapter === idx
                    ? "bg-[#0c1324] text-white border-t-2 border-t-accent-500 font-bold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                }`}
              >
                <span className={`text-[10px] font-black ${currentChapter === idx ? "text-accent-400" : "text-slate-400"}`}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Code Body & Interactive Preview Split Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            
            {/* Left: Syntax-Highlighted Code Editor (7 cols) */}
            <div className="lg:col-span-7 p-6 font-mono text-xs md:text-sm bg-[#080d19]/90 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-x-auto select-text">
              <div className="space-y-1.5 leading-relaxed text-slate-300">
                {currentChapter === 0 && (
                  <>
                    <p className="text-slate-400">// Step 1: Declare technical sprint parameters</p>
                    <p><span className="text-purple-400">import</span> &#123; <span className="text-cyan-300">defineSprint</span>, <span className="text-cyan-300">Level</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"@skillsprint/engine"</span>;</p>
                    <br />
                    <p><span className="text-purple-400">export default</span> <span className="text-blue-400">defineSprint</span>(&#123;</p>
                    <p className="pl-4"><span className="text-slate-400">skill</span>: <span className="text-emerald-300">"Go High-Performance Systems"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">targetTier</span>: <span className="text-blue-300">Level.SeniorEngineer</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">durationWeeks</span>: <span className="text-amber-300">8</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">prerequisites</span>: [<span className="text-emerald-300">"Basic Go Syntax"</span>, <span className="text-emerald-300">"Memory & Pointers"</span>],</p>
                    <p className="pl-4"><span className="text-slate-400">assessmentMode</span>: <span className="text-emerald-300">"STRICT_MCQ_VERIFIED"</span>,</p>
                    <p>&#125;);</p>
                  </>
                )}

                {currentChapter === 1 && (
                  <>
                    <p className="text-slate-400">// Step 2: Autonomous Week-by-Week Milestone DAG generated</p>
                    <p><span className="text-blue-400">const</span> <span className="text-cyan-300">curriculumPlan</span> = [</p>
                    <p className="pl-4">&#123; <span className="text-slate-400">week</span>: <span className="text-amber-300">1</span>, <span className="text-slate-400">focus</span>: <span className="text-emerald-300">"Goroutine Scheduler & M:N Threading"</span>, <span className="text-slate-400">status</span>: <span className="text-emerald-400">"passed"</span> &#125;,</p>
                    <p className="pl-4 bg-accent-500/10 py-0.5 rounded">&#123; <span className="text-slate-400">week</span>: <span className="text-amber-300">2</span>, <span className="text-slate-400">focus</span>: <span className="text-emerald-300">"Buffered Channels & Select Multiplexing"</span>, <span className="text-slate-400">status</span>: <span className="text-accent-300 font-bold">"in_progress"</span> &#125;,</p>
                    <p className="pl-4">&#123; <span className="text-slate-400">week</span>: <span className="text-amber-300">3</span>, <span className="text-slate-400">focus</span>: <span className="text-emerald-300">"Sync Mutexes, Atomics & Race Detector"</span>, <span className="text-slate-400">status</span>: <span className="text-slate-400">"queued"</span> &#125;,</p>
                    <p className="pl-4">&#123; <span className="text-slate-400">week</span>: <span className="text-amber-300">4</span>, <span className="text-slate-400">focus</span>: <span className="text-emerald-300">"Production Worker Pools & Benchmarking"</span>, <span className="text-slate-400">status</span>: <span className="text-slate-400">"queued"</span> &#125;,</p>
                    <p>];</p>
                    <br />
                    <p className="text-cyan-400 font-bold">// Weekly AI study dossier compiled with verified references</p>
                  </>
                )}

                {currentChapter === 2 && (
                  <>
                    <p className="text-slate-400">// Step 3: Runtime Concept Verification Test Suite</p>
                    <p><span className="text-purple-400">func</span> <span className="text-blue-400">TestChannelDeadlockPrevention</span>(t *testing.T) &#123;</p>
                    <p className="pl-4 text-slate-400">// Evaluates whether learner understands unbuffered deadlock hazards</p>
                    <p className="pl-4">ch := <span className="text-blue-300">make</span>(<span className="text-purple-400">chan</span> <span className="text-cyan-300">int</span>, <span className="text-amber-300">1</span>) <span className="text-slate-400">// buffered capacity 1</span></p>
                    <p className="pl-4"><span className="text-purple-400">select</span> &#123;</p>
                    <p className="pl-8"><span className="text-purple-400">case</span> ch &lt;- <span className="text-amber-300">42</span>:</p>
                    <p className="pl-12 text-emerald-400">t.Log("Channel write successful without blocking.")</p>
                    <p className="pl-8"><span className="text-purple-400">default</span>:</p>
                    <p className="pl-12 text-rose-400">t.Fatal("Deadlock triggered!")</p>
                    <p className="pl-4">&#125;</p>
                    <p>&#125;</p>
                  </>
                )}

                {currentChapter === 3 && (
                  <>
                    <p className="text-slate-400">// Step 4: Cryptographic Credential Signature</p>
                    <p><span className="text-purple-400">export const</span> <span className="text-cyan-300">credentialReceipt</span> = &#123;</p>
                    <p className="pl-4"><span className="text-slate-400">candidate</span>: <span className="text-emerald-300">"Asad Jiwani"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">track</span>: <span className="text-emerald-300">"Go High-Performance Systems"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">finalScore</span>: <span className="text-amber-300">92.5</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">milestonesComplete</span>: <span className="text-emerald-400">"8 of 8"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">issuedAt</span>: <span className="text-emerald-300">"2026-10-02T01:30:00Z"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">verificationHash</span>: <span className="text-cyan-300">"0x9f8c...4b12a"</span>,</p>
                    <p>&#125;;</p>
                  </>
                )}
              </div>
            </div>

            {/* Right: Live Interactive Output Panel (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-[#0c1324] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {chapters[currentChapter].label}
                  </span>
                  <span className="font-mono text-xs text-cyber-400 font-bold">
                    STAGE 0{currentChapter + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {chapters[currentChapter].title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
                  {chapters[currentChapter].desc}
                </p>

                {/* Dynamic Preview Card depending on chapter */}
                {currentChapter === 0 && (
                  <div className="p-4 rounded-xl bg-[#080d19] border border-white/[0.08] font-mono text-xs space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Track:</span> <span className="text-slate-200 font-bold">Go Systems Engineering</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Target Level:</span> <span className="text-cyan-400 font-bold">Senior Engineer</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Sprint Velocity:</span> <span className="text-amber-400 font-bold">8 Milestones</span>
                    </div>
                  </div>
                )}

                {currentChapter === 1 && (
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                      <span className="text-emerald-300">W1: Scheduler &amp; Threads</span>
                      <span className="text-emerald-400 font-bold">DONE ✓</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-accent-500/15 border border-accent-500/40 flex items-center justify-between shadow-glow-sm">
                      <span className="text-accent-200 font-bold">W2: Channel Multiplexing</span>
                      <span className="text-accent-400 font-bold">45% ACTIVE</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-slate-400 flex items-center justify-between">
                      <span>W3: Mutexes &amp; Race Conditions</span>
                      <span className="text-slate-400">LOCKED</span>
                    </div>
                  </div>
                )}

                {currentChapter === 2 && (
                  <div className="p-4 rounded-xl bg-[#080d19] border border-white/[0.08] text-xs">
                    <p className="font-mono text-slate-300 mb-3 font-semibold">Which primitive prevents unbuffered deadlocks across Go routines?</p>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="p-2 rounded border border-white/[0.06] text-slate-400">A. runtime.Gosched()</div>
                      <div className="p-2 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-bold flex justify-between">
                        <span>B. select with non-blocking default</span>
                        <span>✓ Correct</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter === 3 && (
                  <div className="p-5 rounded-xl bg-gradient-to-br from-[#0c1324] to-[#11192e] border border-emerald-500/40 shadow-glow-sm text-center">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold tracking-[0.2em] uppercase mb-1">OFFICIAL CREDENTIAL</div>
                    <p className="text-sm font-bold text-white">Go Systems Architecture Pro</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">SCORE: 92.5% · ALL MILESTONES PASSED</p>
                  </div>
                )}
              </div>

              {/* Bottom Direct Action */}
              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => navigate(user ? "/dashboard" : "/signup")}
                  className="bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Generate This Track →
                </button>
                <span className="font-mono text-[11px] text-slate-400">Zero credit card</span>
              </div>
            </div>
          </div>

          {/* Bottom Player Controller Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#080d19] border-t border-white/[0.06]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center text-xs font-mono font-bold transition cursor-pointer"
              >
                {isPlaying ? "PAUSE" : "PLAY"}
              </button>
              <span className="font-mono text-xs text-slate-400 hidden sm:inline">
                {chapters[currentChapter].title}
              </span>
            </div>

            {/* Scrubbing Bar */}
            <div className="flex-1 max-w-md mx-6 bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer" onClick={() => setProgress(0)}>
              <div
                className="bg-gradient-to-r from-accent-500 via-cyber-400 to-emerald-400 h-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              {chapters.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectChapter(i)}
                  className={`w-6 h-6 rounded-md transition cursor-pointer font-bold ${
                    currentChapter === i ? "bg-accent-500 text-white" : "bg-white/[0.04] text-slate-400 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AiVideoDemo
