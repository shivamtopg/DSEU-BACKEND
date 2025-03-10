const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>policies- green policy routes</h1>");
});

module.exports = router;
