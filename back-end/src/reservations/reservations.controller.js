/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const service = require('./reservations.service')
const serviceTable = require('../tables/tables.service')

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
  if (!reservation) {
    res.status(404)
    return res.json({
      error: `reservation id ${reservationId} not found`
    })
  }

  res.status(200)
  res.json({
    data: reservation
  });
}

async function updateStatus(req, res) {
  const knex = req.app.get('db')
  const status = req.body.data.status
  const reservationId = req.params.reservation_id;
  const reservation = await serviceTable.getReservation(knex, reservationId)
  const validStatus = await service.validateStatus(status)
  const reservationResult = await service.finishedStatus(knex, reservationId)

  // console.log("rservation status ", reservationStatus)


  let error
  if (!reservation) {
    res.status(404)
    error = `reservation id ${reservationId} not found`
  } else if (!validStatus) {
    res.status(400)
    error = `status ${status} is not valid`
  } else if (reservationResult.status === 'finished') {
    console.log("yess it is")
    res.status(400)
    error = `status finished cannot be updated`
  }
  await service.changeStatus(knex, status, reservationId)
  res.json({ data: { status: status }, error });
}

module.exports = {
  list,
  create: asyncErrorBoundary(create),
  show,
  updateStatus
};
