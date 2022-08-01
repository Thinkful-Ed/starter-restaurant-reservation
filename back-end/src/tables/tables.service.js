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

async function finish(tableId) {
  const table = { reservation_id: null, table_status: null };
  const { reservation_id } = await knex("tables")
    .select("reservation_id")
    .where({ table_id: tableId })
    .first();

  function updateTable() {
    return knex("tables")
      .select("*")
      .where({ table_id: tableId })
      .update(table, "*");
  }

  function deleteRes() {
    return knex("reservations").where({ reservation_id: reservation_id }).del();
  }

  await updateTable();
  await deleteRes();
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

module.exports = { list, create, update, readRes, readTable, finish };
