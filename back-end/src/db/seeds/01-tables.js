const tablesData = require("./01-tables.json");
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex("tables").insert(tablesData);
    });
};