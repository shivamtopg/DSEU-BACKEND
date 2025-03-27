const express = require('express')
const {
  createFaculty,
  getFaculty,
  updateFaculty,
  getFacultyById,
  addResearch,
  updateResearch,
  deleteResearch,
} = require('../controllers/facultyController')
const multer = require('multer')
const {
  protectRoute,
  restrictTo,
  checkOwnerShip,
} = require('../middlewares/protectRoutes')

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.route('/').post(createFaculty).get(getFaculty)
router.route('/:id').get(getFacultyById)
router
  .route('/:id')
  .put(
    protectRoute,
    restrictTo('Faculty', 'Test'),
    checkOwnerShip,
    upload.single('image'),
    updateFaculty,
  )

router
  .route('/:id/research')
  .post(
    protectRoute,
    restrictTo('Faculty', 'Test'),
    checkOwnerShip,
    addResearch,
  )
router
  .route('/:id/research/:researchId')
  .patch(
    protectRoute,
    restrictTo('Faculty', 'Test'),
    checkOwnerShip,
    updateResearch,
  )
  .delete(
    protectRoute,
    restrictTo('Faculty', 'Test'),
    checkOwnerShip,
    deleteResearch,
  )

module.exports = router
