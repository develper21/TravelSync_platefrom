import mongoose from "mongoose";
import dns from "dns";

// Ensure DNS resolution succeeds for MongoDB Atlas SRV connection strings
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not supported
}

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully to Atlas.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;