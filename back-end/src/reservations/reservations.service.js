const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*").orderBy("reservation_time");
}

function listOnDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time");
}


function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0])
}

module.exports = {
    list,
    listOnDate,
    create,
}