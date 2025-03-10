const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Assuming you have an Admin model
const router = express.Router();

// Admin login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch admin details from the database
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token if authentication is successful
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ token });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
