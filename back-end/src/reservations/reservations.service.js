const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select()
    .where({ reservation_date: date.toString() })
    .whereNot({ "reservations.status": "finished" })
    .whereNot({ "reservations.status": "cancelled" })
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations").select().where({ reservation_id }).first();
}

function updateStatus(reservation_id, data) {
  const { status } = data;

  return knex("reservations")
    .select()
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((reservationData) => reservationData[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function update(reservation_id, data) {
  return knex("reservations")
    .select()
    .where({ reservation_id })
    .update(data, "*")
    .returning("*")
    .then((reservationData) => reservationData[0]);
}

module.exports = {
  list,
  create,
  read,
  updateStatus,
  search,
  update,
};
