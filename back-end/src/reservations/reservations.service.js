const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNotIn("status", ["finished", "cancelled"])
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

function update(reservation_Id, status) {
  return knex("reserations")
    .select("*")
    .where({ reservation_Id })
    .update({ status })
    .returning("*")
    .then((updated) => updated[0]);
}

module.exports = {
  list,
  create,
  read,
  update,
};
