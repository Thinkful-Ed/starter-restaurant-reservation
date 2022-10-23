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

function updateStatus(reservationId, newStatus) {
    return knex("reservations")
        .where({ reservation_id: reservationId })
        .update({ status: newStatus })
        .returning("*")
}

function list(date) {
    if (date) {
        return knex("reservations")
            .select("*")
            .where({ reservation_date: date })
            .whereNot({ status: "finished" })
            .orderBy("reservation_time")
    } else {
        return knex("reservations").select("*").whereNot({ status: "finished" })
    }
}

module.exports = {
    create,
    read,
    updateStatus,
    list,
}