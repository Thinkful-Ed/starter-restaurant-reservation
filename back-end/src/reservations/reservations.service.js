const knex = require("../db/connection")

function list(){
  return knex("reservations").select("*")
}
function listByQuery(date){
  return knex("reservations")
    .select("*")
    .where({"reservation_date":date})
    .orderBy("reservation_time")
}

//function to create a reservation which returns only one record
function create(reservation){
  return knex("reservations")
  .insert(reservation)
  .returning("*")
  .then((createdRecords) => createdRecords[0]);
}
function read(reservation_id){
  console.log("reservation_id in service is", reservation_id)
  return knex("reservations")
  .select("*")
  .where({reservation_id:reservation_id})
  .first()
}

module.exports = {
  list,
  create,
  listByQuery,
  read,
  
}