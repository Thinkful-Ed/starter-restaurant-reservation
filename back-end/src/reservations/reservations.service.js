const knex = require("../db/connection")

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((createdReservations) => createdReservations[0])
}

function list() {
    return knex("reservations")
        .select("*")
}

function listReservationsByDate(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .orderBy("reservation_time")
}

module.exports = {
    create,
    list,
    listReservationsByDate,
}