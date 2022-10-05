const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select()
    .where({ reservation_date: date.toString() })
    .orderBy("reservation_time");
}

function create() {
  return knex("reservations").select();
}

function read() {
  return knex("reservations").select();
}

module.exports = {
  list,
  create,
  read,
};
