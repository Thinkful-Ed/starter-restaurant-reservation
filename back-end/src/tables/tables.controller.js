/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const service = require('./tables.service')
const serviceReservation = require('../reservations/reservations.service')

async function list(req, res) {
  const knex = req.app.get('db')

  let tables = await service.getTables(knex)

  res.json({
    data: await tables
  });
}

async function create(req, res) {
  const knex = req.app.get('db')
  service.validateParams(req.body.data)
  await service.createTable(knex, req.body.data)
  res.status(201)
  res.json({
    data: req.body.data
  });
}

async function update(req, res) {
  const knex = req.app.get('db')
  service.validateUpdateParams(req.body)
  const tableId = req.params.table_id
  const reservationId = req.body.data.reservation_id
  const reservation = await service.getReservation(knex, reservationId)
  const table = await service.getFreeTable(knex, tableId)
  const reservationStatus = await serviceReservation.finishedStatus(knex, reservationId)

  let error

  if (!reservation) {
    res.status(404)
    error = `reservation id ${reservationId} not found`
  } else if (!table) {
    res.status(400)
    error = "table is occupied"
  } else if (!service.hasCapacity(table, reservation)) {
    res.status(400)
    error = "insufficient capacity"
  } else if (reservationStatus.status === 'seated') {
    res.status(400)
    error = "reservation is already seated"
  }
  else {
    await service.updateTable(knex, table.table_id, reservationId)
    await service.updateStatus(knex, reservationId)
  }

  res.json({ data: [], error });
}

async function deleteTable(req, res) {
  const knex = req.app.get('db')
  const tableId = req.params.table_id
  const table = await service.getTable(knex, tableId)
  const freeTable = await service.getFreeTable(knex, tableId)

  let error
  if (!table) {
    res.status(404)
    error = `table id ${tableId} not found`
  } else if (freeTable) {
    res.status(400)
    error = `table is not occupied`
  } else {
    await service.freeOccupiedTable(knex, tableId)
    await service.changeStatusTofinish(knex, tableId, table.reservation_id)
  }

  res.json({ data: [], error });
}

module.exports = {
  list,
  create: asyncErrorBoundary(create),
  update: asyncErrorBoundary(update),
  deleteTable: asyncErrorBoundary(deleteTable),
};
