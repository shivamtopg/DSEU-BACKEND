const express = require('express')
const {
  createFaculty,
  getFaculty,
  updateFaculty,
  getFacultyById,
} = require('../controllers/facultyController')
const multer = require('multer')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.route('/').post(createFaculty).get(getFaculty)
router.route('/:id').get(getFacultyById)
router.route('/:id').put(upload.single('image'), updateFaculty)

module.exports = router
