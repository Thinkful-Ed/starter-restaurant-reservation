const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*").orderBy("reservation_time");
}
function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
     .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
     .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation, "*")
    //.returning(["first_name", "last_name"," mobile_number", "people", "reservation_date", "reservation_time"])
    .then((res) => res[0]);
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((res) => res[0]);
}

// for cancelling reservations
function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status })
    .then(() => read(reservation_id));
}

function destroy(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).del();
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_date");
}

module.exports = {
  listByDate,
  list,
  read,
  create,
  update,
  updateStatus,
  destroy,
  search,
};