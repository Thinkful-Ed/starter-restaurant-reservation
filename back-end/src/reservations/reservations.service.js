const knex = require('../db/connection');

function list(reservation_date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date })
      .whereNot({ status: "finished" })
      .orderBy("reservation_time");
  }

  function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

function read(reservation_id){
    return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(reservation) {
    return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
}

function update(updatedReservation) {
    console.log("updatedRes", updatedReservation);
    return knex("reservations")
      .select("*")
      .where({ reservation_id: updatedReservation.reservation_id })
      .update(updatedReservation, "*")
      .then((createdRecords) => createdRecords[0]);
  }

function updateStatus(reservation_id, status){
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update({ status: status }, "*")
        .then((createdRecords) => createdRecords[0]);
}

module.exports = {
    list,
    search,
    read,
    create,
    update, 
    updateStatus
}