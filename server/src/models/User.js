import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: {
    type: String
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otpSecret: {
    type: String,
    // made optional so signup flow can generate & set after save
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;