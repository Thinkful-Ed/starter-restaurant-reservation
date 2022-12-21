const knex = require("../db/connection");

function postReservation(reservation) {
  return knex("reservations")
    .insert(reservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

function getReservationsByDate(date) {
  return knex("reservations").select("*").where({ reservation_date: date });
}

module.exports = { postReservation, getReservationsByDate };
