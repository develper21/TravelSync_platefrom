import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  travelers: {
    type: Number,
    required: true,
    default: 1,
  },
  description: {
    type: String,
  },
  activities: [{
    day: Number,
    activity: String,
    time: String,
    location: String,
  }],
  status: {
    type: String,
    enum: ['planning', 'confirmed', 'completed', 'cancelled'],
    default: 'planning',
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

tripSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
