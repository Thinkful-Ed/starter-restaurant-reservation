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

module.exports = {
    list,
    create,
    read
}