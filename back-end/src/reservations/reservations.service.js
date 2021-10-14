const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((reservationsArray) => reservationsArray[0]);
}

function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first(); //left db --- right param
}

function list(date, mobile_number) {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .whereNotIn("status", ["finished", "cancelled"])
      .orderBy("reservation_time", "asc");
  }
  if (mobile_number) {
    return knex("reservations")
      .select("*")
      .where("mobile_number", "like", `${mobile_number}%`);
  }

  return knex("reservations").select("*");
}

function update(reservation_id, updatedReservation) {
  return knex("reservations")
    .where({ reservation_id })
    .update(updatedReservation, "*")
    .then((result) => result[0]);
}

function updateStatus(reservation_id, status) {
  return knex("reservations").where({ reservation_id }).update({ status }, "*");
}

module.exports = { list, create, read, update, updateStatus };
