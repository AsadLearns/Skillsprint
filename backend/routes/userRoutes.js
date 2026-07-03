import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getDashboard,
  updateProgress,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboard);

router.put("/progress", protect, updateProgress);

export default router;