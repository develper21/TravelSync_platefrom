import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    city: String,
    country: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  price: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD',
    },
  },
  amenities: [String],
  images: [String],
  description: String,
  ecoFriendly: {
    type: Boolean,
    default: false,
  },
  sustainability: {
    certifications: [String],
    practices: [String],
  },
  rooms: [{
    type: {
      type: String,
      required: true,
    },
    capacity: Number,
    price: Number,
    amenities: [String],
    available: {
      type: Boolean,
      default: true,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

hotelSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
