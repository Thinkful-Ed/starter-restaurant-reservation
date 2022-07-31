const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(table) {
  return knex("tables")
    .insert(table, "*")
    .then((tables) => tables[0]);
}

function update(resId, tableId) {
  const table = { reservation_id: resId, table_status: "occupied" };
  return knex("tables")
    .select("*")
    .where({ table_id: tableId })
    .update(table, "*");
}

function readRes(resId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: resId })
    .first();
}

function readTable(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

module.exports = { list, create, update, readRes, readTable };
