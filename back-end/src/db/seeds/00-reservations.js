const reservations = require("./00-reservations.json")
//todo - seed the database given the data

exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE");
};
