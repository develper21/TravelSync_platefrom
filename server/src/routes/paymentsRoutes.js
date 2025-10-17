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

// Apply authentication middleware to all routes
router.use(requireAuth);

// GET /api/payments - Get all user payments
router.get('/', getUserPayments);

// GET /api/payments/stats - Get payment statistics
router.get('/stats', getPaymentStats);

// GET /api/payments/:id - Get specific payment
router.get('/:id', getPayment);

// POST /api/payments - Create new payment
router.post('/', createPayment);

// POST /api/payments/process - Process payment (webhook)
router.post('/process', processPayment);

export default router;
