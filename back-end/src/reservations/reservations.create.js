const knex = require("../db/connection");

//reservation listings by date and time
function list(date) {
    return knex("reservations")
        .select('*')
        .where({ reservation_date: date})
        .whereNot({ status: "finished" })
        .andWhereNot({ status: "cancelled"})
        .orderBy("reservation_time");
}

//posts new reservation
function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createRecords) => createdRecords[0]);
}

//reservation by id
function read(reservationId) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .then((returnedRecords) => returnedRecords[0]);
}

//updates the status of the reservation
function update(updateReservation) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedReservations) => updatedReservations[0]);

}

function find(mobile_number) {
    return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
    list,
    create, 
    read,
    update,
    find,
}