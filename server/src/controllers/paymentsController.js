import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';

export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('bookingId')
      .populate('tripId', 'title destination');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('bookingId')
      .populate('tripId', 'title destination');

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const txnId = 'TXN_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    const paymentData = {
      ...req.body,
      userId: req.user.id,
      transactionId: txnId,
      status: req.body.status || 'completed',
    };

    const payment = new Payment(paymentData);
    await payment.save();

    // If linked to a booking, update booking status to confirmed
    if (payment.bookingId) {
      await Booking.findByIdAndUpdate(payment.bookingId, {
        paymentStatus: 'Paid',
        status: 'confirmed'
      });
    }

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const processPayment = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (status === 'completed' && payment.bookingId) {
      await Booking.findByIdAndUpdate(payment.bookingId, {
        paymentStatus: 'Paid',
        status: 'confirmed'
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPaymentStats = async (req, res) => {
  try {
    const stats = await Payment.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalPayments: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          completedPayments: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'completed'] },
                1,
                0
              ]
            }
          },
          pendingPayments: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'pending'] },
                1,
                0
              ]
            }
          },
        },
      },
    ]);

    res.json(stats[0] || {
      totalPayments: 0,
      totalAmount: 0,
      completedPayments: 0,
      pendingPayments: 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const paymentWebhook = async (req, res) => {
  try {
    // Webhook receiver for payment gateways (Stripe / Razorpay)
    const event = req.body;
    console.log('Payment Webhook received event:', event?.type || 'sandbox_event');
    res.status(200).json({ received: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
