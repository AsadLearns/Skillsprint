import Roadmap from '../models/roadmap.js'
import User from '../models/User.js'
import { askOpenRouterWithFallback, cleanAndParseJSON } from '../utils/aiService.js'

export const generateRoadmap = async (req, res) => {
  try {
    const { skill, level, duration } = req.body
    const userId = req.user._id

    if (!skill || !level) {
      return res.status(400).json({ message: 'Skill and level are required' })
    }


    const prompt = `Create a ${duration || 8}-week learning roadmap for ${skill} at ${level} level.
Return ONLY a valid JSON array with exactly ${duration || 8} objects.
Ensure you separate each week object in the array with a comma (e.g. [{...}, {...}, {...}]).
No markdown, no backticks, no explanation, no extra text at all.
Start your response with [ and end with ]
Each object must have exactly these fields:
- week: number
- topic: short string max 5 words
- description: exactly 2 sentences
- resources: array of exactly 2 strings
Example:
[{"week":1,"topic":"HTML Fundamentals","description":"Learn the building blocks of web pages. Cover tags, attributes, and semantic HTML.","resources":["MDN Web Docs - HTML","freeCodeCamp HTML Course"]}]`

    const content = await askOpenRouterWithFallback(prompt)
    const weeks = cleanAndParseJSON(content)

    const roadmap = await Roadmap.create({
      userId,
      skill,
      level,
      duration: duration || 8,
      weeks,
      progress: 0,
    })

    await User.findByIdAndUpdate(userId, { currentSkill: skill, level })
    res.status(201).json({ message: 'Roadmap generated successfully', roadmap })
  } catch (error) {
    console.error('Roadmap error:', error.message)
    res.status(500).json({ message: 'Failed to generate roadmap: ' + error.message })
  }
}

export const getRoadmaps = async (req, res) => {
  try {
    const userId = req.user._id
    const roadmaps = await Roadmap.find({ userId }).sort({ createdAt: -1 })
    res.status(200).json({ roadmaps })
  } catch (error) {
    console.error('Get roadmaps error:', error.message)
    res.status(500).json({ message: 'Failed to fetch roadmaps: ' + error.message })
  }
}

export const getRoadmapById = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user._id
    const roadmap = await Roadmap.findOne({ _id: id, userId })
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' })
    }
    res.status(200).json({ roadmap })
  } catch (error) {
    console.error('Get roadmap by id error:', error.message)
    res.status(500).json({ message: 'Failed to fetch roadmap: ' + error.message })
  }
}

export const deleteRoadmap = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user._id
    const roadmap = await Roadmap.findOneAndDelete({ _id: id, userId })
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' })
    }
    res.status(200).json({ message: 'Roadmap deleted successfully' })
  } catch (error) {
    console.error('Delete roadmap error:', error.message)
    res.status(500).json({ message: 'Failed to delete roadmap: ' + error.message })
  }
}

export const completeWeek = async (req, res) => {
  try {
    const { id } = req.params
    const { weekNumber } = req.body
    const userId = req.user._id

    const roadmap = await Roadmap.findOne({ _id: id, userId })
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' })
    }

    const week = roadmap.weeks.find(w => w.week === Number(weekNumber))
    if (!week) {
      return res.status(404).json({ message: 'Week not found in roadmap' })
    }

    week.completed = true

    // Calculate progress
    const completedWeeks = roadmap.weeks.filter(w => w.completed).length
    roadmap.progress = Math.round((completedWeeks / roadmap.weeks.length) * 100)

    await roadmap.save()

    res.status(200).json({ message: 'Week marked as completed', roadmap })
  } catch (error) {
    console.error('Complete week error:', error.message)
    res.status(500).json({ message: 'Failed to complete week: ' + error.message })
  }
}

export const getOrCreateStudyContent = async (req, res) => {
  try {
    const { id, weekNumber } = req.params
    const userId = req.user._id

    const roadmap = await Roadmap.findOne({ _id: id, userId })
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' })
    }

    const week = roadmap.weeks.find(w => w.week === Number(weekNumber))
    if (!week) {
      return res.status(404).json({ message: 'Week not found in roadmap' })
    }

    if (week.studyContent) {
      return res.status(200).json({ studyContent: week.studyContent })
    }

    const prompt = `Create a concise, high-quality study guide for learning:
Skill: ${roadmap.skill}
Level: ${roadmap.level}
Week ${weekNumber} Topic: ${week.topic}
Description: ${week.description}

Structure the response using clean Markdown with the following sections:
1. 📖 Core Concept: Clear, simple, and brief explanation (2-3 paragraphs).
2. 💻 Code Example: A short, focused, well-commented code snippet.
3. 🔑 Key Takeaways: 3-4 bullet points of the most important facts.
4. 🛠️ Practice Task: A quick practical challenge.
5. 🎥 Video Resources: Suggest 2 relevant video searches with markdown links using YouTube search queries like '[Watch: Search Term Tutorial](https://www.youtube.com/results?search_query=...)' where search_query is URL-encoded.

Return ONLY the markdown text. Keep the entire response focused and under 450 words so it generates quickly. Do not wrap in a json block.`

    console.log(`Generating study guide for ${roadmap.skill} Week ${weekNumber}...`)
    const studyContent = await askOpenRouterWithFallback(prompt)

    week.studyContent = studyContent
    roadmap.markModified('weeks')
    await roadmap.save()

    res.status(200).json({ studyContent })
  } catch (error) {
    console.error('Study guide error:', error.message)
    res.status(500).json({ message: 'Failed to generate study guide: ' + error.message })
  }
}

