const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const moment = require("moment") // used to validate date input

async function hasData(req, res, next) {
  if (req.body.data) {
    res.locals.reservation = req.body.data
    return next();
  }
  const message = "body must have data property"
  next({ status: 400, message: message })
}

function dataHas(propertyName) {
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

const hasFirstName = dataHas("first_name")
const hasLastName = dataHas("last_name")
const hasMobileNumber = dataHas("mobile_number")
const hasReservationDate = dataHas("reservation_date")
const hasReservationTime = dataHas("reservation_time")
const hasPeople = dataHas("people")

async function hasValidDate (req, res, next) {
  const reservation = res.locals.reservation
  const result = moment(reservation.reservation_date, "YYYY-MM-DD", true).isValid()
  if (result) {
    // Restaurant is closed on Tuesdays
    if (moment(reservation.reservation_date).format('dddd') === 'Tuesday') {
      const message = 'Date provided is a Tuesday, restaurant is closed.'
      next({ status: 400, message: message })
    }
    //moment(reservation.reservation_date, "YYYY-MM-DD") < moment()
    if (reservation.reservation_date < new Date()) {
      console.log("date", reservation.reservation_date)
      console.log("moment", moment())
      const message = 'Reservation must be for a future date.'
      next({ status: 400, message: message })
    }
    return next()
  }
  const message = `reservation_date is invalid.`
  next({ status: 400, message: message })
}

function hasValidTime(req, res, next) {
  const reservation = res.locals.reservation
  const resTime = moment(reservation.reservation_time, "kk:mm", true)
  const result = resTime.isValid()
  if (result) {
    const openTime = moment("10:30", "HH:mm")
    const latestResTime = moment("21:30", "HH:mm")
    if (resTime.isBefore(openTime)) {
      next({ status: 400, message: "Restaurant opens at 10:30."})
    }
    if (latestResTime.isBefore(resTime)) {
      next({ status: 400, message: "Latest reservation time is 9:30 PM."})
    }

    // console.log("res time before open:", resTime.isBefore(openTime))
    // console.log("reservation time", reservation.reservation_time)
    return next()
  }
  const message = `reservation_time is invalid.`
  next({ status: 400, message: message })
}

function hasValidPeople(req, res, next) {
  const reservation = res.locals.reservation
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

async function read(req, res, next) {
  const reservation = await service.read(req.params.reservation_id)
  res.status(201).json({
    data: reservation,
  })
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
  res.status(201).json({
    data: newReservation,
  })
}



module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(hasData), 
    hasFirstName,
    hasLastName,
    hasMobileNumber,
    hasReservationDate,
    asyncErrorBoundary(hasValidDate),
    hasReservationTime,
    hasValidTime,
    hasPeople,
    hasValidPeople,
    asyncErrorBoundary(create)
  ],
  read: [asyncErrorBoundary(read)],
  //update: [asyncErrorBoundary(hasData), asyncErrorBoundary(update)]
}
