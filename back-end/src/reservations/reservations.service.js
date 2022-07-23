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
module.exports = {
  list,
  create,
  listByQuery
}