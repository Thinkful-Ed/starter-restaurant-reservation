const { select } = require("../db/connection");
const knex = require("../db/connection");
// const mapProperties = require("../utils/map-properties");

function getReservationsByDate(date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date : date });
}

function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
    getReservationsByDate,
    create,
};