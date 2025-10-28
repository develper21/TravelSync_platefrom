import express from 'express';
import {
  getUserPayments,
  getPayment,
  createPayment,
  processPayment,
  getPaymentStats,
} from '../controllers/paymentsController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();
router.use(requireAuth);
router.get('/', getUserPayments);
router.get('/stats', getPaymentStats);
router.get('/:id', getPayment);
router.post('/', createPayment);
router.post('/process', processPayment);

export default router;
