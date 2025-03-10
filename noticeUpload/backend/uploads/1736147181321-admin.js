// routes/admin.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "password123",
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
