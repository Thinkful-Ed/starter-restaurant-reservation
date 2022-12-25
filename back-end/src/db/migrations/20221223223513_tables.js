exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.integer("reservation_id");
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("CASCADE");
    table.string("table_name");
    table.integer("capacity");
    table.timestamps(true, true); //creates the created_at and updated_at columns
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
