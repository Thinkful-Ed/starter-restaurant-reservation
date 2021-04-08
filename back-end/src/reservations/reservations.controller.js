/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const service = require('./reservations.service')

async function list(req, res) {
  const knex = req.app.get('db')

  let reservations = await service.getReservations(knex, req.query)
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

async function update(req, res) {
  const knex = req.app.get('db')
  service.validateParams(req.body.data)
  const reservationId = req.params.reservation_Id;
  const reservation = await service.getReservation(knex, reservationId)

  let error
  if (!reservation) {
    res.status(404)
    error = `reservation id ${reservationId} not found`
  } else {
    res.status(200)
    await service.updateReservation(knex,req. reservationId, req.body.data)
  }


  res.json({
    data: req.body.data,
    error: error
  });
}

async function show(req, res) {
  const knex = req.app.get('db')
  const reservationId = req.params.reservation_Id;
  let reservation = await service.getReservation(knex, reservationId)
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
  const reservation = await service.getReservation(knex, reservationId)
  const isStatusValid = await service.isStatusValid(status)

  let error
  if (!reservation) {
    res.status(404)
    error = `reservation id ${reservationId} not found`
  } else if (!isStatusValid) {
    res.status(400)
    error = `status ${status} is not valid`
  } else if (reservation.status === 'finished') {
    res.status(400)
    error = `status finished cannot be updated`
  }
  await service.updateStatus(knex, reservationId, status)
  res.json({ data: { status: status }, error });
}

module.exports = {
  list,
  create: asyncErrorBoundary(create),
  show,
  update: asyncErrorBoundary(update),
  updateStatus
};
