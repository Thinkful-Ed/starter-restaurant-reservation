const knex = require("../db/connection");

const tableName = "reservations";

function list() {
  return knex(tableName).select("*").orderBy("reservations.reservation_time");
}

function listDate(date) {
  return knex(tableName)
    .select("*")
    .where({ "reservations.reservation_date": date })
    .orderBy("reservations.reservation_time");
}

module.exports = {
  list,
  listDate,
};
