import Logo from './Logo'

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-slate-400 py-16 px-6 border-t border-white/[0.04] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Logo size="w-9 h-9" />
          <span className="text-white font-bold text-2xl tracking-tight">SkillSprint</span>
        </div>
        <p className="text-slate-400 mb-8 font-medium">Learn smarter, one sprint at a time.</p>

        <div className="flex justify-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] mb-8 text-slate-400">
          <a href="#features" className="hover:text-slate-200 transition">Features</a>
          <a href="#how" className="hover:text-slate-200 transition">Process</a>
          <a href="#faq" className="hover:text-slate-200 transition">FAQ</a>
        </div>

        <div className="border-t border-white/[0.05] pt-8 font-mono text-[10px] tracking-wider text-slate-600 uppercase">
          Built with React · Node.js · MongoDB · Asad · © 2026 SkillSprint
        </div>
      </div>
    </footer>
  )
}

export default Footer