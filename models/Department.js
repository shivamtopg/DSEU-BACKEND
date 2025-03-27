const mongoose = require('mongoose')

const DepartmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name should exist'],
    unique: true,
  },
  hod: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('Department', DepartmentsSchema)
