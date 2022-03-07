exports.up = function (knex) {
  return knex.schema.createTable("reservations_tables", (table) => {
    table.integer("reservation_id").unsigned().notNullable();
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("CASCADE");
    table.integer("table_id").unsigned().notNullable();
    table
      .foreign("table_id")
      .references("table_id")
      .inTable("tables")
      .onDelete("CASCADE");
    table.primary(["reservation_id", "table_id"]);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations_tables");
};
