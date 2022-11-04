const knex = require("../connection");

exports.up = function(knex) {
  return knex.schema.alterTable("tables", (table) => {
    table.dropColumn("reservation_id");
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("tables", (table) => {
      table.integer("reservation_id").unsigned();
      table
          .foreign("reservation_id")
          .references("reservation_id")
          .inTable("reservations");
  })
};
