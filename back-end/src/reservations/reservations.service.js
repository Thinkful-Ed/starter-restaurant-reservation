const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then(res => res[0]);
}

function list(date) {
    return knex("reservations")
        .select("*")
        .where({ "reservation_date": date })
        .orderBy("reservation_time")
}

module.exports = {
    create,
    list,
}