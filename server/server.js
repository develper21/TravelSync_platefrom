import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import tripsRoutes from "./src/routes/tripsRoutes.js";
import bookingsRoutes from "./src/routes/bookingsRoutes.js";
import hotelsRoutes from "./src/routes/hotelsRoutes.js";
import usersRoutes from "./src/routes/usersRoutes.js";
import paymentsRoutes from "./src/routes/paymentsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://transcendent-clafoutis-4dff09.netlify.app"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectDB();

// Seed sample data (only in development)
if (process.env.NODE_ENV !== 'production') {
  import('./src/utils/seedData.js').then(({ default: seedHotels }) => {
    seedHotels();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/payments", paymentsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 API endpoints available at http://localhost:${PORT}/api`);
});