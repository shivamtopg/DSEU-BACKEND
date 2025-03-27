const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    console.log('MongoDB Connected')
  } catch (err) {
    console.error('MongoDB Connection Failed', err)
    process.exit(1)
  }
}

module.exports = connectDB
