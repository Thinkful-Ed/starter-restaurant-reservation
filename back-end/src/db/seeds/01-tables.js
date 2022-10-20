const tables = require("./01-tables.json");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex.raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
  .then (function () {
    return knex("tables").insert(tables)
  });
};
