const knex = require("../db/connection")

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((createdReservation) => createdReservation[0])
}

function read(reservationId) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first()
}

function list(date) {
    if (date) {
        return knex("reservations")
            .select("*")
            .where({ reservation_date: date })
            .orderBy("reservation_time")
    } else {
        return knex("reservations").select("*")
    }
}

module.exports = {
    create,
    read,
    list,
}