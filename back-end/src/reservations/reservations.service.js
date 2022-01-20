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
    .whereNot({status: 'finished'})
    .where({ reservation_date: date })
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

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `${mobile_number.replace(/\D/g, "")}`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  list,
  read,
  updateStatus,
  search,
};
