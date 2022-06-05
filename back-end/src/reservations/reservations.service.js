const knex = require("../db/connection");

function list(date) {
  return knex("reservations").returning("*").where({
    "reservation_date": date
  });
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then(([createdRecord]) => createdRecord);
}

module.exports = {
  create,
  list,
};
