const mongoose = require('mongoose')
const connectDB = require('../../config/db.js')
const User = require('../../models/User')

const fs = require('fs')

//connect to database
connectDB()

const usersData = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8'),
)
const fieldMappings = {
  employeeCode: 'password',
}

const normalizedData = usersData.map((obj) =>
  Object.keys(obj).reduce((acc, ele) => {
    const newKey = fieldMappings[ele] || ele
    acc[newKey] = obj[ele]
    return acc
  }, {}),
)
const importUsers = async () => {
  try {
    for (const user of usersData) {
      await User.create(user)
    }
    console.log('users inserted successfully!')
    mongoose.connection.close()
  } catch (err) {
    console.log(err)
  }
  process.exit(1)
}

if (process.argv[2] === 'import-users') {
  importUsers()
}

// {
//  "email": "kanak.lata@dseu.ac.in",
//  "password": " "
// },
// {
//  "email": "anilapmae@gmail.com"
// },
// {
//  "email": "ersanjeevkumar124@gmail.com"
// },
// {
//  "email": "director-wcsc-pusa@dseu.ac.in"
// },
// {
//  "email": "nandlal.singh@dseu.ac.in"
// },
// {
//  "email": "pravir.chitre@dseu.ac.in"
// },
// {
//  "email": "carynethia@gmail.com"

// }

//priya

// {
//   "email": "priya.grover@dseu.ac.in",
//   "password": 11018,
//   "designation": "Faculty"
// },
// {
//   "email": "priya.grover@dseu.ac.in",
//   "password": 11018,
//   "designation": "Faculty"
// },
// {
//   "email": "priya.grover@dseu.ac.in",
//   "password": 11019,
//   "designation": "Faculty"
// },
// {
//   "email": "priya.grover@dseu.ac.in",
//   "password": 11019,
//   "designation": "Faculty"
// },

//priya panchal
