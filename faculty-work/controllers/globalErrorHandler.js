const AppError = require('../utils/appError')

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`

  return new AppError(message, 400)
}

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((ele) => ele.message)
  const message = `Inavlid input data. ${errors.join(' .')}`

  return new AppError(message, 400)
}

const handleJWTError = () => new AppError('Please enter a valid token!', 401)
const handleJWTExpirationError = () =>
  new AppError('Your token has expired! please generate a new one.', 401)

const sendErrorDev = (err, resp) => {
  resp.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, resp) => {
  if (err.isOperational) {
    resp.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    console.error('ERROR 💣', err)

    resp.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    })
  }
}

module.exports = (err, req, resp, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, resp)
  } else {
    let error = Object.create(err)

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error)
    }

    if (error.name === 'ValidationError') {
      error = handleValidationError(error)
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError()
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpirationError()
    }

    sendErrorProd(error, resp)
  }
}
