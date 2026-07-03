import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Roadmap from './models/roadmap.js';
import Quiz from './models/quiz.js';

dotenv.config();

const printReport = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const users = await User.find({});
    console.log(`=== MONGODB ATLAS USER PROGRESS REPORT ===\n`);
    console.log(`Total Users Registered: ${users.length}\n`);
    
    for (const user of users) {
      console.log(`--------------------------------------------------`);
      console.log(`👤 User Name: ${user.name}`);
      console.log(`✉️ Email: ${user.email}`);
      console.log(`🆔 ID: ${user._id}`);
      
      // Get roadmaps for this user
      const roadmaps = await Roadmap.find({ userId: user._id });
      console.log(`\n📚 Active Roadmaps/Courses (${roadmaps.length}):`);
      
      if (roadmaps.length === 0) {
        console.log(`  No roadmaps created yet.`);
      } else {
        roadmaps.forEach((rm, index) => {
          console.log(`  ${index + 1}. [Roadmap ID: ${rm._id}]`);
          console.log(`     Skill: ${rm.skill} (${rm.level})`);
          console.log(`     Duration: ${rm.duration} weeks`);
          console.log(`     Progress: ${rm.progress}%`);
          console.log(`     Created At: ${rm.createdAt}`);
          console.log(`     Timeline Milestones:`);
          rm.weeks.forEach(w => {
            const status = w.completed ? '✅ COMPLETED' : '❌ PENDING';
            console.log(`       * Week ${w.week}: ${w.topic} [${status}]`);
          });
        });
      }
      
      // Get quizzes for this user
      const quizzes = await Quiz.find({ userId: user._id });
      console.log(`\n🧠 Quizzes Taken (${quizzes.length}):`);
      if (quizzes.length === 0) {
        console.log(`  No quizzes taken yet.`);
      } else {
        quizzes.forEach((q, index) => {
          const status = q.completed ? 'Completed' : 'Draft';
          console.log(`  ${index + 1}. Skill: ${q.skill} | Topic: ${q.topic}`);
          console.log(`     Score: ${q.score}% | Status: ${status}`);
        });
      }
      console.log(`--------------------------------------------------\n`);
    }
  } catch (err) {
    console.error("Error generating Atlas report:", err.message);
  } finally {
    await mongoose.disconnect();
  }
};

printReport();
