const DepartmentSchool = require('../models/DepartmentSchool')
const catchAsync = require('../utils/catchAsync')

const getDepartmentSchool = catchAsync(async (req, resp) => {
  const departmentSchools = await DepartmentSchool.find()

  resp.status(200).json({
    status: 'success',
    results: departmentSchools?.length,
    data: {
      departmentSchools,
    },
  })
})

module.exports = { getDepartmentSchool }
