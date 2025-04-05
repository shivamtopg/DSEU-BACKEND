const catchAsync = require("../utils/catchAsync");
const Campus = require("../models/Campus");
const AppError = require("../utils/appError");

const createCampus = catchAsync(async (req, resp, next) => {
  const campus = await Campus.create(req.body);
  resp.status(201).json({
    status: "success",
    data: {
      campus,
    },
  });
});

const getCampuses = catchAsync(async (req, resp, next) => {
  const campuses = await Campus.find();

  resp.status(200).json({
    status: "success",
    results: campuses?.length,
    data: {
      campuses,
    },
  });
});

module.exports = { createCampus, getCampuses };
