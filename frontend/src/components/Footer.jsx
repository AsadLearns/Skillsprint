import Logo from './Logo'

function Footer() {
  return (
    <footer className="bg-[#030008] text-slate-400 py-16 px-6 border-t border-white/[0.04] relative overflow-hidden">
      {/* Drifting Neon Blobs for depth */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/5 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Logo size="w-9 h-9" />
          <span className="text-white font-bold text-2xl tracking-tight">SkillSprint</span>
        </div>
        <p className="text-slate-400 mb-8 font-medium">Learn smarter, one sprint at a time.</p>

        <div className="flex justify-center gap-8 text-sm mb-8 text-slate-400">
          <a href="#features" className="hover:text-purple-400 transition">Features</a>
          <a href="#how" className="hover:text-purple-400 transition">How it works</a>
          <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
        </div>

        <div className="border-t border-white/[0.05] pt-8 text-xs text-slate-600">
          Built with React · Node.js · MongoDB · Asad &nbsp;·&nbsp; © 2026 SkillSprint
        </div>
      </div>
    </footer>
  )
}

export default Footer