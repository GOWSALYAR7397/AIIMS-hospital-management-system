const Ambulance = require("../models/Ambulance");


const getAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.json(ambulances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAmbulanceById = async (req, res) => {
  try {
    const ambulance = await Ambulance.findById(req.params.id);
    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }
    res.json(ambulance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createAmbulance = async (req, res) => {
  try {
    const newAmbulance = new Ambulance({
      ...req.body,
      status: "Available" 
    });

    const savedAmbulance = await newAmbulance.save();
    res.status(201).json(savedAmbulance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateAmbulance = async (req, res) => {
  try {
    const updatedAmbulance = await Ambulance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAmbulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.json(updatedAmbulance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteAmbulance = async (req, res) => {
  try {
    const deleted = await Ambulance.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.json({ message: "Ambulance deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bookAmbulance = async (req, res) => {
  try {
    const ambulance = await Ambulance.findById(req.params.id);

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    if (ambulance.status === "Booked") {
      return res.status(400).json({ message: "Already booked" });
    }

    ambulance.status = "Booked";
    await ambulance.save();

    res.json({ message: "Ambulance booked successfully", ambulance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔄 CANCEL booking
const cancelBooking = async (req, res) => {
  try {
    const ambulance = await Ambulance.findById(req.params.id);

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    ambulance.status = "Available";
    await ambulance.save();

    res.json({ message: "Booking cancelled", ambulance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAmbulances,
  getAmbulanceById,
  createAmbulance,
  updateAmbulance,
  deleteAmbulance,
  bookAmbulance,   
  cancelBooking   
};