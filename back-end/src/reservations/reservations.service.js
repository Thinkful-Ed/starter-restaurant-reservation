const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservation_time");
}

function listByMobileNumber(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createRecords) => createRecords[0]);
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function update(reservation_id, status) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((updatedRecord) => updatedRecord[0]);
}

function edit(reservation_id, updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecord) => updatedRecord[0]);
}

module.exports = {
  list,
  listByMobileNumber,
  create,
  read,
  update,
  edit,
};
