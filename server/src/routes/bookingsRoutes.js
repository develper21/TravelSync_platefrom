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

// Apply authentication middleware to all routes
router.use(requireAuth);

// GET /api/bookings - Get all user bookings
router.get('/', getUserBookings);

// GET /api/bookings/stats - Get booking statistics
router.get('/stats', getBookingStats);

// GET /api/bookings/:id - Get specific booking
router.get('/:id', getBooking);

// POST /api/bookings - Create new booking
router.post('/', createBooking);

// PUT /api/bookings/:id - Update booking
router.put('/:id', updateBooking);

// POST /api/bookings/:id/cancel - Cancel booking
router.post('/:id/cancel', cancelBooking);

export default router;
