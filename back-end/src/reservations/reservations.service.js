const knex = require("../db/connection");

async function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time", "asc");
}

async function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

async function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

async function update(updatedReservation, reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .update(updatedReservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  create,
  read,
  update,
};
