const knex = require("../db/connection");
const reservations = "reservations";

async function list(reservation_date) {
  return knex(reservations)
    .where({ reservation_date })
    .orderBy("reservation_time", "asc");
}

function create(newReservation) {
  return knex(reservations)
    .insert(newReservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

async function update() {}

module.exports = { list, create };
