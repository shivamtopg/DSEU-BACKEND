const catchAsync = require('../utils/catchAsync')
const Faculty = require('../models/Faculty')
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/appError')

const { PAGE_SIZE } = require('../constants/constants')

const createFaculty = catchAsync(async (req, resp, next) => {
  const faculty = await Faculty.create(req.body)
  resp.status(201).json({
    status: 'success',
    data: {
      faculty,
    },
  })
})

const getFaculty = catchAsync(async (req, resp, next) => {
  const totalFacultyDocuments = await Faculty.countDocuments()
  const totalPages = Math.ceil(totalFacultyDocuments / PAGE_SIZE)

  const facultyFeatures = new APIFeatures(Faculty.find(), req.query)
    .filter()
    .paginate()

  const faculty = await facultyFeatures.query
  resp.status(200).json({
    status: 'success',
    results: faculty?.length,
    metadata: {
      page: req.query?.page || 1,
      totalPages,
      totalItems: totalFacultyDocuments,
    },
    data: {
      faculty,
    },
  })
})

const updateFaculty = catchAsync(async (req, resp, next) => {
  const id = req.params.id
  const faculty = await Faculty.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!faculty) {
    return next(new AppError(`Cannot find faculty with id: ${id}`, 404))
  }
  resp.status(200).json({
    status: 'success',
    data: {
      faculty,
    },
  })
})

module.exports = { createFaculty, getFaculty, updateFaculty }
