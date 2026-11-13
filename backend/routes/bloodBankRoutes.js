const express = require("express");
const router = express.Router();
const {
  getBloodBanks,
  getBloodBankById,
  createBloodBank,
  updateBloodBank,
  deleteBloodBank,
} = require("../controllers/bloodBankController");

router.get("/", getBloodBanks);
router.get("/:id", getBloodBankById);
router.post("/", createBloodBank);
router.put("/:id", updateBloodBank);
router.delete("/:id", deleteBloodBank);

module.exports = router;
