const knex = require("../db/connection");


//create new reservation
function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

//query reservations from given date
function list(date) {
    return knex("reservations")
        .select()
        .where({ reservation_date: date.toString() })
        .whereNot({ "reservations.status": "finished" })
        .whereNot({ "reservations.status": "cancelled"})
        .orderBy("reservation_time");
}

//query reservations by given mobile #
function search(mobile_number) {
    return knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            '%${mobile_number.replace(/\D/g, "")}%'
        )
        .orderBy("reservation_date")
}

//query reservation by given ID
function read(reservation_id) {
    return knex("reservations")
        .select()
        .where({reservation_id})
        .first();
}

//update reservation with given ID and new data
function update(reservation_id, data) {
    const { status } = data;
    return knex("reservations")
        .select()
        .where({ reservation_id })
        .update(data, "*")
        .returning("*")
        .then((reservationData) => reservationData[0])
}

//update reservation status with given ID and new data
function updateStatus(reservation_id, data) {
    const { status } = data;
    return knex("reservations")
        .select()
        .where({ reservation_id })
        .update({ status })
        .returning("*")
        .then((reservationData) => reservationData[0])
}

module.exports = {
    list,
    create,
    search,
    read,
    update,
    updateStatus
  };