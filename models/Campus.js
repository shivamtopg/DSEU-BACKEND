const { default: mongoose } = require("mongoose");
const validator = require("validator");

const CampusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  campus_director: {
    type: String,
    required: true,
  },
  campus_director_email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
  },
  campus_message: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  campus_info: {
    type: String,
    required: true,
  },
  courses_offered: {
    type: [String],
    required: true,
  },
  labs: {
    type: [String],
    required: false,
  },
  campus_photo: {
    type: String,
    required: false,
  },
  activity_photos: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model("Campus", CampusSchema);
