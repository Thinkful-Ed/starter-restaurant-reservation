
exports.up = function(knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.string("table_name").notNullable();
    table.integer("capacity").unsigned().notNullable();
    table
      .integer("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tables");
};
