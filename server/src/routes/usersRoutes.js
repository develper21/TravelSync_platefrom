import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteAccount,
  getPreferences,
  updatePreferences,
} from '../controllers/usersController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(requireAuth);

// GET /api/users/profile - Get user profile
router.get('/profile', getProfile);

// PUT /api/users/profile - Update user profile
router.put('/profile', updateProfile);

// DELETE /api/users/profile - Delete user account
router.delete('/profile', deleteAccount);

// GET /api/users/preferences - Get user preferences
router.get('/preferences', getPreferences);

// PUT /api/users/preferences - Update user preferences
router.put('/preferences', updatePreferences);

export default router;
