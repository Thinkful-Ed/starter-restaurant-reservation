/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const service = require('./tables.service')

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
  } else {
    await service.updateTable(knex, table.table_id, reservationId)
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
  }
  if (freeTable) {
    res.status(400)
    error = `table is not occupied`
  }

  await service.freeOccupiedTable(knex, tableId )
  res.json({ data: [], error });
}

module.exports = {
  list,
  create: asyncErrorBoundary(create),
  update: asyncErrorBoundary(update),
  deleteTable: asyncErrorBoundary(deleteTable),
};
