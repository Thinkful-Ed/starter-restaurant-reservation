const knex = require("../db/connection");

function list() {
    return knex("reservations").select("*");
  }

function create (reservation) {
    return knex('reservations')
      .insert(reservation)
      .returning('*')
      .then(result => result[0])
  }

  function listByDate (date) {
    return knex('reservations')
      .where({ reservation_date: date })
      .orderBy('reservation_time')
  }

module.exports = {
    list,
    create,
    listByDate
}