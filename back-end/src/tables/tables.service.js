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
    .where({ table_id: table_id })
    .first();
}

function seat(table_id, reservation_id) {
  return knex(tableName)
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id })
    .returning('*')
    .then((updatedRecords) => updatedRecords[0]);
}


module.exports = {
  listAll,
  create,
  read,
  seat,

};