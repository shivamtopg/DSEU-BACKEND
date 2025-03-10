const express = require('express')
const { createUser } = require('../controllers/userController')

const router = express.Router()

router.post('/users', createUser) // New route to add users

module.exports = router
