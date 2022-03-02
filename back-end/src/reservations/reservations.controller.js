/**
 * List handler for reservation resources
 */
const reservationService = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

function list(req, res, next) {
  reservationService
    .list()
    .then((data) => res.json({ data }))
    .catch(next)
}
module.exports = {
  list,
}
