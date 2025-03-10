const express = require("express");
const Notice = require("../models/Notice");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken"); // Import jwt

// Middleware to check for admin token
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    next();
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create a new notice
router.post(
  "/create",
  authenticateAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }
      const notice = new Notice({
        filename: req.file.originalname,
        filepath: req.file.path,
        title: req.body.title,
        description: req.body.description,
      });
      await notice.save();
      res.json({ message: "Notice created", notice });
    } catch (error) {
      res.status(500).json({ message: "Error creating notice", error });
    }
  }
);

// Get all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find({ archived: false });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices", error });
  }
});

// Delete (archive) a notice
router.delete("/delete/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findByIdAndUpdate(id, { archived: true });
    res.json({ message: "Notice archived" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notice", error });
  }
});

module.exports = router;
