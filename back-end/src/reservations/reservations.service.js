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
      .where({
        "reservations.reservation_date": date,
        "reservations.status": "seated"
      })
      .orWhere({
        "reservations.reservation_date": date,
        "reservations.status": "booked"
      });
  }

  function listByMobileNumber(mobile_number) {
    return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
  }

function list() {
  return knex("reservations")
  .select("*")
}

function update(updatedReservation) {
  return knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "reservations.*")
    .returning("*");
}

module.exports = {
    create,
    read,
    list,
    listByDate,
    listByMobileNumber,
    update
}