/**
 * List + listDate service for reservation resources
 */
const knex = require("../db/connection")

function list() {
  return knex("reservations").select("*")
}

function listDate(date) {
  return knex("reservations as r")
    .select("*")
    .where({ "r.reservation_date": date })
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservations) => createdReservations[0])
}

module.exports = {
  list,
  listDate,
  create,
}
