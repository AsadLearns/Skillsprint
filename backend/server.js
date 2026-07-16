import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import roadmapRoutes from './routes/roadmapRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import chatRoutes from './routes/chatRoutes.js'

console.log('Gemini Key loaded:', process.env.GEMINI_API_KEY ? '✅ ' + process.env.GEMINI_API_KEY.substring(0, 8) + '...' : '❌ Missing')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: '⚡ SkillSprint API is running', status: 'healthy' })
})

app.use('/api/auth', authRoutes)
app.use('/api/roadmap', roadmapRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/chat', chatRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 8000

// ponytail: Render's free tier sleeps the service after ~15 min without inbound
// traffic, giving mobile users a 30-60s cold start. Self-ping the public URL
// every 14 min so it never idles. One always-on free instance (~744h/mo) fits
// Render's 750h free allowance. Upgrade path: paid tier, then delete this.
if (process.env.RENDER_EXTERNAL_URL) {
  const { get } = await import('https')
  setInterval(() => {
    get(process.env.RENDER_EXTERNAL_URL, (res) => res.resume()).on('error', () => {})
  }, 14 * 60 * 1000)
  console.log(`⏰ Keep-alive self-ping enabled for ${process.env.RENDER_EXTERNAL_URL}`)
}

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`⚡ SkillSprint server running on port ${PORT}`)
  })
}

startServer()