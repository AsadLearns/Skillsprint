import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct: Number,
  userAnswer: { type: Number, default: -1 },
})

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: { type: String, required: true },
  topic: { type: String, required: true },
  questions: [questionSchema],
  score: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Quiz', quizSchema)