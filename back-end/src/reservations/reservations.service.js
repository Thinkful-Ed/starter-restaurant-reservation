const knex = require("../db/connection");

/**
 * Makes read request to the database for a reservation.
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
 * Makes create request to the database for a new reservation.
 */
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(reservation_id, newStatus) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .update({
      status: newStatus,
    })
    .returning("*")
    .then((updatedRecords) => updatedRecords[0]);
}
module.exports = {
  read,
  list,
  create,
  update,
};
