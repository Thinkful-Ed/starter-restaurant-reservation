const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then(res => res[0]);
}

module.exports = {
    create,
}