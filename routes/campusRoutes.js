const express = require("express");
const { createCampus } = require("../controllers/campusController");

const router = express.Router();

router.route("/").post(createCampus);

module.exports = router;
