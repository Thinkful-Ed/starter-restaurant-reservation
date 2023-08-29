const knex = require("../db/connection");
const { today } = require("../utils/date-time");


// Query the database for reservations matching the date and not finished
function listByDate(date = today()) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot("status", "finished")
        .orderBy("reservation_time");
}

// Query the database for reservations matching the mobile number
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

// Insert the reservation data into the database
function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdReservations) => createdReservations[0]);
}

// Query the database for a reservation with the specified ID
function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .first();
}

// Query the database to update the reservation with the specified ID
function update(reservation_id, updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .update(updatedReservation)
        .returning("*")
        .then((updatedReservation) => updatedReservation[0]);
}

// Update the reservation's status in the database
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