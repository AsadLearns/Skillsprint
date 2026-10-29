import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Roadmap from '../models/roadmap.js'
import Quiz from '../models/quiz.js'
import dotenv from 'dotenv'
import { sendOTPEmail } from '../utils/emailService.js'
dotenv.config()

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please fill all fields',
      })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        message: 'Email already registered',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'Account created successfully',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please fill all fields',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
      })
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getMe = async (req, res) => {
  res.json({
    user: req.user,
  })
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Email address is required' })
    }

    const cleanEmail = email.trim().toLowerCase()
    const user = await User.findOne({ email: cleanEmail })
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email address' })
    }

    // Generate a secure 6-digit random OTP
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString()

    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000 // 15 minutes validity

    await user.save()

    // Send the OTP via email
    const emailResult = await sendOTPEmail(user.email, resetToken, user.name)

    const responsePayload = {
      message: `A 6-digit verification code has been sent to ${user.email}.`,
      email: user.email,
    }

    // If running in development or simulated mode without configured SMTP, attach preview info
    if (emailResult.previewUrl) {
      responsePayload.previewUrl = emailResult.previewUrl
    }
    if (emailResult.simulated || process.env.NODE_ENV !== 'production') {
      responsePayload.demoToken = resetToken
    }

    res.status(200).json(responsePayload)
  } catch (error) {
    console.error('❌ [authController] forgotPassword error:', error)
    res.status(500).json({ message: error.message || 'Failed to process password reset request' })
  }
}

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, token } = req.body
    const code = (otp || token || '').trim()

    if (!code) {
      return res.status(400).json({ message: 'Verification code is required' })
    }

    const query = {
      resetPasswordToken: code,
      resetPasswordExpires: { $gt: Date.now() },
    }

    if (email) {
      query.email = email.trim().toLowerCase()
    }

    const user = await User.findOne(query)

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code. Please request a new code.' })
    }

    res.status(200).json({
      message: 'Code verified successfully! You may now set your new password.',
      verified: true,
      email: user.email,
    })
  } catch (error) {
    console.error('❌ [authController] verifyOTP error:', error)
    res.status(500).json({ message: error.message || 'Failed to verify code' })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, token, newPassword } = req.body
    const code = (otp || token || '').trim()

    if (!code || !newPassword) {
      return res.status(400).json({ message: 'Verification code and new password are required' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' })
    }

    const query = {
      resetPasswordToken: code,
      resetPasswordExpires: { $gt: Date.now() },
    }

    if (email) {
      query.email = email.trim().toLowerCase()
    }

    const user = await User.findOne(query)

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code. Please request a new one.' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    user.resetPasswordToken = null
    user.resetPasswordExpires = null

    await user.save()

    res.status(200).json({ message: 'Password reset successfully! You can now log in.' })
  } catch (error) {
    console.error('❌ [authController] resetPassword error:', error)
    res.status(500).json({ message: error.message || 'Failed to reset password' })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id
    const { name, bio, title, linkedin, github } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (name) user.name = name
    if (bio !== undefined) user.bio = bio
    if (title !== undefined) user.title = title
    if (linkedin !== undefined) user.linkedin = linkedin
    if (github !== undefined) user.github = github

    await user.save()

    // Sign new token to keep session valid
    const jwtSecret = process.env.JWT_SECRET || 'fallbacksecret'
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' })

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        title: user.title,
        linkedin: user.linkedin,
        github: user.github,
        streak: user.streak,
        quizScore: user.quizScore,
        currentSkill: user.currentSkill,
        token
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * DPDP Act 2023 Section 12 & CCPA Compliance:
 * Right to erasure ("Right to be Forgotten") - allows user to permanently delete their account and associated data.
 */
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User account not found' })
    }

    // Permanently wipe user account, generated roadmaps, and quiz records
    await Promise.all([
      User.findByIdAndDelete(userId),
      Roadmap.deleteMany({ userId }),
      Quiz.deleteMany({ userId }),
    ])

    res.status(200).json({
      message: 'Your account and personal data have been permanently erased in compliance with the DPDP Act 2023.',
    })
  } catch (error) {
    console.error('❌ [authController] deleteAccount error:', error)
    res.status(500).json({ message: error.message || 'Failed to erase account data' })
  }
}