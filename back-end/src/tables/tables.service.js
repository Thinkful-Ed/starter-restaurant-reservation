const knex = require("../db/connection");

const tableName = "tables";

function list(date) {
  return knex(tableName)
    .orderBy("table_name");
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
