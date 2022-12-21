const knex = require("../db/connection");

function postReservation(reservation) {
  return knex("reservations")
    .insert(reservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = { postReservation };
