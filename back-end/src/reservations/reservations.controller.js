/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const service = require('./reservations.service')

async function list(req, res) {
  const knex = req.app.get('db')

  let reservations = await service.getReservations(knex, req.query.date)
  res.json({
    data: await reservations
  });
}

async function create(req, res) {
  const knex = req.app.get('db')
  service.validateParams(req.body.data)
  await service.createReservation(knex, req.body.data)

  res.status(201)
  res.json({
    data: req.body.data
  });
}

async function show(req, res) {
  const knex = req.app.get('db')
  const reservationId = req.params.reservation_Id;
  let reservation = await service.getReservationById(knex, reservationId)

  res.status(200)
  res.json({
    data: reservation
  });
}

module.exports = {
  list,
  create: asyncErrorBoundary(create),
  show
};
