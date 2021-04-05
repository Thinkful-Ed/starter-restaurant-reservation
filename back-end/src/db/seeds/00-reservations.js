exports.seed = function (knex) {
  return knex('reservations').del().then(
    function () {
      return knex('reservations').insert(require('./00-reservations.json'))
    })
};
