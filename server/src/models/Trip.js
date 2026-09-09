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
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  travelers: {
    type: Number,
    required: true,
    default: 1,
  },
  budget: {
    type: Number,
    default: 0,
  },
  estimatedCost: {
    type: Number,
    default: 0,
  },
  selectedHotel: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  selectedActivities: [{
    type: mongoose.Schema.Types.Mixed,
  }],
  activities: [{
    day: Number,
    activity: String,
    time: String,
    location: String,
    price: Number,
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String],
  }],
  notes: {
    type: String,
    default: '',
  },
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
