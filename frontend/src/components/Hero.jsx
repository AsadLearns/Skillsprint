import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const skills = ["Java", "Python", "React", "Web Dev", "Node.js", "AI/ML", "MongoDB", "DevOps"]

const skillColors = [
  "from-orange-400 to-red-500",
  "from-blue-400 to-blue-600",
  "from-cyan-400 to-blue-500",
  "from-purple-400 to-pink-500",
  "from-green-400 to-emerald-600",
  "from-pink-400 to-rose-500",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-500",
]

function Hero() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleStart = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/signup')
    }
  }

  return (
    <section className="hero-bg py-28 px-6 text-center relative overflow-hidden">
      {/* Drifting Neon Blobs */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-400/25 rounded-full blur-[110px] animate-float-orb-1 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-pink-400/20 rounded-full blur-[130px] animate-float-orb-2 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-cyan-400/15 rounded-full blur-[100px] animate-float-orb-1 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="floating-badge inline-flex items-center gap-2 bg-white border border-purple-200 text-purple-700 text-sm font-semibold px-5 py-2 rounded-full mb-8 shadow-lg shadow-purple-100">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          ✨ Powered by AI — Free to start
        </div>

        <h1 className="text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl mx-auto mb-6">
          Learn smarter,{" "}
          <span className="shimmer">one sprint at a time.</span>
        </h1>

        <p className="text-gray-500 text-xl mt-4 max-w-xl mx-auto leading-relaxed">
          Pick a skill, get an AI-generated roadmap, track your progress,
          and take quizzes — all in one place.
        </p>

        <div className="flex items-center justify-center gap-4 mt-10 flex-wrap">
          <button onClick={handleStart} className="glow-btn bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-xl font-bold text-base cursor-pointer">
            🚀 Start learning free
          </button>
          <a href="#how" className="bg-white border-2 border-purple-200 text-purple-700 px-8 py-4 rounded-xl font-bold text-base hover:bg-purple-50 transition inline-block">
            ▶ See how it works
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
          <span>✅ No credit card</span>
          <span>✅ Free forever plan</span>
          <span>✅ AI-powered</span>
        </div>

        <div id="skills" className="flex flex-wrap justify-center gap-3 mt-14">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className={`skill-pill bg-gradient-to-r ${skillColors[i]} text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Hero