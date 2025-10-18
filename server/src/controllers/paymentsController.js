import Payment from '../models/Payment.js';

// Get all payments for a user
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('bookingId', 'title location')
      .populate('tripId', 'title destination');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific payment
export const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('bookingId', 'title location')
      .populate('tripId', 'title destination');

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const paymentData = {
      ...req.body,
      userId: req.user.id,
      status: 'pending',
    };

    const payment = new Payment(paymentData);

    // Simulate payment processing
    setTimeout(async () => {
      try {
        payment.status = 'completed';
        await payment.save();
      } catch (error) {
        console.error('Payment processing error:', error);
      }
    }, 2000);

    await payment.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Process payment (webhook simulation)
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

    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get payment statistics
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
          failedPayments: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'failed'] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    res.json(stats[0] || {
      totalPayments: 0,
      totalAmount: 0,
      completedPayments: 0,
      pendingPayments: 0,
      failedPayments: 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
