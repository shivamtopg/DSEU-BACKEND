const catchAsync = (fn) => {
  return (req, resp, next) => {
    fn(req, resp, next).catch(next)
  }
}

module.exports = catchAsync
