const data = require("./00-reservations.json")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reservations').del()
    .then(function () {
      // Inserts seed entries
      return knex('reservations').insert(data);
    });
};
