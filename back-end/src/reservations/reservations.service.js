const knex = require("../db/connection");
const reservationsController = require("./reservations.controller");


function create(reservation){
  return knex("reservations")
  .insert(reservation)
  .returning("*")
  .where({reservation_date: reservation.reservation_date});
}

function read (reservationId){
  return knex("reservations")
  .select("*")
  .where({reservationId: reservation_id})
}

function list(date) {
  return knex("reservations")
  .select("*")
  .where({ reservation_date: date });
}



module.exports = { list, create, read };
