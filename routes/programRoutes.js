const express = require("express");
const {
  createProgram,
  getProgramsByDepartment,
} = require("../controllers/programController");

const router = express.Router();

router.route("/").post(createProgram);
router.route("/:id").get(getProgramsByDepartment);

module.exports = router;
