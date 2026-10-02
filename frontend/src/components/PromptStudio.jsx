import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { generateEngineeringSolution } from "../utils/solutionGenerator"

const presetPrompts = [
  {
    label: "🛡️ MLOps & DevOps Data Safety",
    text: "making mlops and devops working to keep data safe with automated backups and AES-256 encryption"
  },
  {
    label: "🌐 Full-Stack Web Application",
    text: "making a full stack website with React 19, FastAPI, PostgreSQL, Redis and Docker"
  },
  {
    label: "⚡ Distributed Go & Kafka",
    text: "building a high-throughput event streaming microservice architecture with Go and Apache Kafka"
  },
  {
    label: "🔒 Zero-Loss Database Recovery",
    text: "designing a zero-data-loss PostgreSQL database replication and disaster recovery pipeline on Kubernetes"
  }
]

function PromptStudio({ defaultPrompt = "" }) {
  const [prompt, setPrompt] = useState(defaultPrompt || presetPrompts[0].text)
  const [activeTab, setActiveTab] = useState("architecture") // architecture, security, code, cli, milestones
  const [activeFileIndex, setActiveFileIndex] = useState(0)
  const [copiedKey, setCopiedKey] = useState("")
  const [isCompiling, setIsCompiling] = useState(false)
  const [compileStep, setCompileStep] = useState(0)
  const [solution, setSolution] = useState(() => generateEngineeringSolution(defaultPrompt || presetPrompts[0].text))
  
  const { user } = useAuth()
  const navigate = useNavigate()

  const compileSteps = [
    "Ingesting natural language prompt & specifications...",
    "Resolving component topology & service boundaries...",
    "Synthesizing data safety & cryptographic protection protocols...",
    "Compiling production code artifacts & CI/CD deployment manifests...",
    "Finalizing execution blueprint & milestone deliverables."
  ]

  const handleBuild = (targetPrompt = prompt) => {
    if (!targetPrompt.trim()) return
    setIsCompiling(true)
    setCompileStep(0)

    let current = 0
    const interval = setInterval(() => {
      current++
      if (current < compileSteps.length) {
        setCompileStep(current)
      } else {
        clearInterval(interval)
        setIsCompiling(false)
        const generated = generateEngineeringSolution(targetPrompt)
        setSolution(generated)
        setActiveFileIndex(0)
        setActiveTab("architecture")
      }
    }, 280)
  }

  const handlePresetClick = (pText) => {
    setPrompt(pText)
    handleBuild(pText)
  }

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(""), 2200)
  }

  const handleLaunchSprint = () => {
    if (user) {
      navigate("/roadmap", {
        state: {
          customPrompt: prompt,
          customSolutionTitle: solution.title,
          autoSkill: solution.title
        }
      })
    } else {
      navigate("/signup")
    }
  }

  return (
    <section id="prompt-builder" className="reveal py-20 px-6 bg-slate-50/70 border-t border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/[0.04] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-cyan-50 border border-cyan-200 text-cyan-800 mb-3 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
              <span>PROMPT-TO-EXECUTION ENGINE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight font-heading">
              Describe Your Objective. <br className="hidden sm:inline" />
              <span className="gradient-text">Get Production Work Done.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-md font-medium">
            Type any engineering task — from building full-stack web platforms to securing MLOps &amp; DevOps pipelines. Get architecture, code files, and verified milestone blueprints instantly.
          </p>
        </div>

        {/* Prompt Input & Execution Controller Card */}
        <div className="surface-card rounded-2xl border border-slate-200 bg-white p-5 md:p-7 shadow-xl mb-12">
          
          {/* Preset Prompts Row */}
          <div className="mb-4">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-bold">
              // Click a Quick Engineering Template:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {presetPrompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handlePresetClick(p.text)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer border ${
                    prompt === p.text
                      ? "bg-indigo-50 border-indigo-300 text-indigo-700 font-bold shadow-sm"
                      : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-950"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Input Form */}
          <div className="relative mb-4">
            <div className="flex items-start gap-3 rounded-xl border border-slate-300 bg-slate-50 p-3.5 focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <span className="font-mono text-indigo-600 font-bold select-none text-sm pt-0.5">$</span>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Making a full-stack website with React 19, or making MLOps & DevOps working to keep data safe..."
                rows={2}
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-4 text-xs font-mono text-slate-600 font-medium">
              <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">●</span> AES-256 Encryption Guard</span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span className="hidden md:flex items-center gap-1.5"><span className="text-cyan-600 font-bold">●</span> Multi-file Code Generator</span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span className="hidden md:flex items-center gap-1.5"><span className="text-indigo-600 font-bold">●</span> Sprint Milestones</span>
            </div>

            <button
              onClick={() => handleBuild()}
              disabled={isCompiling}
              className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCompiling ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Compiling Solution...</span>
                </>
              ) : (
                <>
                  <span>Execute &amp; Build Solution</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>

          {/* Compilation Terminal Output Progress */}
          {isCompiling && (
            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 animate-fadeIn">
              <div className="flex items-center gap-2 text-cyan-400 mb-2 font-bold text-[11px] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>ENGINE RUNTIME: COMPILING SPECIFICATION</span>
              </div>
              <p className="text-emerald-400 flex items-center gap-2">
                <span>&gt;</span>
                <span>{compileSteps[compileStep]}</span>
              </p>
            </div>
          )}
        </div>

        {/* Generated Solution Studio Canvas */}
        {solution && (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-slide-up">
            
            {/* Top Workspace Header Bar */}
            <div className="p-6 md:p-8 bg-slate-50/90 border-b border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider border bg-emerald-50 text-emerald-700 border-emerald-200">
                      {solution.badge}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                      {solution.spec}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-heading">
                    {solution.title}
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-2xl font-normal leading-relaxed">
                    {solution.summary}
                  </p>
                </div>

                {/* Primary Action: Launch as active trackable sprint */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleLaunchSprint}
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-mono text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                  >
                    <span>Launch as Sprint Roadmap</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Tag Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2">
                {solution.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 shadow-sm"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center border-b border-slate-200 bg-slate-100/70 overflow-x-auto no-scrollbar font-mono text-xs">
              {[
                { id: "architecture", label: "01. Architecture Topology", icon: "☵" },
                { id: "security", label: "02. Data Safety & Security", icon: "🔒" },
                { id: "code", label: `03. Code Artifacts (${solution.files.length})`, icon: "📄" },
                { id: "cli", label: `04. Terminal CLI (${solution.cliCommands.length})`, icon: "$" },
                { id: "milestones", label: `05. Weekly Milestones (${solution.milestones.length})`, icon: "⏱" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 border-r border-slate-200 whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-indigo-600 border-t-2 border-t-indigo-600 font-bold shadow-sm"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
                  }`}
                >
                  <span className={activeTab === tab.id ? "text-indigo-600 font-bold" : "text-slate-400"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab 1: Architecture Topology */}
            {activeTab === "architecture" && (
              <div className="p-6 md:p-8 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Topological Service Boundaries</h4>
                    <p className="text-slate-600 text-xs">End-to-end execution flow resolved for this prompt.</p>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-bold">
                    SYSTEM HEALTH: PRODUCTION-READY
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-8">
                  {solution.topology.map((node, i) => (
                    <div
                      key={node.step}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 flex flex-col justify-between relative group hover:border-indigo-300 hover:bg-white transition-all shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between font-mono text-[10px] mb-2.5">
                          <span className="text-indigo-600 font-bold">STAGE {node.step}</span>
                          <span className="text-emerald-700 font-bold text-[9px] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                            {node.status}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm mb-1.5">{node.name}</h5>
                        <p className="text-slate-600 text-xs leading-relaxed font-normal">{node.role}</p>
                      </div>

                      {i < solution.topology.length - 1 && (
                        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-400 font-bold">
                          →
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="text-indigo-600">💡</span>
                    <span>Ready to inspect the live codebase generated for this topology?</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("code")}
                    className="text-indigo-600 hover:text-indigo-800 underline font-bold cursor-pointer"
                  >
                    View Code Artifacts ({solution.files.length} files) →
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Data Safety & Security Matrix */}
            {activeTab === "security" && (
              <div className="p-6 md:p-8 bg-white">
                <div className="mb-6">
                  <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-widest font-bold block mb-1">
                    // DATA SAFETY & DISASTER RECOVERY
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 font-heading">Cryptographic Data Protection Controls</h4>
                  <p className="text-slate-600 text-xs mt-1">
                    Enforces strict data safety standards: zero unencrypted storage, continuous WAL backups, and tamper-evident logging.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {solution.dataSafety.map((sec, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2 font-mono text-xs text-emerald-700 font-bold">
                        <span>🛡️</span>
                        <span>{sec.protocol}</span>
                      </div>
                      <h5 className="font-extrabold text-slate-900 text-base mb-2">{sec.title}</h5>
                      <p className="text-slate-600 text-xs leading-relaxed font-normal">{sec.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between flex-wrap gap-3 font-mono text-xs text-emerald-800">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span className="font-semibold">STANDARDS: SOC-2 TYPE II · HIPAA / PCI-DSS COMPLIANT ENCRYPTION ENVELOPES</span>
                  </span>
                  <button
                    onClick={() => {
                      setActiveTab("code")
                      const secFileIdx = solution.files.findIndex(f => f.name.includes("encryption") || f.name.includes("backup"))
                      if (secFileIdx !== -1) setActiveFileIndex(secFileIdx)
                    }}
                    className="text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-300 font-bold cursor-pointer"
                  >
                    Inspect Security Code →
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Code Artifacts (High-Contrast Split Studio) */}
            {activeTab === "code" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                
                {/* Left: File Tree (4 cols) */}
                <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50 p-4 font-mono text-xs">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-3 px-2">
                    // GENERATED ARTIFACTS
                  </div>
                  <div className="space-y-1">
                    {solution.files.map((file, idx) => (
                      <button
                        key={file.path}
                        onClick={() => setActiveFileIndex(idx)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                          activeFileIndex === idx
                            ? "bg-white border border-slate-300 text-indigo-700 font-bold shadow-sm"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-slate-400 text-[11px]">📄</span>
                          <span className="truncate">{file.name}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 uppercase font-mono shrink-0 ml-2">
                          {file.language}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 px-2 text-[11px] text-slate-600">
                    <p className="font-semibold text-slate-800 mb-1">Target Path:</p>
                    <p className="text-indigo-600 font-mono text-[10px] break-all">
                      {solution.files[activeFileIndex].path}
                    </p>
                    <p className="text-slate-500 text-[10px] mt-2">
                      {solution.files[activeFileIndex].desc}
                    </p>
                  </div>
                </div>

                {/* Right: Code Viewer (8 cols) High-Contrast Dark Console */}
                <div className="lg:col-span-8 bg-slate-950 flex flex-col justify-between">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{solution.files[activeFileIndex].name}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-[10px] text-slate-400">{solution.files[activeFileIndex].path}</span>
                    </div>

                    <button
                      onClick={() => handleCopy(solution.files[activeFileIndex].content, "file_" + activeFileIndex)}
                      className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-[11px] font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedKey === "file_" + activeFileIndex ? (
                        <span className="text-emerald-400 font-bold">✓ Copied</span>
                      ) : (
                        <span>📋 Copy File</span>
                      )}
                    </button>
                  </div>

                  {/* Code Body */}
                  <pre className="p-5 font-mono text-xs leading-relaxed text-slate-100 overflow-x-auto select-text max-h-[460px]">
                    <code>{solution.files[activeFileIndex].content}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Tab 4: Terminal CLI Commands */}
            {activeTab === "cli" && (
              <div className="p-6 md:p-8 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Terminal Execution Commands</h4>
                    <p className="text-slate-600 text-xs">Execute these commands in your shell to run this architecture locally.</p>
                  </div>
                  <button
                    onClick={() => {
                      const allCmds = solution.cliCommands.map(c => c.cmd).join("\n")
                      handleCopy(allCmds, "all_cli")
                    }}
                    className="font-mono text-xs font-bold px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 cursor-pointer shadow-sm"
                  >
                    {copiedKey === "all_cli" ? "✓ All Copied" : "📋 Copy All Commands"}
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {solution.cliCommands.map((c) => (
                    <div
                      key={c.step}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 group shadow-sm hover:border-slate-300"
                    >
                      <div className="flex items-start md:items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {c.step}
                        </span>
                        <div>
                          <div className="text-slate-950 font-bold text-xs select-all bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                            $ {c.cmd}
                          </div>
                          <div className="text-[11px] text-slate-600 mt-1">{c.desc}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopy(c.cmd, "cli_" + c.step)}
                        className="self-end md:self-auto px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-[10px] shrink-0 cursor-pointer shadow-sm"
                      >
                        {copiedKey === "cli_" + c.step ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Weekly Milestones */}
            {activeTab === "milestones" && (
              <div className="p-6 md:p-8 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Execution &amp; Learning Roadmap</h4>
                    <p className="text-slate-600 text-xs">Step-by-step weekly milestone timeline to build and master this system.</p>
                  </div>
                  <button
                    onClick={handleLaunchSprint}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-sm"
                  >
                    Open in Roadmap Tracker →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {solution.milestones.map((m) => (
                    <div
                      key={m.week}
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/80 flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between font-mono text-[10px] text-indigo-600 font-bold mb-2">
                          <span>WEEK {m.week}</span>
                          <span className="text-slate-500">PHASE MILESTONE</span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm mb-2">{m.topic}</h5>
                      </div>

                      <div className="border-t border-slate-200 pt-3 mt-3 text-xs font-mono text-slate-600">
                        <span className="text-emerald-700 font-bold">Deliverable: </span>
                        <span>{m.deliverable}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Footer Callout */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-600">
              <span className="flex items-center gap-2">
                <span className="text-indigo-600">⚡</span>
                <span>Want to test your conceptual recall on this stack? Take an AI technical evaluation quiz.</span>
              </span>
              <button
                onClick={() => navigate(user ? "/quiz" : "/signup")}
                className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
              >
                Launch Verification Quiz →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PromptStudio
