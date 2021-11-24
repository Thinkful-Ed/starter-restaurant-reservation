const knex = require("../db/connection");

function list(date) {
  return knex("reservations").select("*").where({ reservation_date: date }).orderBy("reservation_time");
};

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((newReservation) => newReservation[0]);
};

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id: reservation_id }).first();
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
  search,
};
