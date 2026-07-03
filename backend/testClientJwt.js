import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Roadmap from './models/roadmap.js';

dotenv.config();

const runTest = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find roadmap
    const roadmapId = '6a4753edcfebb5181e8f1329';
    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) {
      console.error("Roadmap not found");
      return;
    }
    
    const userId = roadmap.userId.toString();
    console.log("Roadmap owner userId:", userId);
    
    // Sign token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log("Token signed:", token);
    
    await mongoose.disconnect();
    
    // Now request study content for Week 1
    const weekNumber = 1;
    console.log(`Fetching study content for Week ${weekNumber}...`);
    const start = Date.now();
    const response = await fetch(`http://localhost:8000/api/roadmap/${roadmapId}/weeks/${weekNumber}/study`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resData = await response.json();
    const end = Date.now();
    
    console.log(`Response received in ${end - start}ms`);
    console.log("Response status:", response.status);
    console.log(`Study Content Length: ${resData.studyContent?.length}`);
    console.log("First 200 characters:");
    console.log(resData.studyContent?.substring(0, 200));
  } catch (err) {
    console.error("Client test error:", err.response?.data || err.message);
  }
};

runTest();
