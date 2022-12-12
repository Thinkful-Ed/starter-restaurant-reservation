const knex = require("../db/connection");

function listAllReservations() {
    return knex("reservations").select("*")
}

function create(reservation) {
    return knex('reservations')
        .insert(reservation)
        .returning("*")
        .then(createdRecords => createdRecords[0])
}




module.exports = {
    list: listAllReservations,
    create,
}