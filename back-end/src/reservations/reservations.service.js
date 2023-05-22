const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

function list(date) {
  return knex("reservations").select("*").where("reservation_date", date).whereNot("status", "finished").orderBy("reservation_time");
}

function read(reservationId) {
  return knex("reservations").select("*").where("reservation_id", reservationId).first()
}

function update(reservation_id, status) {
  return knex("reservations").where("reservation_id", reservation_id).update({status}).select("*").returning("*")
}

module.exports = {
  create,
  list,
  read,
  update,
};