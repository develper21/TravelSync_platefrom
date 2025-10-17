import express from 'express';
import {
  getUserTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  getTripStats,
} from '../controllers/tripsController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(requireAuth);

// GET /api/trips - Get all user trips
router.get('/', getUserTrips);

// GET /api/trips/stats - Get trip statistics
router.get('/stats', getTripStats);

// GET /api/trips/:id - Get specific trip
router.get('/:id', getTrip);

// POST /api/trips - Create new trip
router.post('/', createTrip);

// PUT /api/trips/:id - Update trip
router.put('/:id', updateTrip);

// DELETE /api/trips/:id - Delete trip
router.delete('/:id', deleteTrip);

export default router;
