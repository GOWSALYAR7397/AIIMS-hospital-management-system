const BloodBank = require("../models/BloodBank");

// Get All Blood Banks
const getBloodBanks = async (req, res) => {
  try {
    const banks = await BloodBank.find();
    res.status(200).json(banks);
  } catch (error) {
    console.error("Get Blood Banks Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get Blood Bank By ID
const getBloodBankById = async (req, res) => {
  try {
    const bank = await BloodBank.findById(req.params.id);

    if (!bank) {
      return res.status(404).json({
        message: "Blood bank not found",
      });
    }

    res.status(200).json(bank);
  } catch (error) {
    console.error("Get Blood Bank By ID Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create Blood Bank
const createBloodBank = async (req, res) => {
  try {
    console.log("Blood Bank Data Received:", req.body);

    const { bloodGroup, quantity, available } = req.body;

    if (!bloodGroup) {
      return res.status(400).json({
        success: false,
        message: "Blood Group is required",
      });
    }

    const bank = new BloodBank({
      bloodGroup: bloodGroup,
      quantity: Number(quantity),
      available: available,
    });

    const savedBank = await bank.save();

    console.log("Blood Bank Saved Successfully:", savedBank);

    res.status(201).json({
      success: true,
      message: "Blood bank added successfully",
      data: savedBank,
    });
  } catch (error) {
    console.error("Blood Bank Save Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Blood Bank
const updateBloodBank = async (req, res) => {
  try {
    const updatedBank = await BloodBank.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBank) {
      return res.status(404).json({
        message: "Blood bank not found",
      });
    }

    res.status(200).json(updatedBank);
  } catch (error) {
    console.error("Update Blood Bank Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete Blood Bank
const deleteBloodBank = async (req, res) => {
  try {
    const deletedBank = await BloodBank.findByIdAndDelete(req.params.id);

    if (!deletedBank) {
      return res.status(404).json({
        message: "Blood bank not found",
      });
    }

    res.status(200).json({
      message: "Blood bank deleted successfully",
    });
  } catch (error) {
    console.error("Delete Blood Bank Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBloodBanks,
  getBloodBankById,
  createBloodBank,
  updateBloodBank,
  deleteBloodBank,
};
