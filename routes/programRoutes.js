const express = require("express");
const {
  createProgram,
  getProgramsByDepartment,
  getPrograms,
} = require("../controllers/programController");

const router = express.Router();

router.route("/").post(createProgram).get(getPrograms);
router.route("/:id").get(getProgramsByDepartment);

module.exports = router;
