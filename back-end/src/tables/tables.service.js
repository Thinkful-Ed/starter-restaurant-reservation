const knex = require('../db/connection')

const create = (newTable) => knex('tables').insert(newTable).returning('*')

const read = (tableId) =>
  knex('tables')
    .select('table_name', 'capacity', 'reservation_id')
    .where({ table_id: tableId })
    .first()

const list = () =>
  knex('tables').select('table_name', 'capacity').orderBy('table_name')

module.exports = {
  create,
  read,
  list,
}
