const { KnexTimeoutError } = require("knex");
const { select } = require("../db/connection");
const knex = require("../db/connection");
// const mapProperties = require("../utils/map-properties");

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}

function getReservationsByDate(date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date : date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_time");;
}

function getReservationsByNumber(mobile_number) {
    return knex("reservations")
    .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
}

function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRes) => createdRes[0]);
}

function updateStatus(reservation) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation.reservation_id })
    .update({ status: reservation.status }, "*")
    .then((updatedReservation) => updatedReservation[0]);
}

// function updateStatus(reservation_id, status) {
//     return knex("reservations")
//     .select("*")
//     .where({ reservation_id })
//     .update({ status })
//     .returning("*")
//     .then((updated)=> updated[0]);
// }

function update(reservation) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation.reservation_id })
    .update(reservation, "*")
    .then((updatedReservation) => updatedReservation[0])
}

module.exports = {
    read,
    getReservationsByDate,
    getReservationsByNumber,
    create,
    updateStatus,
    update
};