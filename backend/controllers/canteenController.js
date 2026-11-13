const Canteen = require("../models/Canteen");
const CanteenOrder = require("../models/CanteenOrder");

// GET ALL FOOD ITEMS
const getCanteens = async (req, res) => {
  try {
    const canteens = await Canteen.find();
    res.json(canteens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET FOOD ITEM BY ID
const getCanteenById = async (req, res) => {
  try {
    const canteen = await Canteen.findById(req.params.id);
    if (!canteen) {
      return res.status(404).json({ message: "Canteen not found" });
    }
    res.json(canteen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE FOOD ITEM
const createCanteen = async (req, res) => {
  try {
    const canteen = new Canteen(req.body);
    const savedCanteen = await canteen.save();
    res.status(201).json(savedCanteen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE FOOD ITEM
const updateCanteen = async (req, res) => {
  try {
    const updatedCanteen = await Canteen.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCanteen) {
      return res.status(404).json({ message: "Canteen not found" });
    }

    res.json(updatedCanteen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE FOOD ITEM
const deleteCanteen = async (req, res) => {
  try {
    const deletedCanteen = await Canteen.findByIdAndDelete(req.params.id);

    if (!deletedCanteen) {
      return res.status(404).json({ message: "Canteen not found" });
    }

    res.json({ message: "Canteen deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PLACE CANTEEN ORDER
const createCanteenOrder = async (req, res) => {
  try {
    const { items, subtotal, discount, gst, total } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Please add food items to your cart"
      });
    }

    const order = new CanteenOrder({
      items,
      subtotal,
      discount,
      gst,
      total
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Canteen order saved successfully",
      order: savedOrder
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL CANTEEN ORDERS
const getCanteenOrders = async (req, res) => {
  try {
    const orders = await CanteenOrder.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCanteens,
  getCanteenById,
  createCanteen,
  updateCanteen,
  deleteCanteen,
  createCanteenOrder,
  getCanteenOrders
};