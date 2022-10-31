const knex = require("../db/connection")

function list(){
    return knex("reservations")
        .select("*")
}

function listByDate(reservation_date){
    return knex("reservations")
        .select("*")
        .where({ reservation_date })
        .orderBy("reservation_time")
}

function listByPhone(mobile_number) {
    return knex('reservations')
      .select('*')
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_id");
  }

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first()
}

function create(newReservation){
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
}

function update(reservation_id, updatedReservation){
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update(updatedReservation)
        .returning("*")
        .then((updatedRecords) => updatedRecords[0])
}

function updateStatus(reservation_id, status){
    return knex("reservations")
        .select("*")
        .where({reservation_id})
        .update({status: status})
        .returning("*")
}

function updateReservation(reservation) {
    const {
      reservation_id,
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people
    } = reservation;
    return knex("reservations")
      .select("*")
      .where({ reservation_id })
      .update({
          first_name: first_name,
          last_name: last_name,
          mobile_number: mobile_number,
          reservation_date: reservation_date,
          reservation_time: reservation_time,
          people: people
      })
      .returning("*")
      .then((updatedRecords)=> updatedRecords[0])
  }

module.exports = {
    list,
    listByDate,
    listByPhone,
    read,
    create,
    update,
    updateStatus,
    updateReservation
}