const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const moment = require("moment") // used to validate date input

console.log("controller loaded")

async function hasData(req, res, next) {
  console.log("request in server:", req.body)
  if (req.body) {
    res.locals.reservation = req.body.data
    console.log("req body data:", req.body.data)
    return next();
  }
  const message = "body must have data property"
  next({ status: 400, message: message })
}

function dataHas(propertyName) {
  console.log(`data has ${propertyName}`)
  const methodName = `dataHas('${propertyName}')`
  return (req, res, next) => {
    const reservation = res.locals.reservation
    const value = reservation[propertyName]
    if (value === "" || value === undefined) {
      const message = `Reservation must include a '${propertyName}' property.`
      next({ status: 400, message: message })
    }
    return next()
  }
}

/* const hasFirstName = dataHas("first_name")
const hasLastName = dataHas("last_name")
const hasMobileNumber = dataHas("mobile_number")
const hasReservationDate = dataHas("reservation_date")
const hasReservationTime = dataHas("reservation_time")
const hasPeople = dataHas("people") */

async function hasValidDate (req, res, next) {
  console.log("has valid date")
  const reservation = res.locals.reservation
  const result = moment(reservation.reservation_date, "YYYY-MM-DD", true).isValid()
  if (result) {
    return next()
  }
  const message = `reservation_date is invalid.`
  next({ status: 400, message: message })
}

function hasValidTime(req, res, next) {
  const reservation = res.locals.reservation
  const result = moment(reservation.reservation_time, "kk:mm", true).isValid()
  if (result) {
    return next()
  }
  const message = `reservation_time is invalid.`
  next({ status: 400, message: message })
}

function hasValidPeople(req, res, next) {
  const reservation = res.locals.reservation
  console.log("people", reservation.people)
  if ( reservation.people <= 0 ) {
    const message = `Property 'people' must be an integer greater than 0.`
    next({ status: 400, message: message })
  } else if (reservation.people === "" || isNaN(reservation.people)) {
    const message = `Property 'people' must be an integer greater than 0.`
    next({ status: 400, message: message })
  } else {
    return next()
  }
  
}

async function list(req, res, next) {
  const date = req.query.date
  if (date) {
    const data = await service.listReservationsByDate(date)
    res.json({ data })
  } else {
    const data = await service.list()
    res.json({ data })
  }
}

async function create(req, res, next) {
  const newReservation = await service.create(res.locals.reservation)
  console.log("create method in controller")
  res.status(201).json({
    data: newReservation,
  })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(hasData), 
    /* hasFirstName,
    hasLastName,
    hasMobileNumber,
    hasReservationDate, */
    asyncErrorBoundary(hasValidDate),
    //hasReservationTime,
    hasValidTime,
    //hasPeople,
    hasValidPeople,
    asyncErrorBoundary(create)
  ],
}
