import express from "express";
import { generateRoadmap } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", generateRoadmap);

export default router;