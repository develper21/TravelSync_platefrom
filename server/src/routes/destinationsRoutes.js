import express from 'express';
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  addReview
} from '../controllers/destinationsController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

router.get('/', getDestinations);
router.get('/:id', getDestinationById);
router.post('/', requireAuth, createDestination);
router.put('/:id', requireAuth, updateDestination);
router.delete('/:id', requireAuth, deleteDestination);
router.post('/:id/review', requireAuth, addReview);

export default router;
