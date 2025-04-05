const express = require("express");
const {
  createCampus,
  getCampuses,
} = require("../controllers/campusController");

const router = express.Router();

router.route("/").post(createCampus).get(getCampuses);

module.exports = router;
