import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import User from '../models/User.js'
import { sendAnnouncementEmail } from './emailService.js'

/**
 * Script to safely send an announcement / outreach email to registered users.
 * Usage:
 *   node backend/utils/sendBroadcast.js --dry-run
 *   node backend/utils/sendBroadcast.js --send --subject "New Spring Milestone Drills" --limit 50
 */
async function runBroadcast() {
  const args = process.argv.slice(2)
  const isDryRun = args.includes('--dry-run')
  const shouldSend = args.includes('--send')

  const subjectIndex = args.indexOf('--subject')
  const subject = subjectIndex !== -1 ? args[subjectIndex + 1] : '🚀 New Engineering Milestones on SkillSprint'

  const limitIndex = args.indexOf('--limit')
  const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1], 10) : 100

  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not set in environment.')
    process.exit(1)
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB Atlas')

    const users = await User.find({}, 'name email createdAt').limit(limit)
    console.log(`📊 Found ${users.length} registered users (Limit: ${limit})`)

    if (users.length === 0) {
      console.log('No users found.')
      return
    }

    if (isDryRun || !shouldSend) {
      console.log('\n--- 📋 DRY RUN MODE (No emails will be sent) ---')
      console.log('Subject:', subject)
      console.log('Recipients sample:')
      users.slice(0, 5).forEach((u, i) => {
        console.log(`  ${i + 1}. ${u.name} <${u.email}>`)
      })
      console.log(`\nTo actually send to these users, execute:`)
      console.log(`node backend/utils/sendBroadcast.js --send --subject "${subject}" --limit ${limit}`)
      return
    }

    console.log(`\n🚀 Starting safe outreach dispatch with 600ms rate limiting...`)
    let sentCount = 0
    let failedCount = 0

    for (const user of users) {
      try {
        console.log(`📨 Sending to: ${user.name} <${user.email}>...`)
        const result = await sendAnnouncementEmail({
          to: user.email,
          name: user.name,
          subject,
          headline: 'Level Up Your Engineering Skills on SkillSprint',
          bodyContent: `
            <p>We've recently upgraded SkillSprint with new hands-on production milestone roadmaps, active scenario quizzes, and incident war rooms.</p>
            <p>Log in today to continue your learning sprint, tackle new practice scenarios, and verify your engineering competencies.</p>
          `,
          ctaText: 'Resume My Sprint',
          ctaLink: 'https://skillsprint-navy.vercel.app/dashboard',
        })

        if (result.success) {
          sentCount++
        } else {
          failedCount++
        }

        // Throttle to prevent hitting provider rate limits and avoid spam flags
        await new Promise((resolve) => setTimeout(resolve, 600))
      } catch (err) {
        console.error(`❌ Failed sending to ${user.email}:`, err.message)
        failedCount++
      }
    }

    console.log('\n=============================================')
    console.log(`🏁 Dispatch completed! Sent: ${sentCount}, Failed: ${failedCount}`)
    console.log('=============================================')
  } catch (err) {
    console.error('Error during broadcast:', err.message)
  } finally {
    await mongoose.disconnect()
  }
}

runBroadcast()
