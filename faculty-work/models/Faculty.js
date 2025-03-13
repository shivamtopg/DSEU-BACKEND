require('./Department')
const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = require('mongoose')

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    required: true,
  },
  overview: {
    type: String,
    required: false,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'A Faculty must have a department'],
  },
})

FacultySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'department',
    select: '-__v',
  })

  next()
})

module.exports = mongoose.model('Faculty', FacultySchema)
