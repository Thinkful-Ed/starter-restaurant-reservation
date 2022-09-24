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
    .update({ status: newStatus })
    .returning("*");
}

function listReservations(date) {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .whereNot({ status: "finished" })
      .orderBy("reservation_time");
  } else {
    return knex("reservations").select("*").whereNot({ status: "finished" });
  }
}

// EXPORTS //

module.exports = {
  createReservation,
  readReservation,
  updateReservationStatus,
  listReservations,
};
