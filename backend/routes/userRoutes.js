const express = require("express");
const router = express.Router();

const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      success: true,
      message: "User Registered",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log("Login Email:", email);
    console.log("Requested Role:", role);

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    console.log("User Found:", !!user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email Not Found",
      });
    }

    console.log("Database Role:", user.role);

    if (String(user.password).trim() !== String(password).trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    console.log("Password Match: true");

    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Invalid User Role",
      });
    }

    res.json({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("Login Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;