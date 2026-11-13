const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// Import Routes
const patientRoutes = require("./routes/patientRoutes");
const ambulanceRoutes = require("./routes/ambulanceRoutes");
const bloodBankRoutes = require("./routes/bloodBankRoutes");
const roomRoutes = require("./routes/roomRoutes");
const canteenRoutes = require("./routes/canteenRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/patients", patientRoutes);
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/bloodbanks", bloodBankRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/canteen", canteenRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Hospital Backend running!");
});

// MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });