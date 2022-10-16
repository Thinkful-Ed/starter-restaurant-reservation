const knex = require("../db/connection")

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((createdReservation) => createdReservation[0])
}

function list(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
}

module.exports = {
    create,
    list,
}