// Load environment variables
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/userRoutes')
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Connect to Database
connectDB()

// Routes
app.use('/api/', routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
