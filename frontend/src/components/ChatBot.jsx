import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function ChatBot() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm **Sprinty**, your AI Learning Guide.\n\nTell me about your career goals, what skills you want to learn, or what projects you want to build, and I will recommend personalized roadmaps and sprint paths for you!"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [launchingSkill, setLaunchingSkill] = useState(null)
  
  const messagesEndRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

  const handleSend = async (textToSend) => {
    const promptText = textToSend || input
    if (!promptText.trim()) return

    if (!textToSend) setInput('')
    
    // Append user message
    const newMessages = [...messages, { role: 'user', content: promptText }]
    setMessages(newMessages)
    setLoading(true)

    try {
      // Map to express /api/chat route
      const res = await api.post('/chat', { messages: newMessages })
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }])
    } catch (err) {
      console.error("ChatBot error:", err)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "⚠️ **Sprinty is currently busy.** Please try asking me again in a moment!" }
      ])
    } finally {
      setLoading(false)
    }
  }

  // Triggers roadmap generation via api
  const handleLaunchSprint = async (skill, level) => {
    setLaunchingSkill(`${skill}-${level}`)
    try {
      console.log(`🤖 ChatBot launching sprint: ${skill} (${level})...`)
      const res = await api.post('/roadmap/generate', { skill, level })
      
      // Auto redirect to Roadmap timeline
      if (res.data.success && res.data.roadmap) {
        navigate('/roadmap', { state: { autoOpen: res.data.roadmap._id } })
      }
    } catch (err) {
      console.error("Failed to generate sprint from ChatBot:", err)
      alert("Failed to generate sprint roadmap. Please try again!")
    } finally {
      setLaunchingSkill(null)
    }
  }

  // Parse [ACTION: GENERATE_ROADMAP | Skill | Level] tags to interactive buttons
  const renderMessageContent = (msg) => {
    const actionRegex = /\[ACTION:\s*GENERATE_ROADMAP\s*\|\s*([^|\]]+)\s*\|\s*([^|\]]+)\s*\]/gi
    let content = msg.content
    let actionMatch = actionRegex.exec(content)

    // Remove the tags from normal text rendering
    const cleanText = content.replace(actionRegex, '').trim()

    // Markdown simple bold/lists replacement
    const formattedText = cleanText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />')

    return (
      <div className="space-y-3">
        <p dangerouslySetInnerHTML={{ __html: formattedText }} className="text-xs md:text-sm leading-relaxed" />
        
        {/* If match, render the Action Card Button */}
        {actionMatch && (() => {
          const skill = actionMatch[1].trim()
          const level = actionMatch[2].trim()
          const isThisLaunching = launchingSkill === `${skill}-${level}`

          return (
            <div className="mt-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 rounded-2xl p-4 animate-scale-up text-left">
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block mb-1">Recommended Sprint</span>
              <h5 className="font-extrabold text-sm text-gray-900 mb-2">{skill} Mastery ({level})</h5>
              <button
                disabled={isThisLaunching || loading}
                onClick={() => handleLaunchSprint(skill, level)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl cursor-pointer shadow-md shadow-purple-500/10 transition-all flex items-center justify-center gap-1.5"
              >
                {isThisLaunching ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Generating Sprint...</span>
                  </>
                ) : (
                  <>
                    <span>🚀 Launch {skill} Sprint</span>
                  </>
                )}
              </button>
            </div>
          )
        })()}
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      
      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className="w-[340px] md:w-[380px] h-[480px] mb-4 bg-white/90 backdrop-blur-xl border border-purple-100 shadow-2xl rounded-3xl overflow-hidden flex flex-col animate-scale-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center font-black text-lg">🤖</div>
              <div>
                <h4 className="font-extrabold text-sm tracking-tight leading-tight">Sprinty</h4>
                <p className="text-[10px] font-semibold text-purple-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  SkillSprint AI Guide
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-7 h-7 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-xs font-bold transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Messages Window */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-xs md:text-sm font-medium leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {renderMessageContent(msg)}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-xs font-bold text-gray-400 flex items-center gap-1">
                  <span>Sprinty is thinking</span>
                  <span className="animate-bounce font-black">.</span>
                  <span className="animate-bounce animation-delay-100 font-black">.</span>
                  <span className="animate-bounce animation-delay-200 font-black">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Start suggestions Chips */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-purple-50 bg-white flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => handleSend("Recommend a Python track for beginners")}
                className="bg-purple-50 hover:bg-purple-100 border border-purple-100 text-purple-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full transition cursor-pointer"
              >
                🐍 Python Track
              </button>
              <button 
                onClick={() => handleSend("Suggest a Web Development roadmap")}
                className="bg-pink-50 hover:bg-pink-100 border border-pink-100 text-pink-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full transition cursor-pointer"
              >
                🎨 Web Dev Roadmap
              </button>
              <button 
                onClick={() => handleSend("DevOps or AI/ML: help me choose which skill to learn")}
                className="bg-cyan-50 hover:bg-cyan-100 border border-cyan-100 text-cyan-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full transition cursor-pointer"
              >
                🚀 DevOps vs AI/ML
              </button>
            </div>
          )}

          {/* Input field footer */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="p-3 bg-white border-t border-slate-100 flex gap-2"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask Sprinty anything..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:outline-none text-xs font-semibold"
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-100 disabled:text-gray-400 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center"
            >
              Send
            </button>
          </form>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-purple-600/20 hover:scale-105 cursor-pointer transition-all duration-300 relative group border-2 border-white/80"
      >
        {isOpen ? '✕' : '💬'}
        {/* Soft glowing beacon ring */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-2xl bg-purple-500/30 opacity-60 blur-sm group-hover:opacity-100 animate-pulse pointer-events-none" />
        )}
      </button>

    </div>
  )
}
