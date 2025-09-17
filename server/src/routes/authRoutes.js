import express from 'express';
import { signup, signin, verifyOTP } from '../controllers/authController.js';

const router = express.Router();

// Route for user signup
router.post('/signup', signup);

// Route for user signin
router.post('/signin', signin);

// Route for OTP verification
router.post('/verify-otp', verifyOTP);

export default router;