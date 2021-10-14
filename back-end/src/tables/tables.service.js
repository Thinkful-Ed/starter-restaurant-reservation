const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((tablesArray) => tablesArray[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

function updateReservation(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function readReservation(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function occupied(table_id, reservation_id) {
  return knex("tables")
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id });
}

function free(table_id) {
  return knex("tables")
    .where({ table_id: table_id })
    .update({ reservation_id: null });
}

module.exports = {
  list,
  create,
  read,
  occupied,
  free,
  readReservation,
  updateReservation,
};
