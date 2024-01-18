const knex = require("../db/connection");

function listByDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date : date })
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations")
  .select("*")
  .where({ reservation_id })
  .first();
}

function update(updatedReservation) {
  return knex("reservations")
  .select("*")
  .where({ reservation_id: updatedReservation.reservation_id })
  .update(updatedReservation, "*")
  .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  create,
  read,
  listByDate,
  update,
};
