const knex = require('../db/connection')
const tableName = 'reservations'

function list(date) {
  return knex(tableName)
    .select('*')
    .where({ reservation_date: date })
    .orderBy("reservation_time")
}

module.exports = {
  list,
}
