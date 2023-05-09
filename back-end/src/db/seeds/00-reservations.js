const reservations = require('./00-reservations.json');

// Adding comment
exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
  .then(function (){
    return knex("reservations").insert(reservations);
  });
};
