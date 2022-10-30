const knex = require("../db/connection")

// CRUD SERVICES //

function createReservation(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((createdRecord) => createdRecord[0])
}

function readReservation(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .first()
}

async function updateReservation(reservationId, updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .update(updatedReservation, "*")
        .then((updatedRecord) => updatedRecord[0])
}

function updateReservationStatus(reservationId, newStatus) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .update({ status: newStatus })
        .returning("*")
        .then((updatedRecord) => updatedRecord[0]) 
}

function listReservations(date, mobile_number) {
    if (date) {
        return knex("reservations")
            .select("*")
            .where({ reservation_date: date })
            .whereNot({ status: "finished" })
            .orderBy("reservation_time")
    } else if (mobile_number) {
        return knex("reservations")
            .whereRaw(
                "translate(mobile_number, '() -', '') like ?",
                `%${mobile_number.replace(/\D/g, "")}%`
            )
            .orderBy("reservation_date");        
    } else {
        return knex("reservations").select("*").whereNot({ status: "finished" })
    }
}

// EXPORTS //

module.exports = {
    createReservation,
    readReservation,
    updateReservation,
    updateReservationStatus,
    listReservations,
}