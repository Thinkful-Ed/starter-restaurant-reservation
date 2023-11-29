const knex = require("../db/connection");

/**
 * Makes read request to the database for reservations.
 */
function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

/**
 * Makes list request to the database for reservations ordered by reservation time.
 */
function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

/**
 * Makes create request to the database for a reservation.
 */
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}
module.exports = {
  read,
  list,
  create,
};
