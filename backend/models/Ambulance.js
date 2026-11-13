const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
  hospital: String,
  status: {
    type: String,
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ambulance", ambulanceSchema);