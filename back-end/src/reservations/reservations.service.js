const knex = require('../db/connection')

const create = (newReservation) =>
  knex('reservations')
    .insert(newReservation)
    .returning([
      'first_name',
      'last_name',
      'mobile_number',
      'reservation_date',
      'reservation_time',
      'people',
    ])

const read = (reservationId) =>
  knex('reservations')
    .select('*')
    .where({ reservation_id: reservationId })
    .first()

const list = (reservationDate) =>
  knex('reservations')
    .select('*')
    .where({ reservation_date: reservationDate })
    .orderBy('reservation_time')

module.exports = {
  create,
  read,
  list,
}
