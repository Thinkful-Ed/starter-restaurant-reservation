const service = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

////////////////
// MIDDLEWARE //
////////////////

async function reservationExists(request, response, next) {
  const { reservation_id } = request.params

  let reservation = await service.read(reservation_id)

  const error = {
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  }

  if (reservation) {
    response.locals.reservation = reservation
    return next()
  }

  next(error)
}

async function validateNewReservation(request, response, next) {
  if (!request.body.data) return next({ status: 400, message: 'Data Missing!' })
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
  } = request.body.data
  if (
    !first_name ||
    !last_name ||
    !mobile_number ||
    !people ||
    !reservation_date ||
    !reservation_time
  )
    return next({
      status: 400,
      message:
        'Please complete the following: first_name, last_name, mobile_number, people, reservation_date, and reservation_time.',
    })
  if (!reservation_date.match(/\d{4}-\d{2}-\d{2}/))
    return next({ status: 400, message: 'reservation_date is invalid!' })
  if (!reservation_time.match(/\d{2}:\d{2}/))
    return next({ status: 400, message: 'reservation_time is invalid!' })
  if (typeof people !== 'number')
    return next({ status: 400, message: 'people is not a number!' })
  response.locals.newReservation = {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
  }
  next()
}

async function isValidDate(request, response, next) {
  const { reservation_date } = request.body.data
  let today = new Date()
  const resDate = new Date(reservation_date).toUTCString()

  if (resDate.includes('Tue')) {
    return next({
      status: 400,
      message: 'Sorry, we are closed on Tuesdays. Please choose another day.',
    })
  }

  if (reservation_date.slice(0, 4) < today.getFullYear()) {
    return next({
      status: 400,
      message: 'Please choose a future date.',
    })
  }

  next()
}

////////////////////
// END MIDDLEWARE //
////////////////////

// Create
async function create(_, response) {
  const data = await service.create(response.locals.newReservation)
  response.status(201).json({
    data: data[0],
  })
}

// Read
async function read(_, response) {
  response.json({
    data: response.locals.reservation,
  })
}

// List
async function list(request, response) {
  const { date } = request.query

  const result = await service.list(date)

  response.json({ data: result })
}

module.exports = {
  create: [
    asyncErrorBoundary(validateNewReservation),
    asyncErrorBoundary(isValidDate),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
}
