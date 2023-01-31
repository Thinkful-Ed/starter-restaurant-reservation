const knex = require("../db/connection");


function list(date) {
    return knex("reservations")
        .select("*")
        // .whereNotIn("status")
        .where({ reservation_date: date })
        .orderBy("reservation_time")
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((newReservation) => newReservation[0])
}




module.exports = {
    list,
    create,
    
}