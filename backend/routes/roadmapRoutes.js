import express from 'express'
import {
  generateRoadmap,
  getRoadmaps,
  getRoadmapById,
  completeWeek,
  deleteRoadmap,
  getOrCreateStudyContent,
} from '../controllers/roadmapController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.post('/generate', generateRoadmap)
router.get('/', getRoadmaps)
router.get('/:id', getRoadmapById)
router.get('/:id/weeks/:weekNumber/study', getOrCreateStudyContent)
router.put('/:id/complete-week', completeWeek)
router.delete('/:id', deleteRoadmap)

export default router