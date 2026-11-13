const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

  roomType: {
    type: String,
    required: true
  },

  total: {
    type: Number,
    required: true
  },

  available: {
    type: Number,
    required: true
  },

  // ADD THIS
  price: {
    type: Number,
    required: true
  }

});

module.exports =
  mongoose.model("Room", roomSchema);