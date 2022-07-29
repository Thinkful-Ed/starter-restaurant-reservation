const knex = require("../db/connection");

async function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot("reservations.status", "finished")
    .whereNot("reservations.status", "cancelled")
    .orderBy("reservation_time", "asc");
}

async function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

async function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

async function update(updatedReservation, reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .update(updatedReservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  list,
  create,
  read,
  update,
  search,
};
