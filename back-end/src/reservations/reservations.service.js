const knex = require("../db/connection");
const table = "reservations";

function listReservations(date) {
  console.log(date)
  return knex(table).select("*").where({ reservation_date: date });
}

function create(newReservation) {
  return knex(table)
    .insert(newReservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

module.exports = { listReservations, create };
