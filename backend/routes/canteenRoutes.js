const express = require("express");
const router = express.Router();

const {
  getCanteens,
  getCanteenById,
  createCanteen,
  updateCanteen,
  deleteCanteen,
  createCanteenOrder,
  getCanteenOrders
} = require("../controllers/canteenController");

// FOOD CRUD
router.get("/", getCanteens);
router.get("/:id", getCanteenById);
router.post("/", createCanteen);
router.put("/:id", updateCanteen);
router.delete("/:id", deleteCanteen);

// ORDER API
router.post("/orders", createCanteenOrder);
router.get("/orders", getCanteenOrders);

module.exports = router;