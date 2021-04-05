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

module.exports = {
  list,
  create: asyncErrorBoundary(create)
};
