const mongoose = require('mongoose')

const DepartmentSchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'School name should exist'],
    unique: true,
  },
  dept_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
  ],
})

DepartmentSchoolSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'dept_id',
    select: '-__v',
  })

  next()
})

module.exports = mongoose.model('DepartmentSchool', DepartmentSchoolSchema)
