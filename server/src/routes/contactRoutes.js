import express from 'express';
import { submitContactMessage, getContactMessages } from '../controllers/contactController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/', requireAuth, getContactMessages);

export default router;
