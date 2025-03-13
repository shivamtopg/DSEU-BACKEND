const express = require('express')
const { getDepartment } = require('../controllers/departmentController')

const router = express.Router()

router.route('/').get(getDepartment)

module.exports = router
