const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: String,
  contact: String,
  email: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
