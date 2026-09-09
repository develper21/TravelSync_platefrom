import express from 'express';
import {
  getUserPayments,
  getPayment,
  createPayment,
  processPayment,
  getPaymentStats,
  paymentWebhook
} from '../controllers/paymentsController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

// Webhook endpoint (unauthenticated for payment provider callback)
router.post('/webhook', paymentWebhook);

// Protected routes
router.get('/', requireAuth, getUserPayments);
router.get('/stats', requireAuth, getPaymentStats);
router.get('/:id', requireAuth, getPayment);
router.post('/', requireAuth, createPayment);
router.post('/process', requireAuth, processPayment);

export default router;
