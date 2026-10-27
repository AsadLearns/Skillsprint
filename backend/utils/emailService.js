import nodemailer from 'nodemailer'

/**
 * Creates and returns a nodemailer transporter.
 * Supports:
 * 1. Custom SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
 * 2. Gmail / Service (EMAIL_USER, EMAIL_PASS)
 * 3. Ethereal Test Account fallback if no credentials are provided
 */
const createTransporter = async () => {
  // Option 1: Custom SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  // Option 2: Gmail or standard email provider
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const isGmail = process.env.EMAIL_USER.includes('@gmail.com')
    if (isGmail) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // App password
        },
      })
    }
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  }

  // Option 3: Fallback test account (Ethereal) for development/demo
  console.warn('⚠️ [EmailService] No SMTP credentials found (EMAIL_USER/EMAIL_PASS). Creating Ethereal test mailer...')
  try {
    const testAccount = await nodemailer.createTestAccount()
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
  } catch (err) {
    console.error('❌ [EmailService] Failed to create test account:', err.message)
    return null
  }
}

/**
 * Sends a password reset OTP verification email.
 * @param {string} to - Recipient email
 * @param {string} otp - 6-digit OTP code
 * @param {string} name - User's name
 * @returns {Promise<{success: boolean, previewUrl?: string, error?: string}>}
 */
export const sendOTPEmail = async (to, otp, name = 'Learner') => {
  try {
    const transporter = await createTransporter()

    if (!transporter) {
      console.log(`\n======================================================`)
      console.log(`🔑 [MOCK OTP DISPATCH]`)
      console.log(`To: ${to}`)
      console.log(`OTP Code: ${otp}`)
      console.log(`======================================================\n`)
      return { success: true, simulated: true }
    }

    const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER || '"SkillSprint Security" <security@skillsprint.app>'

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="540" cellpadding="0" cellspacing="0" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 32px 30px; text-align: center;">
                    <div style="font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">
                      Skill<span style="color: #818cf8; font-style: italic;">Sprint</span>
                    </div>
                    <div style="color: #c7d2fe; font-size: 13px; font-weight: 500; margin-top: 6px; letter-spacing: 0.5px;">
                      AUTONOMOUS ENGINEERING & SRE READINESS
                    </div>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 36px 32px;">
                    <h1 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0;">
                      Password Reset Verification
                    </h1>
                    <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
                      Hello <strong>${name}</strong>,
                    </p>
                    <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
                      We received a request to reset your password for your SkillSprint account. Please enter the 6-digit verification code below to verify your identity and set a new password:
                    </p>

                    <!-- OTP Box -->
                    <div style="background-color: #f8fafc; border: 2px dashed #4f46e5; border-radius: 12px; padding: 22px; text-align: center; margin: 28px 0;">
                      <div style="font-size: 12px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                        Your One-Time Password (OTP)
                      </div>
                      <div style="font-size: 36px; font-weight: 800; color: #1e1b4b; letter-spacing: 10px; font-family: 'Courier New', Courier, monospace;">
                        ${otp}
                      </div>
                    </div>

                    <!-- Expiry & Security Notice -->
                    <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 6px; padding: 12px 16px; margin-bottom: 24px;">
                      <p style="margin: 0; font-size: 13px; color: #991b1b; line-height: 1.5;">
                        ⏳ <strong>Expires in 15 minutes:</strong> This code can only be used once. If you did not request this reset, your account is safe and you can safely ignore this email.
                      </p>
                    </div>

                    <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0;">
                      Need help? Feel free to contact our support team.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                      &copy; ${new Date().getFullYear()} SkillSprint. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    const mailOptions = {
      from: fromAddress,
      to,
      subject: `SkillSprint Verification Code: ${otp}`,
      text: `Hello ${name},\n\nYour SkillSprint password reset verification code is: ${otp}\n\nThis code will expire in 15 minutes.\nIf you did not request this reset, please ignore this email.`,
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ [EmailService] OTP email sent successfully to ${to}. MessageId: ${info.messageId}`)

    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log(`🔗 [EmailService] Preview URL (Ethereal): ${previewUrl}`)
    }

    return { success: true, messageId: info.messageId, previewUrl }
  } catch (error) {
    console.error('❌ [EmailService] Error sending email:', error.message)
    // Fallback: log code to console so user can still test in offline mode
    console.log(`\n======================================================`)
    console.log(`🔑 [EMERGENCY CONSOLE FALLBACK]`)
    console.log(`To: ${to}`)
    console.log(`OTP Code: ${otp}`)
    console.log(`======================================================\n`)
    return { success: false, error: error.message }
  }
}
