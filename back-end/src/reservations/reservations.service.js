const knex = require("../db/connection");

function postReservation(reservation) {
  return knex("reservations")
    .insert(reservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

function getReservationsByDate(date) {
  return knex("reservations").select("*").where({ reservation_date: date });
}

function getReservationById(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

module.exports = { postReservation, getReservationsByDate, getReservationById };
