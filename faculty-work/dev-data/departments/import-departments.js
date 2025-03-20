const mongoose = require('mongoose')
const connectDB = require('../../config/db.js')
const Department = require('../../models/Department')

const fs = require('fs')

//connect to database
connectDB()

const departmentsData = JSON.parse(
  fs.readFileSync(`${__dirname}/departments.json`, 'utf-8'),
)
const fieldMappings = {
  department: 'name',
}

const normalizedData = departmentsData.map((obj) =>
  Object.keys(obj).reduce((acc, ele) => {
    const newKey = fieldMappings[ele] || ele
    acc[newKey] = obj[ele]
    return acc
  }, {}),
)
const importFaculties = async () => {
  try {
    for (const department of normalizedData) {
      await Department.insertMany({ ...department })
    }
    console.log('departments inserted successfully!')
    mongoose.connection.close()
  } catch (err) {
    console.log(err)
  }
  process.exit(1)
}

if (process.argv[2] === 'import-departments') {
  importFaculties()
}
