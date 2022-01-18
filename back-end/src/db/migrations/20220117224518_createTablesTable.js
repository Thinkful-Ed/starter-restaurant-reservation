exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.string("table_name").notNullable();
    table.integer("capacity").notNullable();
    table.integer("reservation_id");
    table.foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("cascade")
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
