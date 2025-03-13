const Department = require('../models/Department')
const catchAsync = require('../utils/catchAsync')

const getDepartment = catchAsync(async (req, resp) => {
  const departments = await Department.find()

  resp.status(200).json({
    status: 'success',
    results: departments?.length,
    data: {
      departments,
    },
  })
})

module.exports = { getDepartment }
