const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

// Routes
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const ambulanceRoutes = require("./routes/ambulanceRoutes");
const bloodBankRoutes = require("./routes/bloodBankRoutes");
const roomRoutes = require("./routes/roomRoutes");
const canteenRoutes = require("./routes/canteenRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes"); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect MongoDB
connectDB();

// API Routes
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/bloodbanks", bloodBankRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/canteen", canteenRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);  

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});