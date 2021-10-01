const knex = require("../db/connection");

function list(date) {
  if (date) {
    return knex("reservations").select().where({ reservation_date: date }).orderBy("reservation_time");
  } else return knex("reservations").select();
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = { list, create };
