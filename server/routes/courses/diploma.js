const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>diploma routes</h1>");
});

module.exports = router;
