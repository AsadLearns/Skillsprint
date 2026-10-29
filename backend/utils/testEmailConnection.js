import dotenv from 'dotenv'
dotenv.config()
import { verifyEmailConnection, sendOTPEmail } from './emailService.js'

async function runTest() {
  console.log('--- 🧪 SkillSprint Official Email Diagnostics ---')
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? process.env.EMAIL_USER : '(not set)')
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '******** (set)' : '(not set)')
  console.log('SMTP_HOST:', process.env.SMTP_HOST || 'default (gmail / smtp.gmail.com)')
  console.log('SMTP_PORT:', process.env.SMTP_PORT || '587')
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM || '(auto-generated from user)')
  console.log('--------------------------------------------------')

  const result = await verifyEmailConnection()
  if (result.connected) {
    console.log(`\n🎉 Connection Successful! Official email is ready: ${result.user}`)
    const testTo = process.argv[2]
    if (testTo) {
      console.log(`Sending sample OTP verification email to: ${testTo}...`)
      const res = await sendOTPEmail(testTo, '849201', 'Test Engineer')
      console.log('Dispatch result:', res)
    } else {
      console.log('💡 Tip: Run `node backend/utils/testEmailConnection.js your-email@gmail.com` to send a live test email.')
    }
  } else {
    console.log('\n⚠️ SMTP Credentials not connected or failed verification.')
    console.log('Reason:', result.error)
    console.log('\n📖 To connect your official email:')
    console.log('1. For Gmail: Set EMAIL_USER to your address, and EMAIL_PASS to a 16-character Google App Password.')
    console.log('2. For Custom Domain: Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and EMAIL_FROM.')
    console.log('3. In production, add these variables in your Render Dashboard (Environment settings).')
  }
}

runTest()
