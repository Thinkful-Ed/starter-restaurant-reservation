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

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function readReservation(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function occupy(table_id, reservation_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id, status: "occupied" });
}

function free(table_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id: null, status: "free" });
}

function updateReservation(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status: status });
}

module.exports = {
  list,
  create,
  read,
  readReservation,
  occupy,
  free,
  updateReservation,
};
