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
 * Makes list request to the database for reservations on a given date, ordered by reservation time.
 */
function list(date) {
  return knex("reservations")
    .select("*")
    .whereNot({ status: "finished" })
    .andWhere({ reservation_date: date })
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

function updateStatus(reservation_id, newStatus) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .update({
      status: newStatus,
    })
    .returning("*")
    .then((updatedRecords) => updatedRecords[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function editReservation(reservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation.reservation_id })
    .update(reservation)
    .returning("*")
    .then((updatedRecords) => updatedRecords[0]);
}
module.exports = {
  read,
  list,
  create,
  updateStatus,
  search,
  editReservation,
};
