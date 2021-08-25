const knex = require('../db/connection');

function create(reservation) {
  return knex('reservations').insert(reservation).returning('*');
}

function listByDate(date) {
  return knex('reservations')
    .select('*')
    .where({ 'reservations.reservation_date': date });
}

module.exports = {
  create,
  listByDate,
};
