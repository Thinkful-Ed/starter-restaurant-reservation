/**
 * List handler for reservation resources
 */
const reservationService = require('./reservations.services')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function list(req, res, next) {
  const data = await reservationService.list
  res.json({ data })
}

module.exports = {
  list,
}
