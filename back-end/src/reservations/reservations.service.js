const knex = require("../db/connection");

async function list(date) {
  // const reservation_date = date;
  // return knex("reservations").select("*").where({ reservation_date }).orderBy("reservation_time","asc");
  return knex("reservations").select("*");
}

function create(newReservation) {
    return knex("reservations").insert(newReservation).returning("*");
}

module.exports = {
  list, create
};