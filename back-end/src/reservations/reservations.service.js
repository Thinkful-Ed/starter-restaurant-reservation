const knex = require("../db/connection");


function create(reservation) {
    return knex("reservations as r")
    .insert(reservation)
    .returning("*");
}


function list(reservation_date) {
        return knex("reservations")
        .where({reservation_date})
        .orderBy("reservation_time", "asc");
}

module.exports = {
    list,
    create
}