const knex = require("../db/connection");


function list(date) {
    return knex("reservations")
        .select("*")
        // .whereNotIn("status")
        .where({ reservation_date: date })
        .orderBy("reservation_time")
        // .then((reservationsList) => "reservation_status" != 'finished')
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((newReservation) => newReservation[0])
}

// function read(reservationId) {
//     return knex('reservations as r')
//         .join("tables as t", "r.reservation_id", "t.reservation_id")
//         .select("t.table_id", "r.reservation_id", "t.status")
//         .where({ reservation_id: reservationId })
//         .first()
// }


function read(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .first()
}

function update(updatedRes) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedRes.reservation_id })
        .update(updatedRes, "*")
        .then((updated) => updated[0])
}

function search(mobile_number) {
    return knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
       .orderBy("reservation_date") 
}


module.exports = {
    list,
    create,
    read,
    update,
    search,
}