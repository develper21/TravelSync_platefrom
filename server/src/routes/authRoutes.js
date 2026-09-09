import express from 'express';
import { signup, signin, verifyOTP, changePassword, logout } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/register', signup);
router.post('/signin', signin);
router.post('/login', signin);
router.post('/verify-otp', verifyOTP);
router.post('/logout', logout);
router.put('/password', requireAuth, changePassword);

export default router;