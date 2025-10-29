import express from 'express';
import {
  getUserBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  getBookingStats,
} from '../controllers/bookingsController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();
router.use(requireAuth);
router.get('/', getUserBookings);
router.get('/stats', getBookingStats);
router.get('/:id', getBooking);
router.post('/', createBooking);
router.put('/:id', updateBooking);
router.post('/:id/cancel', cancelBooking);

export default router;
