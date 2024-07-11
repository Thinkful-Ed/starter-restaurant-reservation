
const knex = require("../db/connection");

async function list(date) {
  return knex("reservations")
          .select("*")
          .where({reservation_date: date} )
          .whereNot({ status: 'finished' })
          .orderBy("reservation_time","asc");
}

function create(newReservation) {
    return knex("reservations")
           .insert(newReservation)
           .returning("*")
           .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations")
          .select("*")
          .where({ reservation_id: reservation_id })
          .first();
}


function update(updatedReservation) {
  return knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation)
    .returning("*")  // This ensures all fields of the updated record are returned
    .then((updatedRecords) => updatedRecords[0]);  // Returns the first record from the result
}


function updateStatus(reservation_id, status) {
  return knex('reservations')
    .where({ reservation_id })
    .update({ status })
    .returning('*')  
    .then((updatedRecords) => updatedRecords[0]);  
}

function search(mobile_number) {
  return knex("reservations")
   .select("*")
   .where({ mobile_number })
   .orderBy("reservation_date");
}
module.exports = {
  list, create, read, update, updateStatus, search,
};