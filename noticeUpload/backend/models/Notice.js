const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  archived: { type: Boolean, default: false },
});

module.exports = mongoose.model("Notice", NoticeSchema);
