const { table } = require("../db/connection");

const validateParams = (params) => {
  const { table_name, capacity } = params;
  if (!table_name || table_name === "")
    throw new Error("table_name cannot be blank")
  if (matchString(table_name))
    throw new Error("table_name must contain 2 letters")
  if (!capacity || capacity === "")
    throw new Error("capacity cannot be blank or atleast must be 1")
  if (!Number.isInteger(capacity))
    throw new Error("capacity should be a number")
}

const matchString = (str) => {
  let matchString = str.match(/([A-Za-z])/g)
  return (!(matchString && matchString.length >= 2))
}

const createTable = (knex, data) => {
  return knex('tables').insert(data)
}

const getTables = (knex) => {
  return knex('tables').select().orderBy('table_name')
}

const updateTable = (knex, tableId, reservationId) => {
  return knex('tables').where({ table_id: tableId}).update({'reservation_id': reservationId})
}

const freeOccupiedTable = (knex, tableId) => {
  return knex('tables').where({table_id: tableId}).update({'reservation_id': null})
}

const validateUpdateParams = (params) => {
  const { data } = params;
  if (!data)
    throw new Error("data must exist")
  if (!data.reservation_id)
    throw new Error("reservation_id is missing")
}

const getReservation = (knex, id) => {
  return knex('reservations').where({ 'reservation_id': id }).first()
}

const hasCapacity = (table, reservation) => {
  return table.capacity >= reservation.people
}

const getFreeTable = (knex, tableId) => {
  return knex('tables').where({ table_id: tableId, reservation_id: null}).first()
}

const getTable = (knex, tableId) => {
  return knex('tables').where({ 'table_id': tableId }).first()
}

const validateAvailability = (knex, reservationId) => {
  return knex('tables').where({reservation_id: reservationId}).first()
}

module.exports = {
  validateParams,
  createTable,
  getTables,
  getFreeTable,
  updateTable,
  validateUpdateParams,
  getReservation,
  hasCapacity,
  validateAvailability,
  freeOccupiedTable,
  getTable
}
