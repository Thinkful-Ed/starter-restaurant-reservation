const knex = require("../db/connection");

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function list(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .orderBy("reservation_time");
}

function read(resId) {
    return knex("reservations").select("*").where({ reservation_id: resId }).first();
}

module.exports = {
    create,
    list,
    read,
}
