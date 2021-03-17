const knex = require("../db/connection");

const tableName = "reservations";

function list() {
  return knex(tableName);
}

function create(reservation) {
  return knex(tableName)
    .insert(reservation, "*")
    .then((createdReservations) => createdReservations[0]);
}

module.exports = {
  create,
  list,
};
