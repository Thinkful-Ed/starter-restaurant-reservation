const knex = require("../db/connection");

async function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

async function list() {
  return knex("tables").select("*").orderBy("table_name");
}

async function read(table) {
  return knex("tables").select("*").where("table_id", table.table_id);
}

async function update(table) {
  return knex("tables").where("table_id", table.table_id).update(table).returning("*");
}

module.exports = {
  create,
  list,
  update,
  read,
};