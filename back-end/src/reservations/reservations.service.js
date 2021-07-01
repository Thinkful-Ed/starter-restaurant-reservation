const knex = require("../db/connection");

function read(reservationId) {
    return knex("reservations").select("*").where({ reservation_id: reservationId }).first();
  }

function create(reservation) {
    return knex("reservations as r")
    .insert(reservation)
    .returning("*");
}


function list(reservation_date) {
        return knex("reservations")
        .where({reservation_date})
        .orderBy("reservation_time", "asc");
}

module.exports = {
    read,
    list,
    create
}