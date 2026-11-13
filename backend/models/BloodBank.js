const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true }, // A+, B+, O-, etc
  quantity: { type: Number, default: 0 },
  donorName: String,
  lastUpdated: { type: Date, default: Date.now },

  bloodType: String,
  units: Number,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("BloodBank", bloodBankSchema);
