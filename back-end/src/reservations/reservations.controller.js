const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * Validation
 */
function isValidReservation(req, res, next) {
  const reservation = { ...req.body }
  if (!reservation.first_name) {
    return next({ status: 400, message: "First name is required." })
  }
  if (!reservation.last_name) {
    return next({ status: 400, message: "Last name is required." })
  }
  if (!reservation.mobile_number) {
    return next({ status: 400, message: "Mobile number is required." })
  }
  if (!reservation.reservation_date) {
    return next({ status: 400, message: "Reservation date is required." })
  }
  if (!reservation.reservation_time) {
    return next({ status: 400, message: "Reservation time is required." })
  }
  if (!reservation.people) {
    return next({ status: 400, message: "Party size is required." })
  }
  res.locals.reservation = reservation
  return next()
}

/**
 * Handlers for reservation resources
 */
async function list(req, res) {
  const date = req.query.date
  const data = date ? await service.listDate(date) : await service.list()
  res.json({ data })
}
async function create(req, res) {
  const reservation = res.locals.reservation
  console.log(reservation)
  const data = await service.create(reservation)
  res.json({ data })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(isValidReservation), create],
}
