const knex = require("../db/connection");

//C
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((tablesArray) => tablesArray[0]);
}

//R
function readReservation(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

//U
function updateReservation(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}

//L
function list() {
  return knex("tables").select("*").orderBy("table_name");
}

//used for updating a table reservation
function occupied(table_id, reservation_id) {
  return knex("tables")
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id });
}

//finish a table by setting res_id to null
function unseatTable(table_id) {
  return knex("tables")
    .where({ table_id: table_id })
    .update({ reservation_id: null });
}

module.exports = {
  list,
  create,
  occupied,
  unseatTable,
  readReservation,
  updateReservation,
};
