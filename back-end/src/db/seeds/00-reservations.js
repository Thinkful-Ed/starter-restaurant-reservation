const reservations = require('./00-reservations.json');

// Commenting this line
// Commenting this line too
exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
  .then(function (){
    return knex("reservations").insert(reservations);
  });
};
