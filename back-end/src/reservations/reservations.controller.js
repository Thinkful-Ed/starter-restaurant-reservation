/**
 * List handler for reservation resources
 */
const reservationService = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function list(req, res, next) {
  const { date } = req.query
  const data = await reservationService.list(date)
  res.status(200).json({data})
}

module.exports = {
  list,
}
