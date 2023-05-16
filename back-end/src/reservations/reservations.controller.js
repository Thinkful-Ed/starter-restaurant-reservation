const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const date = req.query.date || null
  const data = await service.list(date)
  res.json({
    data,
  });
}

//validates that all the fields has a value, stores the value in res.locals for further use
function validateHasTextFunction(field) {
  function validateHasText(req, res, next) {
    if(req.body.data[field]) {
      res.locals[field] = req.body.data[field]
      next()
    } else {
      next({
        status: 400,
        message: `Reservation must include a ${field}`
      })
    }
  }

  return validateHasText
}

function validateNumber(req, res, next) {
  //replaces () and - so that it can be formatted for database
  const number = res.locals.mobile_number.replace(/[^0-9]/g, '')
  if(number.length === 10) {
    const formattedNumber = number.slice(0,3) + "-" + number.slice(3,6) + "-" + number.slice(6)
    req.body.data.mobile_number = formattedNumber
    next()
  } else {
    next({
      status: 400,
      message: `Mobile number must be 10 digits`
    })
  }
}

//checks the reservation date Epoch time vs the current one
function validateDate(req, res, next) {
  const currentDate = new Date()
  const reservationDate = new Date(`${res.locals.reservation_date} ${res.locals.reservation_time}`)
  const currentDateEpoch = currentDate.getTime()
  const reservationDateEpoch = reservationDate.getTime()
  if(currentDateEpoch <= reservationDateEpoch) {
    next()
  } else {
    next({
      status: 400,
      message: `Reservation cannot be for a past date`
    })
  }
}

function validatePeople(req, res, next) {
  if(Number(res.locals.people) > 1) {
    next()
  } else {
    next({
      status: 400,
      message: `Party size must be greater than 1`
    })
  }
}

async function create(req, res) {
  const newObservation = await service.create(req.body.data)
  res.status(201).json({
    data: newObservation
  })
}
 
module.exports = {
  list,
  create: [
    ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"].map(field=>validateHasTextFunction(field)), 
    validateNumber,
    validateDate,
    validatePeople,
    asyncErrorBoundary(create)
  ],
};
