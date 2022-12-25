const knex = require("../db/connection");

function postTables(table) {
  return knex("tables")
    .insert(table, "*")
    .then((createdRecords) => createdRecords[0]);
}

function getTableById(table) {
  return knex("tables").select("*").where({ table_id: table.table_id }).first();
}

function getAllTables() {
  return knex("tables").select("*");
}

module.exports = { post: postTables, get: getTableById, getAll: getAllTables };
