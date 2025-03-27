const mongoose = require('mongoose')
const connectDB = require('../../config/db.js')
const DepartmentSchool = require('../../models/DepartmentSchool')

const fs = require('fs')

//connect to database
connectDB()

const departmentSchoolsData = JSON.parse(
  fs.readFileSync(`${__dirname}/departmentSchools.json`, 'utf-8'),
)
const fieldMappings = {
  school: 'name',
}

const normalizedData = departmentSchoolsData.map((obj) =>
  Object.keys(obj).reduce((acc, ele) => {
    const newKey = fieldMappings[ele] || ele
    acc[newKey] = obj[ele]
    return acc
  }, {}),
)
const importDepartmentSchools = async () => {
  try {
    const formattedSchools = normalizedData.map((school) => ({
      name: school.name,
      dept_id: JSON.parse(school.dept_id.replace(/'/g, '"').trim()),
    }))

    await DepartmentSchool.insertMany(formattedSchools)

    console.log('departments schools inserted successfully!')

    mongoose.connection.close()
  } catch (err) {
    console.log(err)
  }
  process.exit(1)
}

if (process.argv[2] === 'import-departmentSchools') {
  importDepartmentSchools()
}
