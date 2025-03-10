const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>calender Route</h1>");
});

module.exports = router;
