const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .where({reservation_date: date})
    .whereNot({status: "finished"})
    .orderBy("reservation_time", "asc");
}

function read(id) {
  return knex("reservations").select("*").where({reservation_id: id}).first();
}

function create(data) {
  return knex("reservations")
    .insert(data)
    .returning("*")
    .then((resultArray) => resultArray[0]);
}

// function readMobileNumber(mb){
//     return knex('reservations')
//             .where("mobile_number","like",`%${mb}%`)
// }
function readMobileNumber(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function update(data) {
  return knex("reservations")
    .where({reservation_id: data.reservation_id})
    .update(data);
}

module.exports = {
  list,
  read,
  create,
  readMobileNumber,
  update,
};
