const knex = require("../db/connection");

async function list () {
  return knex("reservations")
    .select("*");
}

async function create (reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then(reservations => reservations[0]);
}

module.exports = {
  list,
  create,
}