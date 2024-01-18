const tables = require("./01-tables.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("tables").insert(tables);
    });
};
