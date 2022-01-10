const tables = require("../fixtures/tables");
exports.seed = function(knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then( () => knex("tables").insert(tables));
};
