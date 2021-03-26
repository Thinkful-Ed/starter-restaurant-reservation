const knex = require("../db/connection");

const tableName = "tables";

function list(date) {
  return knex(tableName)
}

function create(table) {
  return knex(tableName)
    .insert(table, "*")
    .then((createdTables) => createdTables[0]);
}

module.exports = {
  create,
  list,
};
