const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((reservation) => reservation[0]);
}

function list() {
  return knex("reservations").select("*");
}

module.exports = {
  create,
  list,
};
