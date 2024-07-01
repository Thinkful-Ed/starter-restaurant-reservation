const knex = require("../db/connection");

async function list(date) {

  return knex("reservations").select("*").where({reservation_date: date} ).orderBy("reservation_time","asc");

}

function create(newReservation) {
    return knex("reservations").insert(newReservation).returning("*").then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id: reservation_id }).first();
}


function update(updatedReservation) {
  return knex("reservations")
     .select("*")
     .where({ reservation_id: updatedReservation.reservation_id })
     .update({ reservation_id }).returning("*").then((updatedRecords) => updatedRecords[0]);
}
module.exports = {
  list, create, read,update
};