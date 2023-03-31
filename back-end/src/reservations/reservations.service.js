const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations").insert(newReservation).returning("*").then((createdRecords) => createdRecords[0]);
}

function list() {
    return knex("reservations").select("*").orderBy("reservation_time");
}

function listByDate(date) {
    return knex("reservations").select("*").where({ reservation_date: date}).orderBy("reservation_time");
}

function read(reservation_id) {
    return knex("reservations").select("*").where({ reservation_id: reservation_id}).first();
}

module.exports = {
    create,
    list,
    listByDate,
    read,
}