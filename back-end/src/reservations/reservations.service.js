const knex = require("../db/connection");

function list(reservation_date) {
  return knex("reservations")
    .where({ reservation_date })
    .orderBy("reservation_time");
}

function create(formData) {
  return knex("reservations")
    .insert(formData)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = { list, create };
