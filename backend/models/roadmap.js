import mongoose from 'mongoose'

const weekSchema = new mongoose.Schema({
  week: Number,
  topic: String,
  description: String,
  resources: [String],
  completed: { type: Boolean, default: false },
  studyContent: { type: String, default: "" },
})

const roadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skill: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: Number, default: 8 },
  weeks: [weekSchema],
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Roadmap', roadmapSchema)