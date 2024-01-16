const knex = require("../db/connection");

function listByDate(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time");
}

function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
    create,
    listByDate,
}