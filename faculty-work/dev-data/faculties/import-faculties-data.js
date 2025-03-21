const mongoose = require('mongoose')
const connectDB = require('../../config/db.js')
const Faculty = require('../../models/Faculty')

const fs = require('fs')

//connect to database
connectDB()

const facultiesData = JSON.parse(
  fs.readFileSync(`${__dirname}/facultiesData.json`, 'utf-8'),
)
const fieldMappings = {
  Name: 'name',
  Email: 'email',
  Department: 'department',
  'Brief overview of research': 'overview',
  Photograph: 'photo',
}

// const normalizedData = facultiesData.map((obj) =>
//   Object.keys(obj).reduce((acc, ele) => {
//     const newKey = fieldMappings[ele] || ele
//     acc[newKey] = obj[ele]
//     return acc
//   }, {}),
// )
const importFaculties = async () => {
  try {
    for (const faculty of facultiesData) {
      await Faculty.insertMany({ ...faculty })
    }
    console.log('faculty members inserted successfully!')
    mongoose.connection.close()
  } catch (err) {
    console.log(err)
  }
  process.exit(1)
}

if (process.argv[2] === 'import-faculties') {
  importFaculties()
}
