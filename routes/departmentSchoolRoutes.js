const express = require('express')
const {
  getDepartmentSchool,
} = require('../controllers/departmentSchoolController')

const router = express.Router()

router.route('/').get(getDepartmentSchool)

module.exports = router
