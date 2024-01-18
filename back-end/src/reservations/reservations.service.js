const knex = require("../db/connection");

function list() {
  return knex("reservations")
    .select("*")
    .orderBy("reservation_date")
    .orderBy("reservation_time");
}

function create(reservation){
    return knex("reservations")
     .insert(reservation, "*")
}

module.exports = {
  list,
  create,
};
