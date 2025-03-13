const mongoose = require('mongoose')
const connectDB = require('../../config/db.js')
const departments = require('./departments.js')
const Department = require('../../models/Department')

//connect to database
connectDB()

const importDepartments = async () => {
  try {
    for (const name of departments) {
      await Department.insertMany({ name })
    }
    console.log('departments inserted successfully!')
    mongoose.connection.close()
  } catch (err) {
    console.log(err)
  }
  process.exit(1)
}

if (process.argv[2] === 'import-departments') {
  importDepartments()
}
