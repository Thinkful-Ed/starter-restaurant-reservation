const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

function list(date) {
  return knex("reservations").select("*").where("reservation_date", date).orderBy("reservation_time");
}

function read(reservationId) {
  return knex("reservations").select("*").where("reservation_id", reservationId).first()
}

module.exports = {
  create,
  list,
  read,
};