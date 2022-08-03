const knex = require("../db/connection")

function list() {
  return knex("reservations")
    .select("*")
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function listByQuery(date, mobile_number) {
  let dbQuery = knex("reservations")
    .select("*")
    // .whereNot({ status: "finished" })
    .orderBy("reservation_time");

  if (date) {
    dbQuery = dbQuery.andWhere({ reservation_date: date });
  }

  if (mobile_number) {
    dbQuery = dbQuery.andWhere('mobile_number', 'like', `%${mobile_number}%`)
      // .andWhere({ mobile_number: mobile_number })
  } else {
    dbQuery = dbQuery.andWhereNot({ status: "finished" });
  }

  // console.log("dbQuery.toSQL().toNative()", dbQuery.toSQL().toNative());

  return dbQuery;
}

// function foo(movie_id) {
//   let dbQuery = knex("reservations")
//   .select("*")
//   .where({ reservation_date: date })

//   if(movie_id) {
//     dbQuery = dbQuery.andWhere({movie_id})
//   }

//   return dbQuery;
// }

// function listByMobileQuery(mobile_number){
//   return knex("reservations")
//     .select("*")
//     .where({mobile_number:mobile_number})
//     .orderBy("reservation_time")
// }

//function to create a reservation which returns only one record
function create(reservation){
  return knex("reservations")
  .insert(reservation)
  .returning("*")
  .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id){
  // console.log("reservation_id in service is", reservation_id)
  return knex("reservations")
  .select("*")
  .where({reservation_id:reservation_id})
  .first()
}

function theStatus(reservation_id, status){
  // console.log("reservation_id", reservation_id)
  // console.log("status", status)

  return knex("reservations")
    .select("*")
    .where({reservation_id})
    .update({status})
    .then((upReservation) => upReservation[0])
}
function update(updatedReservation, reservation_id) {
  //your solution here
  // console.log("updatedReservation", updatedReservation);
  return knex("reservations")
    .select("*")
    .where({reservation_id: reservation_id})
    .update(updatedReservation, "*")
    .then((upReservation) => upReservation[0])
}

module.exports = {
  create,
  listByQuery,
  read,
  theStatus,
  update

}