const express = require("express");
const {
  uploadFile,
  getNotices,
  archiveUnarchiveNotice,
} = require("../controllers/noticeController");

const router = express.Router();

router.route("/upload").post(uploadFile);
router.route("/").get(getNotices);
router.route("/:id").patch(archiveUnarchiveNotice);

module.exports = router;
