const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true },
  time: { type: String },
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Booking", bookingSchema);
