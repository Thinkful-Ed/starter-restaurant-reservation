const knex = require("../db/connection");

// CRUDL SERVICES FOR 'RESERVATIONS' RESOURCES //

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

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

// EXPORTS //

module.exports = {
  create,
  read,
  list,
};
