const mongoose = require('mongoose')

const DepartmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name should exist'],
    unique: true,
  },
})

module.exports = mongoose.model('Department', DepartmentsSchema)
