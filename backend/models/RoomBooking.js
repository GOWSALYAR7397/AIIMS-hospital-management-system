const mongoose = require("mongoose");

const roomBookingSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },

  roomType: {
    type: String,
    required: true,
  },

  days: {
    type: Number,
    required: true,
  },

  pricePerDay: {
    type: Number,
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RoomBooking", roomBookingSchema);