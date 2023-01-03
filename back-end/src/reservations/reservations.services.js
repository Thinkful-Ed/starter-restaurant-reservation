const knex = require("../db/connection");

//Knex query to list reservations
function list() {
    return knex("reservations").select("*");
}

//Knex query to list reservations where date equals date provided
function reservationsByDate(date) {
  return knex
  .select("*")
  .from("reservations as r")
  .where("r.reservation_date", "=", date).andWhereNot("r.status", "=", "finished")
  .orderBy("r.reservation_time");
}
//Knex query to read reservation based on reservation id provided
function read(reservation_id){
    return knex
    .select("*")
    .from("reservations as r")
    .where({"r.reservation_id":reservation_id})
    .first();

}
//Knex query to create reservation 
function create(reservation) {
    return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((createdReservation) => createdReservation[0]);
  }

//Knex query to update a specific reservation
function update(reservationId, updates){
    return knex("reservations")
    .select("*")
    .where({reservation_id: reservationId})
    .update(updates, ["*"])
    .then((data)=> data[0]);
}

//Knex query to finish reservation 
function statusUpdate(reservationId, status){
    return knex("reservations")
    .select("*")
    .where({reservation_id: reservationId})
    .update({status: status}, ["*"])
    .then((data)=> data[0]);
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

module.exports = {
    list, reservationsByDate, create, read, update, statusUpdate, search
}