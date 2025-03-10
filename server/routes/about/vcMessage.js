const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>vs message and videos Route</h1>");
});

module.exports = router;
