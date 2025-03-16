const express = require('express')
const {
  createFaculty,
  getFaculty,
  updateFaculty,
  getFacultyById,
} = require('../controllers/facultyController')

const router = express.Router()

router.route('/').post(createFaculty).get(getFaculty)
router.route('/:id').patch(updateFaculty).get(getFacultyById)

module.exports = router
