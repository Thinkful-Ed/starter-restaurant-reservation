const knex = require("../db/connection");

async function list (reservation_date) {
  return knex("reservations")
    .where({reservation_date})
}

module.exports = {
  list,
}