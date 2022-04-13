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