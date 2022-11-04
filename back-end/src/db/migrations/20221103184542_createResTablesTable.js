const knex = require("../connection");

exports.up = function(knex) {
  return knex.schema.createTable("res_tables", (table) => {
    table.increments("res_table_id");
    table.integer("reservation_id").notNullable().unsigned();
    table
        .foreign("reservation_id")
        .references("reservation_id")
        .inTable("reservations");
    table.integer("table_id").notNullable().unsigned();
    table
        .foreign("table_id")
        .references("table_id")
        .inTable("tables");
    table.boolean("available").notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("res_tables");
};
