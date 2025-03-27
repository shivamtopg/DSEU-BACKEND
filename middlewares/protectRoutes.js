const { NO_TOKEN } = require('../constants/constants')
const Faculty = require('../models/Faculty')
const User = require('../models/User')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

const protectRoute = catchAsync(async (req, resp, next) => {
  let token
  let authHeader = req.headers.authorization || req.headers.Authorization
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]

    if (!token) {
      return next(new AppError(NO_TOKEN, 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ email: decoded?.email })

    if (!user) {
      return next(new AppError('User not found', 401))
    }

    //setting user on req object
    req.user = user

    next()
  } else {
    return next(new AppError(NO_TOKEN, 401))
  }
})

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.designation)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      )
    }

    next()
  }
}

const checkOwnerShip = catchAsync(async (req, resp, next) => {
  const id = req.params.id

  const requestedFaculty = await Faculty.findById(id)

  if (!requestedFaculty) {
    return next(new AppError(`Cannot find faculty with id: ${id}`, 404))
  }

  const { email: userEmail } = req.user

  if (userEmail !== requestedFaculty.email) {
    return next(
      new AppError('Unauthorized: You cannot edit other faculty data.', 401),
    )
  }

  next()
})

module.exports = { protectRoute, restrictTo, checkOwnerShip }
