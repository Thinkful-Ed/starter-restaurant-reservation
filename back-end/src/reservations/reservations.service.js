const knex = require("../db/connection");

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .then((result) => result[0]);
}

function list() {
  return knex("reservations").select("*");
}

function listByDate(date) {
  return knex("reservations")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function listByPhone(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy(`reservation_date`);
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((result) => result[0]);
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  read,
  list,
  listByDate,
  listByPhone,
  create,
  update,
};
