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
  const dateFormat = /^\d{4}-\d{1,2}-\d{1,2}$/
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

function reservationIsNotForTuesday(req, res, next) {
  const { reservation_date } = req.body.data
  const date = new Date(reservation_date)
  if (date.getDay() !== 1) {
    return next()
  } else {
    return next({
      status: 400,
      message: "Invalid Date: We are closed on Tuesdays."
    })
  }
}

function reservationIsForFuture(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data
  const present = new Date()
  const reservation = new Date(`${reservation_date} ${reservation_time}`)
  if (reservation > present) {
    return next()
  } else {
    return next({
      status: 400,
      message: "Invalid Time or Date: Please set reservations for the future only."
    })
  }
}

function reservationIsForOpenHours(req, res, next) {
  const { reservation_time } = req.body.data
  if (reservation_time >= "10:30" && reservation_time <= "21:30") {
    return next()
  } else {
    return next({
      status:400,
      messages: "Invalid Time: Please schedule reservations between 10:30 AM and 9:30 PM."
    })
  }
}

async function reservationExists(req, res, next) {
  const reservationId = req.params.reservation_id
  const existingReservation = await reservationsService.readReservation(
    reservationId
  )
  if (existingReservation) {
    res.locals.reservation = existingReservation
    return next()
  } else {
    return next({
      status:404,
      message: `Reservation ${reservationId} does not exist.`,
    })
  }
}

function statusPropertyIsNotSeatedOrFinished(req, res, next) {
  const { status } = req.body.data
  if (status !== "seated" && status !== "finished") {
    return next()
  } else {
    return next({
      status: 400,
      message: `${status} is an invalid status for a new reservation.`,
    })
  }
}

function statusPropertyIsValid(req, res, next) {
  const { status } = req.body.data
  const validStatuses = ["booked", "seated", "finished"]
  if (validStatuses.includes(status)) {
    return next()
  } else {
    return next({
      status: 400,
      message: `Status unknown: Status must be booked, seated, or finished.`
    })
  }
}

function statusPropertyIsNotFinished(req, res, next) {
  const status = res.locals.reservation.status;
  if (status !== "finished") {
    return next();
  } else {
    return next({
      status: 400,
      message: `A finished reservation cannot be updated.`,
    });
  }
}

// REQUEST HANDLERS //

async function createReservation(req, res) {
  const newReservation = req.body.data
  const responseData = await reservationsService.createReservation(
    newReservation
  )
  res.status(201).json({ data: responseData })
}

async function readReservation(req, res) {
  const reservationId = req.params.reservation_id
  const responseData = await reservationsService.readReservation(reservationId)
  res.status(200).json({ data: responseData })
}

async function updateReservationStatus(req, res, next) {
  const reservationId = req.params.reservation_id;
  const newStatus = req.body.data.status;
  const responseData = await reservationsService.updateReservationStatus(
    reservationId,
    newStatus
  );
  res.status(200).json({ data: responseData });
}

async function listReservations(req, res) {
  const { date } = req.query
  if (date) {
    const responseData = await reservationsService.listReservations(date)
    res.status(200).json({ data: responseData })
  } else {
    const today = new Date().toISOString().slice(0, 10)
    const responseData = await reservationsService.listReservations(today)
    res.status(200).json({ data: responseData })
  }
}

// EXPORTS //

module.exports = {
  createReservation: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    datePropertyIsValid,
    timePropertyIsValid,
    peoplePropertyIsValid,
    reservationIsNotForTuesday,
    reservationIsForFuture,
    reservationIsForOpenHours,
    statusPropertyIsNotSeatedOrFinished,
    asyncErrorBoundary(createReservation),
  ],
  readReservation: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(readReservation)
  ],
  updateReservationStatus: [
    bodyDataHas("status"),
    asyncErrorBoundary(reservationExists),
    statusPropertyIsValid,
    statusPropertyIsNotFinished,
    asyncErrorBoundary(updateReservationStatus),
  ],
  listReservations: [asyncErrorBoundary(listReservations)]
};