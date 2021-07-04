const knex = require("../db/connection");


function read(reservationId) {
    return knex("reservations").select("*").where({ reservation_id: reservationId }).first();
  }

function create(reservation) {
    return knex("reservations as r")
    .insert(reservation)
    .returning("*");
}

function search(mobile_number) {
    return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
  }


function list(reservation_date) {
        return knex("reservations")
        .where({reservation_date})
        .whereNot({status: "finished"})
        .orderBy("reservation_time", "asc");
}

function update(updatedReservation) {
    return knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation)
    .returning("*")
    .then((updatedRecords) => updatedRecords[0])
}

module.exports = {
    read,
    list,
    create,
    update,
    search
}