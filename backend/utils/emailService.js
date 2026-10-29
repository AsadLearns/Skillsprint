import nodemailer from 'nodemailer'

/**
 * Creates and returns a nodemailer transporter.
 * Supports:
 * 1. Custom SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
 * 2. Gmail / Google Workspace (EMAIL_USER, EMAIL_PASS - 16 character App Password)
 * 3. Ethereal Test Account fallback if no credentials are configured
 */
const createTransporter = async () => {
  // Option 1: Custom SMTP (SendGrid, Resend, Brevo, AWS SES, or Custom Mailserver)
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
    const isGmail = process.env.EMAIL_USER.toLowerCase().includes('@gmail.com')
    if (isGmail) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // 16-character Google App Password
        },
      })
    }
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
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
 * Verifies if the email transporter can connect with the configured official email credentials.
 * @returns {Promise<{connected: boolean, user?: string, host?: string, error?: string}>}
 */
export const verifyEmailConnection = async () => {
  try {
    const transporter = await createTransporter()
    if (!transporter) {
      return { connected: false, error: 'No transporter available' }
    }
    await transporter.verify()
    const user = process.env.EMAIL_USER || process.env.SMTP_USER || 'Simulated Test Account'
    console.log(`✅ [EmailService] Transporter verified successfully for official email: ${user}`)
    return { connected: true, user }
  } catch (error) {
    console.error('❌ [EmailService] Verification failed:', error.message)
    return { connected: false, error: error.message }
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

    const officialEmail = process.env.EMAIL_USER || process.env.SMTP_USER || 'security@skillsprint.app'
    const fromAddress = process.env.EMAIL_FROM || `"SkillSprint Security" <${officialEmail}>`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="540" cellpadding="0" cellspacing="0" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 32px 30px; text-align: center;">
                    <div style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">
                      Skill<span style="color: #818cf8; font-style: italic;">Sprint</span>
                    </div>
                    <div style="color: #94a3b8; font-size: 11px; font-weight: 600; margin-top: 6px; letter-spacing: 1px; text-transform: uppercase;">
                      Autonomous Engineering &amp; SRE Readiness
                    </div>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 36px 32px;">
                    <h1 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0;">
                      Password Reset Verification
                    </h1>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 18px 0;">
                      Hello <strong>${name}</strong>,
                    </p>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
                      We received a request to reset the password for your SkillSprint account. Please enter the 6-digit verification code below to verify your identity and set a new password:
                    </p>

                    <!-- OTP Box -->
                    <div style="background-color: #f8fafc; border: 2px dashed #4f46e5; border-radius: 12px; padding: 22px; text-align: center; margin: 24px 0;">
                      <div style="font-size: 11px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                        Your One-Time Password (OTP)
                      </div>
                      <div style="font-size: 36px; font-weight: 800; color: #1e1b4b; letter-spacing: 10px; font-family: 'Courier New', Courier, monospace;">
                        ${otp}
                      </div>
                    </div>

                    <!-- Expiry & Security Notice -->
                    <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 6px; padding: 12px 16px; margin-bottom: 24px;">
                      <p style="margin: 0; font-size: 13px; color: #991b1b; line-height: 1.5;">
                        ⏳ <strong>Expires in 15 minutes:</strong> This code can only be used once. If you did not request this reset, your account remains secure and you can safely ignore this email.
                      </p>
                    </div>

                    <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0;">
                      Need help? Reply directly to this email to reach our engineering support team.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                      &copy; ${new Date().getFullYear()} SkillSprint Platform · DPDP Act 2023 Compliant
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
      headers: {
        'X-Priority': '1', // High priority for transactional OTP
        'X-Entity-Ref-ID': `otp-${Date.now()}`,
      },
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ [EmailService] OTP email sent successfully to ${to}. MessageId: ${info.messageId}`)

    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log(`🔗 [EmailService] Preview URL (Ethereal): ${previewUrl}`)
    }

    return { success: true, messageId: info.messageId, previewUrl }
  } catch (error) {
    console.error('❌ [EmailService] Error sending OTP email:', error.message)
    console.log(`\n======================================================`)
    console.log(`🔑 [EMERGENCY CONSOLE FALLBACK]`)
    console.log(`To: ${to}`)
    console.log(`OTP Code: ${otp}`)
    console.log(`======================================================\n`)
    return { success: false, error: error.message }
  }
}

/**
 * Sends a welcome email upon user registration.
 * @param {string} to - Recipient email
 * @param {string} name - User's name
 */
export const sendWelcomeEmail = async (to, name = 'Learner') => {
  try {
    const transporter = await createTransporter()
    if (!transporter) return { success: false, simulated: true }

    const officialEmail = process.env.EMAIL_USER || process.env.SMTP_USER || 'support@skillsprint.app'
    const fromAddress = process.env.EMAIL_FROM || `"SkillSprint" <${officialEmail}>`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="540" cellpadding="0" cellspacing="0" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                <tr>
                  <td style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 32px 30px; text-align: center;">
                    <div style="font-size: 26px; font-weight: 900; color: #ffffff;">
                      Skill<span style="color: #818cf8; font-style: italic;">Sprint</span>
                    </div>
                    <div style="color: #94a3b8; font-size: 11px; font-weight: 600; margin-top: 6px; letter-spacing: 1px; text-transform: uppercase;">
                      Autonomous Engineering Readiness
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 36px 32px;">
                    <h1 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0;">
                      Welcome to SkillSprint, ${name}! 🚀
                    </h1>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 18px 0;">
                      Your engineer account has been successfully initialized. You're ready to break free from passive tutorials and start synthesizing verified production milestones.
                    </p>
                    <div style="background-color: #f1f5f9; border-radius: 12px; padding: 18px; margin: 24px 0;">
                      <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Quick Start Checklist:</div>
                      <ul style="font-size: 13px; color: #475569; margin: 0; padding-left: 20px; line-height: 1.6;">
                        <li>Generate your first AI-synthesized skill roadmap</li>
                        <li>Engage in interactive scenario milestone quizzes</li>
                        <li>Practice live outage drills inside the Incident War Room</li>
                      </ul>
                    </div>
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://skillsprint-navy.vercel.app/dashboard" style="display: inline-block; background-color: #4f46e5; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 10px; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);">
                        Launch Your Dashboard &rarr;
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                      &copy; ${new Date().getFullYear()} SkillSprint Platform. All rights reserved.
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
      subject: `Welcome to SkillSprint, ${name}! 🚀`,
      text: `Welcome to SkillSprint, ${name}!\n\nYour account has been initialized. Launch your dashboard at: https://skillsprint-navy.vercel.app/dashboard`,
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ [EmailService] Welcome email sent to ${to}. MessageId: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error('❌ [EmailService] Welcome email error:', err.message)
    return { success: false, error: err.message }
  }
}

/**
 * Sends an announcement or newsletter email to users with anti-spam and DPDP/CAN-SPAM compliance headers.
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.name - User name
 * @param {string} options.subject - Email subject line
 * @param {string} options.headline - Title inside email body
 * @param {string} options.bodyContent - HTML or text description
 * @param {string} [options.ctaText] - Call to action button text
 * @param {string} [options.ctaLink] - Call to action link URL
 */
export const sendAnnouncementEmail = async ({
  to,
  name = 'Learner',
  subject,
  headline,
  bodyContent,
  ctaText = 'Open SkillSprint',
  ctaLink = 'https://skillsprint-navy.vercel.app',
}) => {
  try {
    const transporter = await createTransporter()
    if (!transporter) return { success: false, simulated: true }

    const officialEmail = process.env.EMAIL_USER || process.env.SMTP_USER || 'announcements@skillsprint.app'
    const fromAddress = process.env.EMAIL_FROM || `"SkillSprint Engineering" <${officialEmail}>`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="540" cellpadding="0" cellspacing="0" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 30px; text-align: center;">
                    <div style="font-size: 24px; font-weight: 900; color: #ffffff;">
                      Skill<span style="color: #818cf8; font-style: italic;">Sprint</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 36px 32px;">
                    <h2 style="font-size: 19px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0;">
                      ${headline || subject}
                    </h2>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 16px 0;">
                      Hello <strong>${name}</strong>,
                    </p>
                    <div style="font-size: 14px; color: #334155; line-height: 1.7; margin: 0 0 24px 0;">
                      ${bodyContent}
                    </div>
                    ${
                      ctaLink
                        ? `
                    <div style="text-align: center; margin: 28px 0;">
                      <a href="${ctaLink}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 13px 26px; border-radius: 10px;">
                        ${ctaText} &rarr;
                      </a>
                    </div>
                    `
                        : ''
                    }
                  </td>
                </tr>
                <!-- Compliance & Unsubscribe Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 22px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="font-size: 11px; color: #94a3b8; line-height: 1.6; margin: 0 0 8px 0;">
                      You are receiving this email as a registered user of SkillSprint. To manage your communication preferences or opt-out, visit your <a href="https://skillsprint-navy.vercel.app/profile" style="color: #6366f1; text-decoration: underline;">Profile Settings</a>.
                    </p>
                    <p style="font-size: 11px; color: #94a3b8; margin: 0;">
                      &copy; ${new Date().getFullYear()} SkillSprint Platform · DPDP Act 2023 &amp; CAN-SPAM Compliant
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
      subject,
      text: `${subject}\n\nHello ${name},\n\n${bodyContent.replace(/<[^>]*>/g, '')}\n\nVisit: ${ctaLink}`,
      html: htmlContent,
      headers: {
        'List-Unsubscribe': `<https://skillsprint-navy.vercel.app/profile>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ [EmailService] Announcement email sent to ${to}. MessageId: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error('❌ [EmailService] Announcement email error:', err.message)
    return { success: false, error: err.message }
  }
}
