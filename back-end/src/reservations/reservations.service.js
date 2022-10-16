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
  console.log(reservation_id);
  return knex("reservations").select().where({ reservation_id }).first();
}

function update(reservation_id, data) {
  const { status } = data;
  console.log(status);
  return knex("reservations")
    .select()
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((reservationData) => reservationData[0]);
}

module.exports = {
  list,
  create,
  read,
  update,
};
