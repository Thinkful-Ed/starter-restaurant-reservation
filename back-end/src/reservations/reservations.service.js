const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

async function list(date) {
  return knex("reservations").select("*").where("reservation_date", date).orderBy("reservation_time");
}

async function read(reservationId) {
  return knex("reservations").select("*").where("reservation_id", reservationId)
}

module.exports = {
  create,
  list,
  read,
};