const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((reservation) => reservation[0]);
}

function list() {
  return knex("reservations").select("*");
}

function listForDate(date) {
  return knex("reservations")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .select("*")
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function updateStatus(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  create,
  list,
  read,
  updateStatus,
  listForDate,
};
