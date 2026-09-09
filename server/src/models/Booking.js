import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
  },
  type: {
    type: String,
    enum: ['hotel', 'flight', 'activity', 'package', 'trip'],
    default: 'package',
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
  },
  checkOutDate: {
    type: Date,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Paid',
  },
  paymentMethod: {
    type: String,
    default: 'Card',
  },
  paymentResponse: {
    type: mongoose.Schema.Types.Mixed,
  },
  bookingReference: {
    type: String,
    unique: true,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

bookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  if (!this.amount && this.price) {
    this.amount = this.price;
  }
  if (!this.bookingReference) {
    this.bookingReference = 'TS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
