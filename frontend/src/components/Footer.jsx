function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-white font-bold text-2xl">SkillSprint</span>
        </div>
        <p className="text-gray-400 mb-8">Learn smarter, one sprint at a time.</p>

        <div className="flex justify-center gap-8 text-sm mb-8">
          <a href="#features" className="hover:text-purple-400 transition">Features</a>
          <a href="#how" className="hover:text-purple-400 transition">How it works</a>
          <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
        </div>

        <div className="border-t border-gray-800 pt-8 text-xs text-gray-600">
          Built with React · Node.js · MongoDB · OpenAI &nbsp;·&nbsp; © 2025 SkillSprint
        </div>
      </div>
    </footer>
  )
}

export default Footer