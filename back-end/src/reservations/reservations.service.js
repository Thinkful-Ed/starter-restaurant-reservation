const knex = require("../db/connection");

function list() {
  return knex("reservations")
    .select("*")
    .orderBy("reservation_date")
    .orderBy("reservation_time")
}

function listByDate(date){
    return knex("reservations")
     .select("reservations.*")
     .where({ reservation_date: date })
     .whereNot({ status: "finished" })
     .orderBy("reservation_time");
}

function create(reservation){
    return knex("reservations")
     .insert(reservation)
     .returning("*")
     .then((saved) => saved[0])
}

module.exports = {
  list,
  listByDate,
  create,
};
