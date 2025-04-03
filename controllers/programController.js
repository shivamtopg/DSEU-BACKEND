const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Program = require("../models/Program");

const createProgram = catchAsync(async (req, resp, next) => {
  const program = await Program.create(req.body);
  resp.status(201).json({
    status: "success",
    data: {
      program,
    },
  });
});

const getProgramsByDepartment = catchAsync(async (req, resp, next) => {
  const dept_id = req.params.id;

  const programs = await Program.find({ department: dept_id }).populate(
    "department"
  );

  if (programs.length === 0) {
    return next(
      new AppError(`no programs for department id: ${dept_id} exists!`, 200)
    );
  }

  resp.status(200).json({
    status: "success",
    results: programs?.length,
    data: {
      programs,
    },
  });
});

module.exports = { createProgram, getProgramsByDepartment };
