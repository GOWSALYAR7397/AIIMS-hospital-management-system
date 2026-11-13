const mongoose = require("mongoose");

const canteenSchema = new mongoose.Schema({
  item: String,
  price: Number,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Canteen", canteenSchema);
