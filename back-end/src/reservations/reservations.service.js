const knex = require('../db/connection')
const tableName = 'reservations'

function list(date) {
  if (date) {
    return knex(tableName)
    .select('*')
    .where({ reservation_date: date })
    .orderBy('reservation_time')
  }
  return knex(tableName) 
    .select('*')
    .orderBy('reservation_time')
}

function create(reservation) {
  return knex(tableName)
    .insert(reservation)
    .returning('*')
    .then((createdReservations) => createdReservations[0])
}

module.exports = {
  list,
  create,
}
