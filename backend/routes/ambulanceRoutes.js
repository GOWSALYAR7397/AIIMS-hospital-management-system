const express = require("express");
const router = express.Router();
const Ambulance = require("../models/Ambulance");

// CREATE
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    // 🔥 SAFE CHECK
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No data received" });
    }

    const { name, phone, location, hospital } = req.body;

    // 🔥 EXTRA VALIDATION (IMPORTANT)
    if (!name || !phone || !location || !hospital) {
      return res.status(400).json({
        error: "All fields required"
      });
    }

    const newBooking = new Ambulance({
      name,
      phone,
      location,
      hospital
    });

    const saved = await newBooking.save();

    return res.status(200).json({
      message: "Booked successfully",
      data: saved
    });

  } catch (err) {
    console.error("FULL ERROR:", err);

    return res.status(500).json({
      error: err.message,
      name: err.name,
      code: err.code,
      details: err.errors
    });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const data = await Ambulance.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;