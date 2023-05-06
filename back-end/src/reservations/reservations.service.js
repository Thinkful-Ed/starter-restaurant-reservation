const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}
function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservations.post_id })
    .update(updatedReservation, "*");
}

function destroy(reservationId) {
  return knex("reservations").where({ reservation_id: reservationId }).del();
}

function list() {
  return knex("reservations").select("*").orderBy("reservation_time");
}

// function listByDate(reservation_date) {
//   return knex("reservations")
//     .select("*")
//     .where({ reservation_date })
//     .orderBy("reservation_time");
// }

function list(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time");
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
  list,
};
