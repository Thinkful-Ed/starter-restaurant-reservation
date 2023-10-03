const knex = require("../db/connection")

function list(date) {
    return knex("reservations")
    .select("*")
    .where({
        reservation_date: date
    })
}

function create(newReservation) {
    return knex("reservations")
    .insert(newReservation)
    .then(reservation => reservation[0])
}

function read(reservaiton_id) {
    return knex("reservations")
      .select("*")
      .where({
        reservation_id: reservaiton_id
      })
}

function update(updatedReservation) {
    return knex("reservations")
      .where({
        reservation_id: updatedReservation.reservation_id
      })
      .update({
        status: updatedReservation.status
      })
      .then(updated => updated)
}

function finish(reservation) {
    return knex("reservations")
      .where({
        reservation_id: reservation.reservation_id
      })
      .update({
        status: reservation.status
      })
      .then(updated => updated)
}

module.exports = {
    list,
    create,
    read,
    update,
    finish
}