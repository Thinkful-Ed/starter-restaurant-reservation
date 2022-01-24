exports.seed = function (knex) {
  return knex('reservations').insert(reservations);
};
