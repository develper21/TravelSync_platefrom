import express from 'express';
import {
  getHotels,
  getHotel,
  searchHotels,
  getEcoFriendlyHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from '../controllers/hotelsController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getHotels);
router.get('/search', searchHotels);
router.get('/eco-friendly', getEcoFriendlyHotels);
router.get('/:id', getHotel);

// Protected routes (admin only - for now, just require auth)
router.post('/', requireAuth, createHotel);
router.put('/:id', requireAuth, updateHotel);
router.delete('/:id', requireAuth, deleteHotel);

export default router;
