const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*").orderBy("reservation_time");
}

function listDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function create(newReservation) {
  return knex("reservations").insert(newReservation);
}

function destroy(reservation_id) {
  return knex("reservations").where({ reservation_id }).del();
}

module.exports = {
  list,
  listDate,
  read,
  create,
  delete: destroy,
};
