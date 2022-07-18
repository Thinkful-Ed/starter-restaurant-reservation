const reservees = require("./00-reservations.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("reservations").insert(reservees);
    });
};
