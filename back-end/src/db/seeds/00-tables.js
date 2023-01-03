const tableData = require("./00-tables.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(() => knex("tables").insert(tableData));
};

const reservationsData = require("./00-reservations.json");
