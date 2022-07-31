const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation, "*")
    .then((reservations) => reservations[0]);
}

function read(id) {
  return knex("reservations").select("*").where({ reservation_id: id }).first();
}

module.exports = {
  list,
  create,
  read,
};
