const knex = require("../db/connection");

async function create (reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then(reservations => reservations[0]);
}

async function list (reservation_date) {
  return knex("reservations")
    .where({reservation_date})
}

module.exports = {
  list,
  create,
}