const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations")
      .insert({
        first_name: newReservation.first_name,
        last_name: newReservation.last_name,
        mobile_number: newReservation.mobile_number,
        reservation_date: newReservation.reservation_date,
        reservation_time: newReservation.reservation_time,
        people: newReservation.people,
      })
      .returning("*");
  }


function read(reservation_id) {
    return knex("reservations")
      .select("*")
      .where({ "reservations.reservation_id": reservation_id })
      .first();
  }

function list(date) {
    return knex("reservations")
    .select("*")
    .where({ "reservations.reservation_date": date })
}

module.exports = {
    create,
    read,
    list
}