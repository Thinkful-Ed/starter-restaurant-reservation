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

function listByDate(date) {
    return knex("reservations")
    .select("*")
    .where({ "reservations.reservation_date": date })
}

function list() {
  return knex("reservations")
  .select("*")
}

function update(updatedReservation) {
  return knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update({ status: updatedReservation.status })
    .returning("*");
}

module.exports = {
    create,
    read,
    list,
    listByDate,
    update
}