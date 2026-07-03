import express from 'express'
import { generateQuiz, submitQuiz, getMyQuizzes } from '../controllers/quizController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()
router.use(protect)
router.post('/generate', generateQuiz)
router.put('/:id/submit', submitQuiz)
router.get('/', getMyQuizzes)

export default router