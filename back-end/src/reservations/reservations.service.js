const knex = require("../db/connection");

function list(date) {
  if (date) {
    return knex("reservations as r").select().where({ reservation_date: date });
  }
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = { list, create };
