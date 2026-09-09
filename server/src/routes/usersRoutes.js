import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteAccount,
  getPreferences,
  updatePreferences,
  getSavedDestinations,
  saveDestination,
  removeSavedDestination,
  addPaymentMethod,
  deletePaymentMethod
} from '../controllers/usersController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

router.use(requireAuth);

// Profile
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteAccount);

// Preferences
router.get('/preferences', getPreferences);
router.put('/preferences', updatePreferences);

// Saved Destinations (Wishlist)
router.get('/saved-destinations', getSavedDestinations);
router.post('/save-destination/:id', saveDestination);
router.delete('/remove-destination/:id', removeSavedDestination);

// Payment Methods
router.post('/payment-methods', addPaymentMethod);
router.delete('/payment-methods/:id', deletePaymentMethod);

export default router;
