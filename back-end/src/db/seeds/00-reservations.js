const reservations = require("./00-reservations.json");

exports.seed = function (knex) {
  // After clearing and resetting the table, reseed it.
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(() => knex("reservations").insert(reservations))
};
