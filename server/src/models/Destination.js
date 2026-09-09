import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  tags: [{
    type: String,
    trim: true
  }],
  type: {
    type: String,
    default: 'Popular'
  },
  ecoFriendly: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 4.8,
    min: 0,
    max: 5
  },
  experiences: [{
    type: String
  }],
  highlights: [{
    type: String
  }],
  travelTips: [{
    type: String
  }],
  bestTimeToVisit: {
    type: String,
    default: 'All year round'
  },
  mapEmbedUrl: {
    type: String
  },
  priceEstimate: {
    type: String,
    default: '₹25,000'
  },
  reviews: [reviewSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

destinationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
