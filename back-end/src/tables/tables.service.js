const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name", "asc");
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function readReservation(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function destroy(reservation_id) {
  return knex("tables").where({ reservation_id }).del(reservation_id);
}

module.exports = {
  list,
  create,
  read,
  update,
  readReservation,
  destroy,
};
