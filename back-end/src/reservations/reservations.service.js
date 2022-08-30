const knex = require("../db/connection");

function list(todaysDate) {
    return knex("reservations")
      .select("*")
      .where({"reservation_date": todaysDate})
      .orderBy("reservation_time", "asc")
  }

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}
module.exports = {
  list,
  create,
};
  