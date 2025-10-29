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

router.use(requireAuth);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteAccount);
router.get('/preferences', getPreferences);
router.put('/preferences', updatePreferences);

export default router;
