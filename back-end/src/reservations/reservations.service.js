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
    .where({ reservation_id: reservationId }); //left db --- right param
}

function list(date) {
  return knex("reservations").select("*").where({ reservation_date: date });
}

module.exports = { list, create, read };
