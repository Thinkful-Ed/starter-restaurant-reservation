const reservationsService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// VALIDATION //

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body
    if (data[propertyName]) {
      return next()
    }
    next({
      status: 400,
      message: `Must include a ${propertyName}`,
    })
  }
}

function datePropertyIsValid(req, res, next) {
  const { reservation_date } = req.body.data
  const dateFormat = /^\d{4}-\d{1,2}-d{1,2}$/
  if (dateFormat.test(reservation_date)) {
    return next()
  } else {
    return next({
      status: 400,
      message: `Invalid field: 'reservation_date' must be a valid date.`,
    })
  }
}

function timePropertyIsValid(req, res, next) {
  const { reservation_time } = req.body.data
  const timeFormat = /\d\d:\d\d/
  if (timeFormat.test(reservation_time)) {
    return next()
  } else {
    return next({
      status: 400,
      message: `Invalid field: 'reservation_time' must be a valid time.`,
    })
  }
}

function peoplePropertyIsValid(req, res, next) {
  const { people } = req.body.data
  if (typeof people === "number" && people > 0) {
    return next()
  } else {
    return next({
      status: 400,
      message: `Invalid field: 'people' must be at least 1.`
    })
  }
}

async function list(req, res) {
  res.json({
    data: [],
  });
}

module.exports = {
  list,
};
