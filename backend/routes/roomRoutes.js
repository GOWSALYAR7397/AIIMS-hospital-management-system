const express = require("express");
const router = express.Router();

const Room = require("../models/Room");
const RoomBooking = require("../models/RoomBooking");

// ==========================
// GET ALL ROOMS
// ==========================

router.get("/", async (req, res) => {
  try {
    let rooms = await Room.find();

    if (rooms.length === 0) {
      await Room.insertMany([
        {
          roomType: "General Ward",
          total: 20,
          available: 10,
          price: 1000,
        },
        {
          roomType: "ICU",
          total: 10,
          available: 5,
          price: 5000,
        },
        {
          roomType: "Private Room",
          total: 15,
          available: 7,
          price: 3000,
        },
        {
          roomType: "Semi-Private",
          total: 12,
          available: 6,
          price: 2000,
        },
      ]);

      rooms = await Room.find();
    }

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================
// ADD ROOM
// ==========================

router.post("/", async (req, res) => {
  try {
    const { roomType, total, available, price } = req.body;

    const newRoom = new Room({
      roomType,
      total,
      available,
      price,
    });

    await newRoom.save();

    res.status(201).json({
      message: "Room Added Successfully!",
      room: newRoom,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ==========================
// ROOM BOOKING
// ==========================

router.post("/:id/book", async (req, res) => {
  try {
    const { patientName, days } = req.body;

    if (!patientName || !days || Number(days) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid patient name and days",
      });
    }

    // Check room availability
    const room = await Room.findOneAndUpdate(
      {
        _id: req.params.id,
        available: { $gt: 0 },
      },
      {
        $inc: { available: -1 },
      },
      {
        new: true,
      }
    );

    if (!room) {
      return res.status(400).json({
        success: false,
        message: "Room not available",
      });
    }

    // Calculate amount
    const totalAmount = room.price * Number(days);

    // Save booking in MongoDB
    const booking = new RoomBooking({
      patientName: patientName.trim(),
      roomType: room.roomType,
      days: Number(days),
      pricePerDay: room.price,
      totalAmount,
    });

    try {
      await booking.save();
    } catch (saveError) {
      // Restore availability if booking save fails
      await Room.findByIdAndUpdate(room._id, {
        $inc: { available: 1 },
      });

      throw saveError;
    }

    res.status(201).json({
      success: true,
      message: "Room Booked Successfully!",
      booking,
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================
// GET ALL ROOM BOOKINGS
// ==========================

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await RoomBooking.find().sort({
      bookingDate: -1,
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================
// UPDATE ROOM
// ==========================

router.put("/:id", async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ==========================
// DELETE ROOM
// ==========================

router.delete("/:id", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);

    if (!deletedRoom) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json({
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;