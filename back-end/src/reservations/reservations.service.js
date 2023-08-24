const knex = require("../db/connection");
const { today } = require("../utils/date-time");

function listByDate(date = today()) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot("status", "finished")
        .orderBy("reservation_time");
}

function listByNumber(mobile_number) {
    return (
        knex("reservations")
        .select("*")
        // .where("mobile_number", "like", `%${mobile_number}%`)
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
        .orderBy("reservation_time")
    );
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdReservations) => createdReservations[0]);
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .first();
}

function update(reservation_id, updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .update(updatedReservation)
        .returning("*")
        .then((updatedReservation) => updatedReservation[0]);
}

function changeStatus(reservation_id, status) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .update({ status: status })
        .returning("*")
        .then((updatedReservation) => updatedReservation[0]);
}

module.exports = {
    listByDate,
    listByNumber,
    create,
    read,
    update,
    changeStatus,
};