const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((res) => res[0]);
}

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot('status', 'finished')
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({reservation_id})
    .first();
}

function updateStatus(reservation_id, status) {
  return knex("reservations")
    .select("*")
    .where({reservation_id})
    .update({status})
    .returning("*")
    .then(res => res[0])
}

module.exports = {
  create,
  list,
  read,
  updateStatus,
};
