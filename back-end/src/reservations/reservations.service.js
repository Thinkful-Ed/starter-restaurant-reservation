const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createRecords) => createRecords[0]);
}

function read(reservation_Id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_Id })
    .first();
}
module.exports = {
  list,
  create,
  read,
};
