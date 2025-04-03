const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const YearSchema = new mongoose.Schema({
  year_credit_text: { type: String, required: false },
  year_exit_text: { type: String, required: false },
  year_syllabus_link: { type: String, required: false, default: "" },
});

const ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  programLevel: {
    type: String,
    enum: ["UG", "PG", "Diploma"],
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  exit_options: {
    type: [String],
    required: false,
  },
  years: {
    year1: { type: YearSchema, required: false },
    year2: { type: YearSchema, required: false },
    year3: { type: YearSchema, required: false },
    year4: { type: YearSchema, required: false },
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: false,
  },
});

module.exports = mongoose.model("Program", ProgramSchema);
