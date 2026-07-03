import Quiz from '../models/quiz.js'
import { askOpenRouterWithFallback, cleanAndParseJSON } from '../utils/aiService.js'

export const generateQuiz = async (req, res) => {
  try {
    const { skill, topic, count } = req.body
    const userId = req.user._id

    const numQuestions = Number(count) || 5

    const prompt = `Create a ${numQuestions}-question multiple choice quiz about "${topic}" for someone learning ${skill}.
Return ONLY a valid JSON array of exactly ${numQuestions} objects.
No markdown, no backticks, no explanation, no extra text at all.
Start your response with [ and end with ]
Each object must have exactly:
- question: string
- options: array of exactly 4 strings
- correct: number 0 to 3 which is the index of the correct answer
Example:
[{"question":"What does HTML stand for?","options":["Hyper Text Markup Language","High Text Machine Language","Hyper Transfer Markup Language","Home Tool Markup Language"],"correct":0}]`

    const content = await askOpenRouterWithFallback(prompt)
    const questions = cleanAndParseJSON(content)

    const quiz = await Quiz.create({ userId, skill, topic, questions })
    res.status(201).json({ message: 'Quiz generated', quiz })
  } catch (error) {
    console.error('Quiz error:', error.message)
    res.status(500).json({ message: 'Failed to generate quiz: ' + error.message })
  }
}

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' })

    let correct = 0
    quiz.questions.forEach((q, i) => {
      q.userAnswer = answers[i]
      if (answers[i] === q.correct) correct++
    })

    quiz.score = Math.round((correct / quiz.questions.length) * 100)
    quiz.completed = true
    await quiz.save()

    res.json({
      message: 'Quiz submitted',
      quiz,
      correct,
      total: quiz.questions.length,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json({ quizzes })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}