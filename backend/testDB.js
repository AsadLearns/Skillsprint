import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Roadmap from './models/roadmap.js';
import User from './models/User.js';

dotenv.config();

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const users = await User.find({});
    console.log("Users:", users.map(u => u.email));
    
    const roadmaps = await Roadmap.find({}).sort({ createdAt: -1 });
    console.log("Found roadmaps:", roadmaps.length);
    for (const rm of roadmaps) {
      console.log(`- Roadmap ID: ${rm._id}, Skill: ${rm.skill}, Weeks: ${rm.weeks.length}`);
      for (const w of rm.weeks) {
        console.log(`  Week ${w.week}: ${w.topic}, Study content length: ${w.studyContent ? w.studyContent.length : 0}`);
      }
    }
  } catch (err) {
    console.error("DB error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
};

checkDB();
