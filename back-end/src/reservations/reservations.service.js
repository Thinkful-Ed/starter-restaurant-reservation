const knex = require("../db/connection");

function list() {
    return knex('reservations').select('*').whereNot({reservation_id: 'finished'});
  }

function create (reservation) {
    return knex('reservations')
      .insert(reservation)
      .returning('*')
      .then(result => result[0])
  }

  function read(reservationId) {
    return knex('reservations').select('*').where({ reservation_id: reservationId }).first();
  }

  function listByDate (date) {
    return knex('reservations')
      .where({ reservation_date: date })
      .whereNot({status: 'finished'})
      .orderBy('reservation_time')
  }

  function update (reservationId, newStatus){
    return knex('reservations')
    .where({reservation_id: reservationId})
    .update({status: newStatus})
    .returning('*')
    .then(result => result[0])
  }



module.exports = {
    list,
    create,
    read,
    listByDate,
    update
}