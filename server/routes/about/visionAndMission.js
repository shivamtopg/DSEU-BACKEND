const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>vision and mission Route</h1>");
});

module.exports = router;
