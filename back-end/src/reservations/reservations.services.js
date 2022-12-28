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
  .where("r.reservation_date", "=", date);
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
function update(updatedReservation){
    return knex("reservations")
    .select("*")
    .where({review_id: updatedReservation.reservation_id})
    .update(updatedReservation, ["*"])
    .then((data)=> data[0]);
}

module.exports = {
    list, reservationsByDate, create, read, update
}