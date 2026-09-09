import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  dob: {
    type: String,
    default: "",
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    tripReminders: { type: Boolean, default: true },
    ecoFriendlySuggestions: { type: Boolean, default: true },
    language: { type: String, default: "en" },
  },
  savedDestinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
  }],
  paymentMethods: [{
    cardType: { type: String, default: "Visa" },
    last4: { type: String, default: "4242" },
    expiry: { type: String, default: "12/28" },
    cardHolderName: { type: String, default: "" },
    billingAddress: { type: String, default: "" },
  }],
  otpSecret: {
    type: String,
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

// Hash password before saving
userSchema.pre("save", async function (next) {
  this.updatedAt = new Date();
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;