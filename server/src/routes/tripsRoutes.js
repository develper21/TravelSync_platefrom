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

router.use(requireAuth);
router.get('/', getUserTrips);
router.get('/stats', getTripStats);
router.get('/:id', getTrip);
router.post('/', createTrip);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

export default router;
