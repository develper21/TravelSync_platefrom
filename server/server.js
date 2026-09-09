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
import destinationsRoutes from "./src/routes/destinationsRoutes.js";
import blogsRoutes from "./src/routes/blogsRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://transcendent-clafoutis-4dff09.netlify.app"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
connectDB();

// Seed initial data in development
if (process.env.NODE_ENV !== 'production') {
  import('./src/utils/seedData.js').then(({ seedAllData }) => {
    if (seedAllData) {
      seedAllData();
    }
  }).catch(err => console.warn('Seed data warning:', err.message));
}

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'TravelSync Backend API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/trip", tripsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/booking", bookingsRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/destinations", destinationsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/contact", contactRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong on the server' });
});

// 404 Route Catch-All
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});