const mongoose = require("mongoose");

const canteenOrderSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      total: { type: Number, required: true }
    }
  ],
  subtotal: { type: Number, required: true },
  discount: { type: Number, required: true },
  gst: { type: Number, required: true },
  total: { type: Number, required: true },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("CanteenOrder", canteenOrderSchema);