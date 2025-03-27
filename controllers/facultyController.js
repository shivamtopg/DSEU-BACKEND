const catchAsync = require('../utils/catchAsync')
const Faculty = require('../models/Faculty')
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/appError')
const axios = require('axios')

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

const getFacultyById = catchAsync(async (req, resp, next) => {
  const id = req.params.id
  const faculty = await Faculty.findById(id)
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

// const updateFaculty = catchAsync(async (req, resp, next) => {
//   const id = req.params.id
//   const faculty = await Faculty.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   })

//   if (!faculty) {
//     return next(new AppError(`Cannot find faculty with id: ${id}`, 404))
//   }
//   resp.status(200).json({
//     status: 'success',
//     data: {
//       faculty,
//     },
//   })
// })
const updateFaculty = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const { overview } = req.body
  let photo

  if (req.file) {
    try {
      const imageBase64 = req.file.buffer.toString('base64')
      const response = await axios.post(
        'https://api.imgur.com/3/image',
        { image: imageBase64, type: 'base64' },
        {
          headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          },
        },
      )
      photo = response.data.data.link
    } catch (error) {
      return next(new AppError('Image upload failed', 500))
    }
  }

  const updateData = {
    overview,
    ...(photo && { photo }),
  }

  const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!updatedFaculty) {
    return next(new AppError(`Cannot find faculty with id: ${id}`, 404))
  }

  res.json({ message: 'Faculty updated successfully', updatedFaculty })
})

const addResearch = catchAsync(async (req, resp, next) => {
  const id = req.params.id

  const { research_area, research_overview, publications } = req.body

  const faculty = await Faculty.findById(id)
  if (!faculty) {
    return next(new AppError(`Cannot find faculty with id: ${id}`, 404))
  }

  const newResearch = {
    research_area,
    research_overview,
    publications,
  }

  faculty.research.push(newResearch)
  await faculty.save()

  resp.status(201).json({
    message: 'Research added successfully',
    newResearch,
  })
})

const updateResearch = catchAsync(async (req, resp, next) => {
  const { id, researchId } = req.params
  const updateData = req.body

  const faculty = await Faculty.findById(id)
  if (!faculty) {
    return next(new AppError(`Cannot find faculty with id: ${id}`, 404))
  }

  const researchIndex = faculty.research.findIndex(
    (r) => r._id.toString() === researchId,
  )
  if (researchIndex === -1) {
    return next(new AppError(`No research found with id: ${researchId}`, 404))
  }

  // Update the research object
  Object.assign(faculty.research[researchIndex], updateData)

  await faculty.save()

  resp.status(200).json({
    message: 'Research updated successfully',
    research: faculty.research[researchIndex],
  })
})

const deleteResearch = catchAsync(async (req, resp, next) => {
  const { id, researchId } = req.params

  const faculty = await Faculty.findById(id)
  if (!faculty) {
    return next(new AppError(`Cannot find faculty with id: ${id}`, 404))
  }

  const researchExists = faculty.research.some(
    (ele) => ele._id.toString() === researchId,
  )
  if (!researchExists) {
    return next(new AppError(`No research found with ID: ${researchId}`, 404))
  }

  const result = await Faculty.findByIdAndUpdate(
    id,
    {
      $pull: { research: { _id: researchId } },
    },
    {
      new: true,
    },
  )

  resp.status(200).json({
    message: 'Research deleted successfully',
    updatedFaculty: result,
  })
})

module.exports = {
  createFaculty,
  getFaculty,
  updateFaculty,
  getFacultyById,
  addResearch,
  updateResearch,
  deleteResearch,
}
