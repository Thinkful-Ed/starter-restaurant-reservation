const knex = require("../db/connection");

function list() {
  return knex("reservations")
    .select("*")
    .orderBy("reservation_date", "asc")
    .orderBy("reservation_time", "asc");
}  

function listToday(todaysDate) {
    return knex("reservations")
      .select("*")
      .where({"reservation_date": todaysDate})
      .orderBy("reservation_time", "asc")
  }

function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_id": reservationId })
    .first();
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}
module.exports = {
  list,
  listToday,
  read,
  create,
};
  