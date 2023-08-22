const knex = require('../db/connection');

const tableName = 'tables';

function listAll() {
  return knex(tableName)
  .select('*')
  .orderBy('table_name');
}

module.exports = {
  listAll,
};