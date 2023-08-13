const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function listToday(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

async function create(reservation) {
  const createdRecords = await knex("reservations")
    .insert(reservation)
    .returning("*");
  return createdRecords[0];
}

module.exports = {
  list,
  listToday,
  create,
};
