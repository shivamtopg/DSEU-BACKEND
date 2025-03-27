require('./Department')
const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = require('mongoose')

const FacultySchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: false,
  },
  salutation: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false,
    },
  },
  photo: {
    type: String,
    required: false,
    default: '',
  },
  overview: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    required: false,
  },
  dept_id: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: false,
  },
  research: [
    {
      research_area: {
        type: String,
        required: false,
      },
      research_overview: {
        type: String,
        required: false,
      },
      publications: {
        type: String,
        required: false,
      },
    },
  ],
})

FacultySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'dept_id',
    select: '-__v',
  })

  next()
})

module.exports = mongoose.model('Faculty', FacultySchema)
