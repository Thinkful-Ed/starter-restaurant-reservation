const knex = require("../db/connection");

// CRUDL SERVICES FOR 'RESERVATIONS' RESOURCES //

function createReservation(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

function readReservation(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function updateReservationStatus(reservationId, newStatus) {
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .update({ status: newStatus });
}

function listReservations(date) {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time");
  } else {
    return knex("reservations").select("*");
  }
}

// EXPORTS //

module.exports = {
  createReservation,
  readReservation,
  updateReservationStatus,
  listReservations,
};
