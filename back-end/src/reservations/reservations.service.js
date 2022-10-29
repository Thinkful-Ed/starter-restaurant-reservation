const { select } = require("../db/connection");
const knex = require("../db/connection");
// const mapProperties = require("../utils/map-properties");

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservation_id})
        .first();
}

function getReservationsByDate(date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date : date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_time");;
}

function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRes) => createdRes[0]);
}

module.exports = {
    read,
    getReservationsByDate,
    create,
};