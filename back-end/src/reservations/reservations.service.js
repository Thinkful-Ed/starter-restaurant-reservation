const knex = require("../db/connection");

function list() {
  return knex("reservations")
    .select("*")
    .orderBy("reservations.reservation_date");
}

function create(reservation) {
  return knex("reservations as r").insert(reservation);
}

function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservations.reservation_time");
}

module.exports = {
  list,
  create,
  listByDate,
};
