const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  fileName: String,
  fileLink: String,
  archive: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now },
  autoArchive: { type: Boolean, default: false },
});

module.exports = mongoose.model("Notice", pdfSchema);
