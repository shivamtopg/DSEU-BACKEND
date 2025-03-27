const { INAVALID_LOGIN } = require('../constants/constants')
const User = require('../models/User')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

const generateJWTtoken = function (id, role, email) {
  return jwt.sign(
    { id: id, role: role, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  )
}

const signUp = catchAsync(async (req, resp, next) => {
  const { email, password, designation } = req.body

  const newUser = await User.create({ email, password, designation })

  resp.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  })
})

const login = catchAsync(async (req, resp, next) => {
  const { email, password } = req.body
  if (!email || !password)
    return next(new AppError('Please provide an email or password!', 400))
  const user = await User.findOne({ email })

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(INAVALID_LOGIN, 404))
  }

  const token = generateJWTtoken(user._id, user.role, user.email)

  resp.status(200).json({
    status: 'success',
    token,
    email,
  })
})

module.exports = { login, signUp }
