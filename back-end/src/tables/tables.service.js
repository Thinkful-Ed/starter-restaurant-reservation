const { KnexTimeoutError } = require("knex");
const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("tables.table_name");
}

function create(table) {
  return knex("tables").insert(table);
}

module.exports = { list, create };
