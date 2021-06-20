const reservations = require("./00-tables.json")
exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
  .then(() => knex("tables").insert(table))
};
