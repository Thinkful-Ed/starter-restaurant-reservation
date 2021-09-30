const Knex = require("knex");
const { KnexTimeoutError } = require("knex");
const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*")
};

function create(reservation) {
  return knex('reservations')
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0])
}

function read(reservationId) {
  const newNum = Number(reservationId);
  let query = await knex("reservations").select("*").where({ reservation_id: reservationId });
  return query;
}

function update(updatedReservation) {
  return knex('reservations')
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0])
}

function destroy(reservationId) {
  return knex("reservations").where({ reservation_id: reservationId }).del();
}

module.exports = {
  list,
  create,
  read,
  update,
  destroy,
}