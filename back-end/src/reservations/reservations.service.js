const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function listDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
}

module.exports = {
  list,
  listDate,
}