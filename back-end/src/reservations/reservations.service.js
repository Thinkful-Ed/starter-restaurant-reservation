const knex = require("../db/connection");

function list(reservation_date) {
  if (reservation_date)
    return knex("reservations")
      .where({ reservation_date })
      .whereNot({ status: "finished" })
      .andWhereNot({ status: "cancelled" })
      .orderBy("reservation_time");
  return knex("reservations").select();
}

function listQueryNumbers(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function create(formData) {
  return knex("reservations")
    .insert(formData)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations").select().where({ reservation_id }).first();
}

function update(formData, reservation_id) {
  return knex("reservations")
    .select()
    .where({ reservation_id })
    .update(formData, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function updateStatus(status, reservation_id) {
  return knex("reservations")
    .select()
    .where({ reservation_id })
    .update(status, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = { list, listQueryNumbers, create, read, update, updateStatus };
