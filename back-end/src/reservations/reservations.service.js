const knex = require("../db/connection");
const table = "reservations";

function listReservations(date) {
  return knex(table).select("*").where({ reservation_date: date });
}

function readReservation(reservationId) {
  return knex(table)
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function create(newReservation) {
  return knex(table)
    .insert(newReservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

function update(updatedReservation) {
  return knex('posts')
    .where({reservation_id : updatedReservation.reservation_id})
    .update(updatedReservation, '*')
    .then((reservation) => reservation[0])
}

module.exports = { listReservations, create, update, readReservation };
