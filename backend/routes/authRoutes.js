import express from 'express'

import {
  register,
  login,
  getMe,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateProfile,
  deleteAccount,
} from '../controllers/authController.js'

import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/forgot-password', forgotPassword)

router.post('/verify-otp', verifyOTP)

router.post('/reset-password', resetPassword)

router.get('/me', protect, getMe)

router.put('/update-profile', protect, updateProfile)

router.delete('/delete-account', protect, deleteAccount)

export default router