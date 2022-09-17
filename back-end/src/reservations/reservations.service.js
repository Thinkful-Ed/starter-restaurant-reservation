const knex = require("../db/connection");

// CRUDL SERVICES FOR 'RESERVATIONS' RESOURCES //

function list(date) {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time");
  } else {
    return knex("reservations").select("*");
  }
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

module.exports = {
  list,
  create,
};
