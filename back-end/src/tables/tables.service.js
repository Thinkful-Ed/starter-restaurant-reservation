const knex = require('../db/connection');

const tableName = 'tables';

function listAll() {
  return knex(tableName)
  .select('*')
  .orderBy('table_name');
}

function create(newTable) {
  return knex(tableName)
    .insert(newTable)
    .returning('*')
    .then((createdRecords) => createdRecords[0]);
}

function read(table_id) {
  return knex(tableName)
    .select('*')
    .where({ table_id })
    .first();
}

module.exports = {
  listAll,
  create,
};