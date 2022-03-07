const knex = require("../db/connection");

function list(reservation_date) {
  if (reservation_date)
    return knex("reservations")
      .where({ reservation_date })
      .whereNot({ status: "finished" })
      .orderBy("reservation_time");
  return knex("reservations").select();
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

function update(status, reservation_id) {
  return knex("reservations")
    .select()
    .where({ reservation_id })
    .update(status, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = { list, create, read, update };
