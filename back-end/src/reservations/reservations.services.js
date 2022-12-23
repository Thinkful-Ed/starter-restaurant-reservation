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
  .where({"r.date":date})
  .first();
}
//Knex query to read reseration based on reservation id provided
function read(reservation_id){
    return knex
    .select("*")
    .from("reservations as r")
    .where({"r.reservation_id":reservation_id})
    .first();

}

module.exports = {
    list, reservationsByDate, read
}