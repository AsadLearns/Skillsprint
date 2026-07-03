import express from 'express'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, async (req, res) => {
  res.json({
    user: req.user,
    progress: 45,
    streak: 7,
    quizScore: 85
  })
})

export default router