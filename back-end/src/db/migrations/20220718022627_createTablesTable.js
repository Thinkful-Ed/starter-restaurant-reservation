exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.string("table_name").notNullable();
    table.integer("capacity").unsigned().notNullable();
    table.integer("reservation_id").unsigned().nullable();
    table
      .foreign("reservation_id")
      .references("reservations.reservation_id")
      .onDelete("SET NULL");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
