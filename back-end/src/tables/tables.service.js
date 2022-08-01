const knex = require("../db/connection")

function list(){
  return knex("tables").select("*").orderBy("table_name")
}

function create(table){
  return knex("tables")
  .insert(table).returning("*")
  .then((createdRecords) => createdRecords[0]);
}
function read(table_id){
  return knex("tables")
  .select("*")
  .where({table_id})
  .first()
}
function readReservation(reservation_id){
  return knex("reservations")
  .select("*")
  .where({reservation_id})
  .first()
}

function update(updatedReservation, table_id) {
  //your solution here
  return knex("tables")
    .select("*")
    .where({table_id })
    .update({reservation_id:Number(updatedReservation.reservation_id)})
    .then((upReservation) => upReservation[0])
}

function freeUpTable(table_id) {
  //your solution here
  return knex("tables")
    .select("*")
    .where({table_id })
    .update({reservation_id: null})
    .then((upReservation) => upReservation[0])
}



module.exports = {
  list,
  create,
  read,
  readReservation,
  update,
  freeUpTable

}